import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase.js";

function useAttendanceData() {
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = {};
      const sectionDocs = await getDocs(collection(db, "STEM"));
      sectionDocs.forEach((doc) => {
        const fields = doc.data();
        const section = doc.id;
        if (!data[section]) {
          data[section] = {};
        }
        Object.keys(fields).forEach((fieldName) => {
          const studentId = fieldName.substring(0, 2);
          const fieldNameWithoutNumber = fieldName.replace(/[0-9]/g, "");
          if (!data[section][studentId]) {
            data[section][studentId] = {};
          }
          data[section][studentId][fieldNameWithoutNumber] = fields[fieldName];
        });
      });
      console.log(data)

      setAttendanceData(data);
    };

    fetchData();
  }, []);
  return {
    attendanceData,
  };
}

function AttendanceTable() {
  const { attendanceData } = useAttendanceData();

  const [selectedSection, setSelectedSection] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  useEffect(() => {
    const filteredStudents = Object.keys(attendanceData)
      .map((section) =>
        Object.keys(attendanceData[section]).map((studentId) => {
          const studentData = attendanceData[section][studentId];
          if (studentData.present === true) {
            const lastScanDate = new Date(studentData.lastScan.seconds * 1000);
            const lastScanTime = lastScanDate.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            });
            const lastScanTimestamp = lastScanDate.getTime();

            return {
              section,
              studentId,
              ...studentData,
              lastScanTime,
              lastScanTimestamp,
            };
          } else {
            return null;
          }
        })
      )
      .flat()
      .filter(
        (student) =>
          (!selectedSection || student.section === selectedSection) &&
          (!searchQuery ||
            student.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );

    setFilteredAttendance(filteredStudents);
  }, [selectedSection, searchQuery, attendanceData]);

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center flex-grow">
          <select
            value={selectedSection}
            onChange={handleSectionChange}
            className="border rounded-md py-1 px-2 text-gray-700 w-full"
          >
            <option value="">All</option>
            {Object.keys(attendanceData).map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="border rounded-md py-1 px-2 text-gray-700 w-full"
            placeholder="Search by name"
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Strand</th>
            <th>Sec</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.map((student, index) => (
            <tr
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
              } rounded-lg mb-2`}
              key={student.studentId}
            >
              <td className="p-2">{filteredAttendance.length - index}</td>
              <td>{student.name}</td>
              <td className="p-2">{student.strand}</td>
              <td className="p-2 ">{student.section}</td>
              <td className="p-2 whitespace-nowrap">
                {student.status === "late" && (
                  <div className="bg-[#EC7063] h-3 w-9 rounded-sm inline-block mr-1">
                    {student.lastScanTime}
                  </div>
                )}
                {student.status === "ontime" && (
                  <div className="bg-[#F7DC6F] h-3 w-9 rounded-sm inline-block mr-1">
                    {student.lastScanTime}
                  </div>
                )}
                {student.status === "early" && (
                  <div className="bg-[#2ECC71] h-3 w-9 rounded-sm inline-block mr-1">
                    {student.lastScanTime}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default AttendanceTable;
