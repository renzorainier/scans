import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
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
      console.log(data);

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
  const [presentStudents, setPresentStudents] = useState([]);

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
      return true;
    });
  };

  const filteredStudents = filterStudents(presentStudents);

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex">
          <select
            className="border border-gray-400 rounded-lg py-2 px-4"
            value={selectedSection}
            onChange={handleSectionChange}
          >
            <option value="">All</option>
            <option value="1A">1A</option>
            <option value="1B">1B</option>
            <option value="1C">1C</option>
          </select>
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
          {filteredStudents.map((student, index) => (
            <tr
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
              } rounded-lg mb-2`}
              key={student.studentId}
            >
              <td className="p-2">{filteredStudents.length - index}</td>
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
