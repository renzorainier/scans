import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";
import LineGraph from "components/Chart";
import NumberLineGraph from "components/NumberChart";
import StudentDetails from "components/StudentWeek";
import Rank from "components/Rank";
import { Switch } from "@headlessui/react";
import { SlGraph } from "react-icons/sl";
import { FaAward } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

function useAttendanceData() {
  const [attendanceData, setAttendanceData] = useState({});
  // git@github.com:renzorainier/scans.git
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
      console.log(data);
      setAttendanceData(data);
      console.log("hehe");
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
  const [presentStudents, setPresentStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [state, setState] = useState(false);

  const [enabled, setEnabled] = useState(false);

  const [card1Expanded, setCard1Expanded] = useState(false);
  const toggleCard1 = () => setCard1Expanded(!card1Expanded);

  const onClose = () => {
    setSelectedStudent(null);
  };

  const handleMoreClick = (student) => {
    setSelectedStudent(student);
  };

  useEffect(() => {
    const presentStudents = [];
    Object.keys(attendanceData).forEach((section) => {
      const sectionData = attendanceData[section];
      Object.keys(sectionData).forEach((studentId) => {
        const studentData = sectionData[studentId];
        if (studentData.present === true) {
          // Convert the lastScan object to a string and timestamp
          const lastScanDate = new Date(studentData.lastScan.seconds * 1000);
          const lastScanTime = lastScanDate.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          });
          const lastScanTimestamp = lastScanDate.getTime();

          presentStudents.push({
            section,
            studentId,
            ...studentData,
            lastScanTime,
            lastScanTimestamp,
          });
        }
        setIsLoading(false);
      });
    });

    // Sort presentStudents by lastScanTimestamp in descending order
    presentStudents.sort((a, b) => b.lastScanTimestamp - a.lastScanTimestamp);
    setPresentStudents(presentStudents);
  }, [attendanceData]);

  const filterStudents = (students) => {
    return students.filter((student) => {
      if (selectedSection && student.section !== selectedSection) {
        return false;
      }
      if (
        searchQuery &&
        !student.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  };

  const filteredStudents = filterStudents(presentStudents).filter((student) => {
    return student.section === selectedSection;
  });

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const tableData = selectedSection ? (
    <tbody>
      {""}
      {filteredStudents.map((student, index) => (
        <tr
          className={`${
            index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
          } rounded-lg mb-2 py-2`}
          key={student.studentId}
          onClick={() => handleMoreClick(student)}
        >
          <td className="p-2">{filteredStudents.length - index}</td>
          <td className="p-2 font-bold whitespace-nowrap">{student.name}</td>
          <td className="p-2">{student.strand}</td>
          <td className="p-2 ">{student.section}</td>
          <td className="p-2 whitespace-nowrap">
            {student.status === "late" && (
              <div className="bg-[#EC7063] h-6 w-16 rounded-sm inline-block mr-1">
                {student.lastScanTime}
              </div>
            )}
            {student.status === "ontime" && (
              <div className="bg-[#F7DC6F]  h-6 w-16 rounded-sm inline-block mr-1">
                {student.lastScanTime}
              </div>
            )}
            {student.status === "early" && (
              <div className="bg-[#2ECC71]  h-6 w-16 rounded-sm inline-block mr-1">
                {student.lastScanTime}
              </div>
            )}
          </td>
        </tr>
      ))}
      {selectedStudent && (
        <StudentDetails student={selectedStudent} onClose={onClose} />
      )}
    </tbody>
  ) : (
    <tbody>
      {presentStudents.map((student, index) => (
        <tr
          className={`${
            index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
          } rounded-lg mb-2 py-2`}
          key={student.studentId}
          onClick={() => handleMoreClick(student)}
        >
          <td className="p-2">{presentStudents.length - index}</td>
          <td className="p-2 font-bold whitespace-nowrap">{student.name}</td>
          <td className="p-2">{student.strand}</td>
          <td className="p-2 ">{student.section}</td>
          <td className="p-2 whitespace-nowrap">
            {student.status === "late" && (
              <div className="bg-[#EC7063] h-6 w-16 rounded-sm inline-block mr-1">
                {student.lastScanTime}
              </div>
            )}
            {student.status === "ontime" && (
              <div className="bg-[#F7DC6F]  h-6 w-16 rounded-sm inline-block mr-1">
                {student.lastScanTime}
              </div>
            )}
            {student.status === "early" && (
              <div className="bg-[#2ECC71]  h-6 w-16 rounded-sm inline-block mr-1">
                {student.lastScanTime}
              </div>
            )}
          </td>
        </tr>
      ))}
      {selectedStudent && (
        <StudentDetails student={selectedStudent} onClose={onClose} />
      )}{" "}
    </tbody>
  );


  function handleHeaderClick(text) {
    setShowInfo(true);
    setInfoText(text);
  }

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <div className="flex justify-center pt-5 items-center">
        <div className="w-full rounded-lg mx-auto" style={{ maxWidth: "90%" }}>
          <Switch
            checked={state}
            onChange={setState}
            className={`${
              state ? "bg-violet-400" : "bg-blue-400"
            } relative inline-flex h-[50px] w-full shrink-0 cursor-pointer rounded-lg border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span
              aria-hidden="true"
              className={`${
                state ? "translate-x-full" : "translate-x-0"
              } pointer-events-none inline-block h-[47px] w-[50%] transform rounded-lg bg-gray-100 shadow-lg ring-0 transition duration-200 ease-in-out `}
            />

            <div className="absolute top-1/2 left-[12%] transform -translate-y-1/2 font-bold text-lg">
              ATTENDANCE
            </div>
            <div className="absolute top-1/2 right-[18%] transform -translate-y-1/2 font-bold text-lg">
              BADGE
            </div>
          </Switch>
        </div>
      </div>

      <div>
        <div>
          {state ? (
            <div>
              <Rank data={attendanceData} />
            </div>
          ) : (
            <div>
              <div
                className="flex justify-center pt-4 pb-5 items-center"
                style={{ animation: "slide-from-left 1s ease forwards" }}
              >
                <div
                  className="w-full text-gray-700 bg-white p-5  rounded-lg shadow-lg mx-auto"
                  style={{ maxWidth: "90%" }}
                >
                  <div className="bg-gradient-to-r from-blue-400 to-violet-400 shadow rounded-lg p-6">
                    <div className="mb-">
                      <h2 className="text-white text-xl font-bold text-center">
                        Attendance For Today
                      </h2>
                      <h1 className="text-white font-bold text-base  text-center">
                        {new Date().toLocaleDateString()}
                      </h1>
                    </div>
                  </div>

                  <div>
                    <div className="flex pt-4 items-center justify-center">
                      <div onClick={toggleCard1} className="flex items-center">
                        <FaChevronDown
                          className={`transition-transform ${
                            card1Expanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {card1Expanded && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <NumberLineGraph data={attendanceData} />
                          <LineGraph data={attendanceData} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4 pb-5 items-center">
                <div
                  className="w-full text-gray-700 bg-white p-5  rounded-lg shadow-lg mx-auto"
                  style={{
                    maxWidth: "90%",
                    animation: "slide-from-left 1.5s ease forwards",
                  }}
                >
                <div className="flex justify-between items-center mb-4">
  <div id="search" className="flex items-center w-full">
    {selectedSection && (
      <input
        type="text"
        className="border rounded-md py-1 px-2 text-gray-700 w-4/5 mr-2"
        placeholder="Search name"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
    )}

    <div className="relative">
      <div className="flex items-center justify-between border rounded-md py-1 px-2 text-gray-700 w-1/5">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        </div>
        <div className="text-sm">Sections</div>
        <svg
          className="w-4 h-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="absolute mt-1 bg-white border rounded-md shadow-lg">
        <div className="py-2">
          <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="ml-2 text-sm">1A</div>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="ml-2 text-sm">1B</div>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="ml-2 text-sm">1C</div>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="ml-2 text-sm">1D</div>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <div className="ml-2 text-sm">2A</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
                  <div id="table" className="overflow-x-auto rounded-lg">
                    <table className="table-auto w-full text-center ">
                      <thead
                        className="bg-blue-400 text-white"
                        style={{ border: "none" }}
                      >
                        <tr className="p-2 font-bold">
                          {["Index", "NAME", "STRAND", "SEC", "TIME"].map(
                            (label, index) => (
                              <th
                                key={index}
                                className="p-2 pb-4 pt-4"
                                onClick={() =>
                                  handleHeaderClick(
                                    `${label} - shows the ${
                                      label === "Index"
                                        ? "index of the students based on their scan time."
                                        : label.toLowerCase() +
                                          " of the students."
                                    }`
                                  )
                                }
                                style={{
                                  background: "transparent",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                }}
                              >
                                {label === "Index" ? "#" : label}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      {tableData}
                    </table>
                    {showInfo && (
                      <div className="fixed z-50 top-0 left-0 w-screen h-screen backdrop-blur-xl bg-gray/90">
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-90% bg-white p-5 rounded-lg shadow-lg inline-block">
                          <p className="text-gray-700 text-center">
                            {infoText}
                          </p>
                          <button
                            className="block mx-auto mt-4 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-gray-600"
                            onClick={() => setShowInfo(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttendanceTable;

// <div className="container  py-10 px-10 mx-0 min-w-full flex flex-col items-center">
// <button
//   disabled
//   type="button"
//   className="bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-500 inline-flex items-center"
// >
//   <svg
//     aria-hidden="true"
//     className="inline w-4 h-4 mr-3 text-gray-900 animate-spin"
//     viewBox="0 0 100 101"
//     fill="none"
//     role="status"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//       fill="#E5E7EB"
//     />
//     <path
//       d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//       fill="currentColor"
//     />
//   </svg>
//   Loading...
// </button>
// </div>
