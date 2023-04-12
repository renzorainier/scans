import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";
import LineGraph from "components/Chart";
import NumberLineGraph from "components/NumberChart";
import StudentDetails from "components/StudentWeek";
import Rank from "components/Rank";
import { Switch } from '@headlessui/react'

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
  const [state, setState] = useState(true);
  const [enabled, setEnabled] = useState(false)


  const handleToggle = (value) => {
    setState(value);
  };


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

  const filteredStudents = filterStudents(presentStudents);

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (isLoading) {
    return (
      <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
        <button
          disabled
          type="button"
          className="bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-500 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            className="inline w-4 h-4 mr-3 text-gray-900 animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            role="status"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </button>
      </div>
    );
  }

  function handleHeaderClick(text) {
    setShowInfo(true);
    setInfoText(text);
  }



  return (
    <div>
 <div className="py-16">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>

      <button onClick={() => handleToggle(true)}>Show A</button>
      <button onClick={() => handleToggle(false)}>Show B</button>
      <div className="flex justify-center pt-5 pb-5 items-center">
        <div
          className="w-full text-gray-700 bg-white p-5  rounded-lg shadow-lg mx-auto"
          style={{ maxWidth: "90%" }}
        >
          {state ? (
            <div>
              <div>
                <div className="bg-gray-200 relative rounded-lg">
                  <img
                    src="https://static.planetminecraft.com/files/profile_banner/3800851_1.gif"
                    alt="background gif"
                    className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-lg"
                  />
                  <div className="relative z-10">
                    <h2 className="text-gray-700 text-xl font-bold text-center">
                      Attendance For Today
                    </h2>
                    <h1 className="text-gray-700 font-bold text-base mb-4 text-center">
                      ({new Date().toLocaleDateString()})
                    </h1>
                  </div>
                </div>
                <div>
                  <NumberLineGraph data={attendanceData} />
                </div>

                <div>
                  <LineGraph data={attendanceData} />
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div id="search" className="flex items-center w-full">
                    <input
                      type="text"
                      className="border rounded-md py-1 px-2 text-gray-700 w-4/5 mr-2"
                      placeholder="Search name (select a section first)"
                      value={searchQuery}
                      onChange={handleSearchQueryChange}
                      disabled={selectedSection === ""}
                    />

                    <select
                      className="border rounded-md py-1 px-2 text-gray-700 w-1/5"
                      value={selectedSection}
                      onChange={handleSectionChange}
                    >
                      <option value="">All</option>
                      <option value="1A">1A</option>
                      <option value="1B">1B</option>
                      <option value="1C">1C</option>
                      <option value="1D">1D</option>
                    </select>
                  </div>
                </div>

                <div id="table" className="overflow-x-auto rounded-lg">
                  <table className="table-auto w-full text-center ">
                    <thead
                      className="bg-gray-200 text-"
                      style={{ border: "none" }}
                    >
                      <tr className="p-2 font-bold">
                        <th
                          className="p-2 pb-4 pt-4 "
                          onClick={() =>
                            handleHeaderClick(
                              "Index - shows the index of the students baseds on their scan time."
                            )
                          }
                          style={{
                            background: "transparent",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          #
                        </th>
                        <th
                          className="p-2"
                          onClick={() =>
                            handleHeaderClick(
                              "NAME - shows the name of the students"
                            )
                          }
                          style={{
                            background: "transparent",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          NAME
                        </th>
                        <th
                          className="p-2"
                          onClick={() =>
                            handleHeaderClick(
                              "STRAND - shows the strand of the students"
                            )
                          }
                          style={{
                            background: "transparent",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          STRAND
                        </th>
                        <th
                          className="p-2"
                          onClick={() =>
                            handleHeaderClick(
                              "SEC - shows the section of the students."
                            )
                          }
                          style={{
                            background: "transparent",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          SEC
                        </th>
                        <th
                          className="p-2"
                          onClick={() =>
                            handleHeaderClick(
                              "SCANNED - shows the time the students was scanned for the day, red means late, yellow means on time, and green means early."
                            )
                          }
                          style={{
                            background: "transparent",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          SCANNED:
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student, index) => (
                        <tr
                          className={`${
                            index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                          } rounded-lg mb-2 py-2`}
                          key={student.studentId}
                          onClick={() => handleMoreClick(student)}
                        >
                          <td className="p-2">
                            {filteredStudents.length - index}
                          </td>
                          <td className="p-2 font-bold whitespace-nowrap">
                            {student.name}
                          </td>
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
                        <StudentDetails
                          student={selectedStudent}
                          onClose={onClose}
                        />
                      )}
                    </tbody>
                  </table>
                  {showInfo && (
                    <div className="fixed z-50 top-0 left-0 w-screen h-screen backdrop-blur-xl bg-gray/90">
                      <div
                        id="show"
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  max-w-90% bg-white p-5 rounded-lg shadow-lg inline-block"
                      >
                        <p className="text-gray-700 text-center">{infoText}</p>
                        <button
                          className="block mx-auto mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
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
          ) : (
            <div>
              <Rank data={attendanceData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttendanceTable;

// return (

//   <div className="flex justify-center pt-5 pb-5 items-center">
//     <div
//       className="w-full text-gray-700 bg-white p-5  rounded-lg shadow-lg mx-auto"
//       style={{ maxWidth: "90%" }}
//     >
//       <div className="bg-gray-200 relative rounded-lg">
//         <img
//           src="https://static.planetminecraft.com/files/profile_banner/3800851_1.gif"
//           alt="background gif"
//           className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-lg"
//         />
//         <div className="relative z-10">
//           <h2 className="text-gray-700 text-xl font-bold text-center">
//             Attendance For Today
//           </h2>
//           <h1 className="text-gray-700 font-bold text-base mb-4 text-center">
//             ({new Date().toLocaleDateString()})
//           </h1>
//         </div>
//       </div>
//       <div>
//         <NumberLineGraph data={attendanceData} />
//       </div>

//       <div>
//         <LineGraph data={attendanceData} />
//       </div>

//       <div>
//         <div>
//           <button onClick={handleClick} >View Rank</button>
//         </div>
//         {showRank && <Rank onClose={handleClose}  data={attendanceData} />}
//       </div>

//       <div className="flex justify-between items-center mb-4">
//         <div id="search" className="flex items-center w-full">
//           <input
//             type="text"
//             className="border rounded-md py-1 px-2 text-gray-700 w-4/5 mr-2"
//             placeholder="Search name (select a section first)"
//             value={searchQuery}
//             onChange={handleSearchQueryChange}
//             disabled={selectedSection === ""}
//           />

//           <select
//             className="border rounded-md py-1 px-2 text-gray-700 w-1/5"
//             value={selectedSection}
//             onChange={handleSectionChange}
//           >
//             <option value="">All</option>
//             <option value="1A">1A</option>
//             <option value="1B">1B</option>
//             <option value="1C">1C</option>
//             <option value="1D">1D</option>
//           </select>
//         </div>
//       </div>

//       <div id="table" className="overflow-x-auto rounded-lg">
//         <table className="table-auto w-full text-center ">
//           <thead className="bg-gray-200 text-" style={{ border: "none" }}>
//             <tr className="p-2 font-bold">
//               <th
//                 className="p-2 pb-4 pt-4 "
//                 onClick={() =>
//                   handleHeaderClick(
//                     "Index - shows the index of the students baseds on their scan time."
//                   )
//                 }
//                 style={{
//                   background: "transparent",
//                   fontWeight: "bold",
//                   cursor: "pointer",
//                 }}
//               >
//                 #
//               </th>
//               <th
//                 className="p-2"
//                 onClick={() =>
//                   handleHeaderClick("NAME - shows the name of the students")
//                 }
//                 style={{
//                   background: "transparent",
//                   fontWeight: "bold",
//                   cursor: "pointer",
//                 }}
//               >
//                 NAME
//               </th>
//               <th
//                 className="p-2"
//                 onClick={() =>
//                   handleHeaderClick(
//                     "STRAND - shows the strand of the students"
//                   )
//                 }
//                 style={{
//                   background: "transparent",
//                   fontWeight: "bold",
//                   cursor: "pointer",
//                 }}
//               >
//                 STRAND
//               </th>
//               <th
//                 className="p-2"
//                 onClick={() =>
//                   handleHeaderClick(
//                     "SEC - shows the section of the students."
//                   )
//                 }
//                 style={{
//                   background: "transparent",
//                   fontWeight: "bold",
//                   cursor: "pointer",
//                 }}
//               >
//                 SEC
//               </th>
//               <th
//                 className="p-2"
//                 onClick={() =>
//                   handleHeaderClick(
//                     "SCANNED - shows the time the students was scanned for the day, red means late, yellow means on time, and green means early."
//                   )
//                 }
//                 style={{
//                   background: "transparent",
//                   fontWeight: "bold",
//                   cursor: "pointer",
//                 }}
//               >
//                 SCANNED:
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.map((student, index) => (
//               <tr
//                 className={`${
//                   index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
//                 } rounded-lg mb-2 py-2`}
//                 key={student.studentId}
//                 onClick={() => handleMoreClick(student)}
//               >
//                 <td className="p-2">{filteredStudents.length - index}</td>
//                 <td className="p-2 font-bold whitespace-nowrap">
//                   {student.name}
//                 </td>
//                 <td className="p-2">{student.strand}</td>
//                 <td className="p-2 ">{student.section}</td>
//                 <td className="p-2 whitespace-nowrap">
//                   {student.status === "late" && (
//                     <div className="bg-[#EC7063] h-6 w-16 rounded-sm inline-block mr-1">
//                       {student.lastScanTime}
//                     </div>
//                   )}
//                   {student.status === "ontime" && (
//                     <div className="bg-[#F7DC6F]  h-6 w-16 rounded-sm inline-block mr-1">
//                       {student.lastScanTime}
//                     </div>
//                   )}
//                   {student.status === "early" && (
//                     <div className="bg-[#2ECC71]  h-6 w-16 rounded-sm inline-block mr-1">
//                       {student.lastScanTime}
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//             {selectedStudent && (
//               <StudentDetails student={selectedStudent} onClose={onClose} />
//             )}
//           </tbody>
//         </table>
//         {showInfo && (
//           <div className="fixed z-50 top-0 left-0 w-screen h-screen backdrop-blur-xl bg-gray/90">
//             <div
//               id="show"
//               className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  max-w-90% bg-white p-5 rounded-lg shadow-lg inline-block"
//             >
//               <p className="text-gray-700 text-center">{infoText}</p>
//               <button
//                 className="block mx-auto mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
//                 onClick={() => setShowInfo(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// );

// function useAttendanceData() {
//   const [attendanceData, setAttendanceData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = {};
//       const sectionDocs = await getDocs(collection(db, "STEM"));
//       sectionDocs.forEach((doc) => {
//         const fields = doc.data();
//         const section = doc.id;
//         if (!data[section]) {
//           data[section] = {};
//         }
//         Object.keys(fields).forEach((fieldName) => {
//           const studentId = fieldName.substring(0, 2);
//           const fieldNameWithoutNumber = fieldName.replace(/[0-9]/g, "");
//           if (!data[section][studentId]) {
//             data[section][studentId] = {};
//           }
//           data[section][studentId][fieldNameWithoutNumber] = fields[fieldName];
//         });
//       });
//       console.log(data);
//       setAttendanceData(data);
//     };

//     fetchData();
//   }, []);

//   return {
//     attendanceData,
//   };

// function useAttendanceData() {
//   const [attendanceData, setAttendanceData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const strands = ["STEM", "ICT", "ABM", "HUMSS", "GAS"]; // add other strands here
//       const data = {};

//       for (const strand of strands) {
//         const sectionDocs = await getDocs(collection(db, strand));
//         sectionDocs.forEach((doc) => {
//           const fields = doc.data();
//           const section = doc.id;
//           if (!data[strand]) {
//             data[strand] = {};
//           }
//           if (!data[strand][section]) {
//             data[strand][section] = {};
//           }
//           Object.keys(fields).forEach((fieldName) => {
//             const studentId = fieldName.substring(0, 2);
//             const fieldNameWithoutNumber = fieldName.replace(/[0-9]/g, "");
//             if (!data[strand][section][studentId]) {
//               data[strand][section][studentId] = {};
//             }
//             data[strand][section][studentId][fieldNameWithoutNumber] = fields[fieldName];
//           });
//         });
//       }

//       console.log(data);
//       setAttendanceData(data);
//     };

//     fetchData();
//   }, []);

//   return {
//     attendanceData,
//   };
// }

// can you add this search section and name fucntionality to the present setudents like this" useEffect(() => {
//   const filteredStudents = todayAttendance.filter(
//     (student) =>
//       (!selectedSection || student.section === selectedSection) &&
//       (!searchQuery ||
//         student.name.toLowerCase().includes(searchQuery.toLowerCase()))
//   );
//   setFilteredAttendance(filteredStudents);
// }, [selectedSection, searchQuery, todayAttendance]);

// const handleSectionChange = (event) => {
//   setSelectedSection(event.target.value);
// };

// const handleSearchQueryChange = (event) => {
//   setSearchQuery(event.target.value);
// };" " <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center flex-grow">
//           <select
//             value={selectedSection}
//             onChange={handleSectionChange}
//             className="border rounded-md py-1 px-2 text-gray-700 w-full"
//           >
//             <option value="">All</option>
//             {sections.map((section) => (
//               <option key={section} value={section}>
//                 {section}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex items-center flex-grow">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearchQueryChange}
//             className="border rounded-md py-1 px-2 text-gray-700 w-full"
//             placeholder="Search by name"
//           />
//         </div>
//       </div>" to this "import React, { useState, useEffect } from "react";
// import {
// collection,
// query,
// where,
// getDocs,
// getDoc,
// doc,
// } from "firebase/firestore";
// import { db } from "./firebase.js";

// function useAttendanceData() {
// const [attendanceData, setAttendanceData] = useState({});

// useEffect(() => {
//   const fetchData = async () => {
//     const data = {};
//     const sectionDocs = await getDocs(collection(db, "STEM"));
//     sectionDocs.forEach((doc) => {
//       const fields = doc.data();
//       const section = doc.id;
//       if (!data[section]) {
//         data[section] = {};
//       }
//       Object.keys(fields).forEach((fieldName) => {
//         const studentId = fieldName.substring(0, 2);
//         const fieldNameWithoutNumber = fieldName.replace(/[0-9]/g, "");
//         if (!data[section][studentId]) {
//           data[section][studentId] = {};
//         }
//         data[section][studentId][fieldNameWithoutNumber] = fields[fieldName];
//       });
//     });
//     console.log(data)

//     setAttendanceData(data);
//   };

//   fetchData();
// }, []);
// return {
//   attendanceData,
// };
// }

// function AttendanceTable() {
// const { attendanceData } = useAttendanceData();

// const getPresentStudents = () => {
//   const presentStudents = [];

//   Object.keys(attendanceData).forEach((section) => {
//     const sectionData = attendanceData[section];
//     Object.keys(sectionData).forEach((studentId) => {
//       const studentData = sectionData[studentId];
//       if (studentData.present === true) {
//         // Convert the lastScan object to a string and timestamp
//         const lastScanDate = new Date(studentData.lastScan.seconds * 1000);
//         const lastScanTime = lastScanDate.toLocaleTimeString([], {
//           hour: "numeric",
//           minute: "2-digit",
//         })
//         const lastScanTimestamp = lastScanDate.getTime();

//         presentStudents.push({
//           section,
//           studentId,
//           ...studentData,
//           lastScanTime,
//           lastScanTimestamp,
//         });
//       }
//     });
//   });

//   // Sort presentStudents by lastScanTimestamp in descending order
//   presentStudents.sort((a, b) => b.lastScanTimestamp - a.lastScanTimestamp);

//   return presentStudents;
// };

// const presentStudents = getPresentStudents();

// return (
//   <div>

//     <table>
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>Name</th>
//           <th>Strand</th>
//           <th>Sec</th>
//           <th>Status</th>
//           {/* Add more table headers here */}
//         </tr>
//       </thead>
//       <tbody>
//         {presentStudents.map((student, index) => (
//           <tr
//             className={`${
//               index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
//             } rounded-lg mb-2`}
//             key={student.studentId}
//           >
//             <td className="p-2">{presentStudents.length - index}</td>
//             <td>{student.name}</td>
//             <td className="p-2">{student.strand}</td>
//             <td className="p-2 ">{student.section}</td>
//             <td className="p-2 whitespace-nowrap">
//               {student.status === "late" && (
//                 <div className="bg-[#EC7063] h-3 w-9 rounded-sm inline-block mr-1">
//                   {student.lastScanTime}
//                 </div>
//               )}
//               {student.status === "ontime" && (
//                 <div className="bg-[#F7DC6F] h-3 w-9 rounded-sm inline-block mr-1">
//                   {student.lastScanTime}
//                 </div>
//               )}
//               {student.status === "early" && (
//                 <div className="bg-[#2ECC71] h-3 w-9 rounded-sm inline-block mr-1">
//                   {student.lastScanTime}
//                 </div>
//               )}
//             </td>
//             {/* Add more table cells here */}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );
// }

// export default AttendanceTable;"

// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   getDoc,
//   doc,
// } from "firebase/firestore";
// import { db } from "./firebase.js";

// function useAttendanceData() {
//   const [attendanceData, setAttendanceData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = {};
//       const sectionDocs = await getDocs(collection(db, "STEM"));
//       sectionDocs.forEach((doc) => {
//         const fields = doc.data();
//         const section = doc.id;
//         if (!data[section]) {
//           data[section] = {};
//         }
//         Object.keys(fields).forEach((fieldName) => {
//           const studentId = fieldName.substring(0, 2);
//           const fieldNameWithoutNumber = fieldName.replace(/[0-9]/g, "");
//           if (!data[section][studentId]) {
//             data[section][studentId] = {};
//           }
//           data[section][studentId][fieldNameWithoutNumber] = fields[fieldName];
//         });
//       });
//       console.log(data)

//       setAttendanceData(data);
//     };

//     fetchData();
//   }, []);
//   return {
//     attendanceData,
//   };
// }

// function AttendanceTable() {
//   const { attendanceData } = useAttendanceData();

//   const [selectedSection, setSelectedSection] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredAttendance, setFilteredAttendance] = useState([]);

//   useEffect(() => {
//     const filteredStudents = Object.keys(attendanceData)
//       .map((section) =>
//         Object.keys(attendanceData[section]).map((studentId) => {
//           const studentData = attendanceData[section][studentId];
//           if (studentData.present === true && studentData.name) { // Fix null name error
//             const lastScanDate = new Date(studentData.lastScan.seconds * 1000);
//             const lastScanTime = lastScanDate.toLocaleTimeString([], {
//               hour: "numeric",
//               minute: "2-digit",
//             });
//             const lastScanTimestamp = lastScanDate.getTime();

//             return {
//               section,
//               studentId,
//               ...studentData,
//               lastScanTime,
//               lastScanTimestamp,
//             };
//           } else {
//             return null;
//           }
//         })
//       )
//       .flat()
//       .filter(
//         (student) =>
//           (!selectedSection || student.section === selectedSection) &&
//           (!searchQuery ||
//             student.name.toLowerCase().includes(searchQuery.toLowerCase()))
//       );

//     setFilteredAttendance(filteredStudents);
//   }, [selectedSection, searchQuery, attendanceData]);

//   const handleSectionChange = (event) => {
//     setSelectedSection(event.target.value);
//   };

//   const handleSearchQueryChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center flex-grow">
//           <select
//             value={selectedSection}
//             onChange={handleSectionChange}
//             className="border rounded-md py-1 px-2 text-gray-700 w-full"
//           >
//             <option value="">All</option>
//             {Object.keys(attendanceData).map((section) => (
//               <option key={section} value={section}>
//                 {section}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex items-center flex-grow">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearchQueryChange}
//             className="border rounded-md py-1 px-2 text-gray-700 w-full"
//             placeholder="Search by name"
//           />
//         </div>
//       </div>

//       <table>
//         <thead>
//           <tr>"p-2">{student.strand}</td>
//               <td className="p-2 ">{student.section}</td>
//               <td className="p-2 whitespace-nowrap">
//                 {student.status === "late" && (
//                   <div className="bg-[#EC7063] h-3 w-9 rounded-sm inline-block mr-1">
//                     {student.lastScanTime}
//                   </div>
//                 )}
//                 {student.status === "ontime" && (
//                   <div className="bg-[#F7DC6F] h-3 w-9 rounded-sm inline-block mr-1">
//                     {student.lastScanTime}
//                   </div>
//                 )}
//                 {student.status === "early" && (
//                   <div className="bg-[#2ECC71] h-3 w-9 rounded-sm inline-block mr-1">
//                     {student.lastScanTime}
//                   </div>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

// }

// export default AttendanceTable;
//             <th>#</th>
//             <th>Name</th>
//             <th>Strand</th>
//             <th>Sec</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredAttendance.map((student, index) => (
//             <tr
//               className={`${
//                 index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
//               } rounded-lg mb-2`}
//               key={student.studentId}
//             >
//               <td className="p-2">{filteredAttendance.length - index}</td>
//               <td>{student.name}</td>
//               <td className=
