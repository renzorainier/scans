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
  const sections = ["1A", "1B", "1C", "1D", "2A"];

  useEffect(() => {
    const fetchData = async () => {
      const data = {};
      for (const section of sections) {
        const sectionData = {};
        const sectionDocs = await getDocs(collection(db, "STEM", section));
        sectionDocs.forEach((doc) => {
          const fields = doc.data();
          const studentIdRegex = /(\d+)(.*)/;
          Object.keys(fields).forEach((fieldName) => {
            const match = fieldName.match(studentIdRegex);
            if (match) {
              const studentId = match[1];
              const fieldSuffix = match[2];
              if (!sectionData[studentId]) {
                sectionData[studentId] = {};
              }
              sectionData[studentId][fieldSuffix] = fields[fieldName];
            }
          });
        });
        data[section] = sectionData;
      }
      setAttendanceData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Last Scan</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(attendanceData).map((section) => {
          return Object.keys(attendanceData[section]).map((studentId) => {
            const studentFields = attendanceData[section][studentId];
            return (
              <tr key={`${section}-${studentId}`}>
                <td>{studentId}</td>
                <td>{studentFields.name}</td>
                <td>{studentFields.lastScan}</td>
                <td>{studentFields.status}</td>
              </tr>
            );
          });
        })}
      </tbody>
    </table>
    </div>

  );
}

export default useAttendanceData
