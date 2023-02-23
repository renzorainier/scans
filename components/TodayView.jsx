import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";

function TodayAttendance() {
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [selectedStrand, setSelectedStrand] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      const attendanceQuery = query(
        collection(db, "strands", selectedStrand || "", selectedSection || "")
      );
      const presentStudentsQuery = query(attendanceQuery, where("present", "==", true));
      const presentStudentsQuerySnapshot = await getDocs(presentStudentsQuery);
      const presentStudents = presentStudentsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        lastScan: doc.data().lastScan?.toDate() || null,
        section: doc.data().section,
        strand: doc.data().strand,
      }));
      presentStudents.sort((a, b) => b.lastScan - a.lastScan);
      setTodayAttendance(presentStudents);
    }
    fetchData();
  }, [selectedStrand, selectedSection]);

  useEffect(() => {
    const filteredStudents = todayAttendance.filter(
      (student) =>
        (!selectedStrand || student.strand === selectedStrand) &&
        (!selectedSection || student.section === selectedSection) &&
        (!searchQuery || student.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredAttendance(filteredStudents);
  }, [selectedStrand, selectedSection, searchQuery, todayAttendance]);

  const strands = ["STEM", "ABM", "HUMSS", "ICT", "GAS", "ALL STRANDS"];
  const sections = ["1A", "1B", "2A", "2B", "3A", "3B", "ALL SECTIONS"];

  const handleFilterChange = (type, value) => {
    if (type === "strand") {
      setSelectedStrand(value);
    } else if (type === "section") {
      setSelectedSection(value);
    } else if (type === "searchQuery") {
      setSearchQuery(value);
    }
  };

  const handleRefreshClick = async () => {
    const attendanceQuery = query(
      collection(db, "strands", selectedStrand || "", selectedSection || "")
    );
    const presentStudentsQuery = query(attendanceQuery, where("present", "==", true));
    const presentStudentsQuerySnapshot = await getDocs(presentStudentsQuery);
    const presentStudents = presentStudentsQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      lastScan: doc.data().lastScan?.toDate() || null,
      section: doc.data().section,
      strand: doc.data().strand,
    }));
    presentStudents.sort((a, b) => b.lastScan - a.lastScan);
    setTodayAttendance(presentStudents);
  };


  return (
    <div>
      <div className="filters">
        <FilterDropdown
          label="Strand"
          options={strands}
          selected={selectedStrand}
          handleFilterChange={(value) => handleFilterChange("strand", value)}
        />
        <FilterDropdown
          label="Section"
          options={sections}
          selected={selectedSection}
          handleFilterChange={(value) => handleFilterChange("section", value)}
        />
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
          />
          <i className="fas fa-search"></i>
        </div>
        <button className="refresh" onClick={handleRefreshClick}>
          <i className="fas fa-sync"></i>
        </button>
      </div>
      <div className="attendance-list">
        {filteredAttendance.map((student) => (
          <StudentAttendance key={student.id} student={student} />
        ))}
        {filteredAttendance.length === 0 && (
          <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default TodayAttendance;

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

// function TodayAttendance() {
//   const [todayAttendance, setTodayAttendance] = useState([]);
//   const [filteredAttendance, setFilteredAttendance] = useState([]);
//   const [selectedStrand, setSelectedStrand] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchTodayAttendance = async () => {
//       let attendanceQuery;

//       if (selectedStrand && selectedSection) {
//         attendanceQuery = query(collection(db, "strands", selectedStrand, selectedSection));
//       } else if (selectedStrand) {
//         attendanceQuery = query(collection(db, "strands", selectedStrand));
//       } else {
//         attendanceQuery = query(collection(db, "strands"));
//       }

//       const presentStudentsQuery = query(attendanceQuery, where("present", "==", true));
//       const presentStudentsQuerySnapshot = await getDocs(presentStudentsQuery);
//       const presentStudents = presentStudentsQuerySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         name: doc.data().name,
//         lastScan: doc.data().lastScan?.toDate() || null,
//         section: doc.data().section,
//         strand: doc.data().strand,
//       }));
//       presentStudents.sort((a, b) => b.lastScan - a.lastScan);
//       setTodayAttendance(presentStudents);
//       setFilteredAttendance(presentStudents);
//     };

//     fetchTodayAttendance();
//   }, [selectedStrand, selectedSection]);


//   useEffect(() => {
//     const filteredStudents = todayAttendance.filter(
//       (student) =>
//         (!selectedStrand || student.strand === selectedStrand) &&
//         (!selectedSection || student.section === selectedSection) &&
//         (!searchQuery ||
//           student.name.toLowerCase().includes(searchQuery.toLowerCase()))
//     );
//     setFilteredAttendance(filteredStudents);
//   }, [selectedStrand, selectedSection, searchQuery, todayAttendance]);

//   const strands = ["STEM", "ABM", "HUMSS", "ICT", "GAS", "ALL STRANDS"];
//   const sections = ["1A", "1B", "2A", "2B", "3A", "3B", "ALL SECTIONS"];

//   const handleStrandChange = (event) => {
//     const selectedStrand = event.target.value;
//     setSelectedStrand(selectedStrand);

//     const filteredStudents = todayAttendance.filter(
//       (student) =>
//         (selectedStrand === "ALL STRANDS" || student.strand === selectedStrand) &&
//         (selectedSection === "ALL SECTIONS" || student.section === selectedSection) &&
//         (!searchQuery ||
//           student.name.toLowerCase().includes(searchQuery.toLowerCase()))
//     );
//     setFilteredAttendance(filteredStudents);
//   };

//   const handleSectionChange = (event) => {
//     const selectedSection = event.target.value;
//     setSelectedSection(selectedSection);

//     const filteredStudents = todayAttendance.filter(
//       (student) =>
//         (selectedStrand === "ALL STRANDS" || student.strand === selectedStrand) &&
//         (selectedSection === "ALL SECTIONS" || student.section === selectedSection) &&
//         (!searchQuery ||
//           student.name.toLowerCase().includes(searchQuery.toLowerCase()))
//     );
//     setFilteredAttendance(filteredStudents);
//   };

//   const handleSearchQueryChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleRefreshClick = async () => {
//     const attendanceQuery = query(
//       collection(db, "strands", selectedStrand, selectedSection)
//     );
//     const presentStudentsQuery = query(attendanceQuery, where("present", "==", true));
//     const presentStudentsQuerySnapshot = await getDocs(presentStudentsQuery);
//     const presentStudents = presentStudentsQuerySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       name: doc.data().name,
//       lastScan: doc.data().lastScan?.toDate() || null,
//       section: doc.data().section,
//       strand: doc.data().strand,
//     }));
//     presentStudents.sort((a, b) => b.lastScan - a.lastScan);
//     setTodayAttendance(presentStudents);
//     setFilteredAttendance(presentStudents);
//   };

//   return (
//     <div className="text-gray-700 bg-white p-8 pr-8 divide-x divide-y rounded-lg shadow-lg inline-block">
//       <h2 className="text-gray-700 text-xl font-bold mb-4">
//         Attendance For Today
//       </h2>
//       <div className="flex justify-between mb-4">
//         <div className="flex items-center">
//           <label className="text-gray-700 font-bold mr-2">Strand:</label>
//           <select
//             value={selectedStrand}
//             onChange={handleStrandChange}
//             className="border rounded-md py-1 px-2 text-gray-700"
//           >
//             <option value="">All</option>
//             {strands.map((strand) => (
//               <option key={strand} value={strand}>
//                 {strand}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex items-center">
//           <label className="text-gray-700 font-bold mr-2">Section:</label>
//           <select
//             value={selectedSection}
//             onChange={handleSectionChange}
//             className="border rounded-md py-1 px-2 text-gray-700"
//           >
//             <option value="">All</option>
//             {sections.map((section) => (
//               <option key={section} value={section}>
//                 {section}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex items-center">
//           <label className="text-gray-700 font-bold mr-2">Search:</label>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearchQueryChange}
//             className="border rounded-md py-1 px-2 text-gray-700"
//             placeholder="Search by name"
//           />
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className=" table-auto border-collapse w-full">
//           <thead>
//             <tr>
//               <th className="border p-2">#</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Strand</th>
//               <th className="border p-2">Section</th>
//               <th className="border p-2">Last Scan</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAttendance.map((student, index) => (
//               <tr key={student.id}>
//                 <td className="border p-2">{index + 1}</td>
//                 <td className="border p-2">{student.name}</td>
//                 <td className="border p-2">{student.strand}</td>
//                 <td className="border p-2">{student.section}</td>
//                 <td className="border p-2">
//                   {student.lastScan ? student.lastScan.toLocaleString() : "N/A"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="flex items-center">
//           <button
//             onClick={handleRefreshClick}
//             className="border rounded-md py-1 px-2 text-gray-700 ml-4"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>
//     </div>

//   );
// }

// export default TodayAttendance;

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

// function TodayAttendance() {
//   const [todayAttendance, setTodayAttendance] = useState([]);

//   useEffect(() => {
//     const fetchTodayAttendance = async () => {
//       const presentStudentsQuery = query(
//         collection(db, "strands", "STEM", "1B"),
//         where("present", "==", true)
//       );
//       const presentStudentsQuerySnapshot = await getDocs(presentStudentsQuery);
//       const presentStudents = presentStudentsQuerySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         name: doc.data().name,
//         lastScan: doc.data().lastScan?.toDate() || null,
//         section: doc.data().section,
//       }));
//       presentStudents.sort((a, b) => b.lastScan - a.lastScan);
//       setTodayAttendance(presentStudents);
//     };

//     fetchTodayAttendance();
//   }, []);

// return (
//   <div className="bg-white p-8 pr-8 divide-x divide-y rounded-lg shadow-lg inline-block">
//     <h2 className="text-gray-700 text-xl font-bold mb-4">Attendance For Today</h2>
//     <table className="divide-y divide-gray-200 border border-gray-300 rounded-md">
//       <thead className="bg-gray-50">
//         <tr>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Name
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Last Scan
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Section
//           </th>
//         </tr>
//       </thead>
//       <tbody className="bg-white divide-y divide-gray-200">
//         {todayAttendance.map((student) => (
//           <tr key={student.id}>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="flex items-center">
//                 <div className="ml-4">
//                   <div className="text-sm font-medium text-gray-900">{student.name}</div>
//                 </div>
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="text-sm text-gray-900">
//                 {student.lastScan ? student.lastScan.toLocaleTimeString() : "No Record"}
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.section}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// }

// export default TodayAttendance;

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

// function TodayAttendanceViewer() {
//   const [todayAttendance, setTodayAttendance] = useState([]);
//   const [pastAttendance, setPastAttendance] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   useEffect(() => {
//     const fetchTodayAttendance = async () => {
//       const presentStudentsQuery = query(
//         collection(db, "students"),
//         where("present", "==", true)
//       );
//       const presentStudentsQuerySnapshot = await getDocs(presentStudentsQuery);
//       const presentStudents = presentStudentsQuerySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         name: doc.data().name,
//         lastScan: doc.data().lastScan?.toDate() || null,
//       }));
//       presentStudents.sort((a, b) => b.lastScan - a.lastScan);
//       setTodayAttendance(presentStudents);
//     };

//     fetchTodayAttendance();
//   }, []);

//   useEffect(() => {
//     const fetchPastAttendance = async () => {
//       const dateStr = selectedDate.toISOString().slice(0, 10);
//       const attendanceDocRef = doc(db, "presentStudents", dateStr);
//       const attendanceDocSnapshot = await getDoc(attendanceDocRef);
//       if (attendanceDocSnapshot.exists()) {
//         const attendanceData = attendanceDocSnapshot.data();
//         const presentStudents = attendanceData.presentStudents.map(
//           (student) => ({
//             ...student,
//             lastScan: student.lastScan.toDate(),
//           })
//         );
//         presentStudents.sort((a, b) => b.lastScan - a.lastScan);
//         setPastAttendance(presentStudents);
//       } else {
//         setPastAttendance([]);
//       }
//     };

//     fetchPastAttendance();
//   }, [selectedDate]);

//   const handleDateChange = (event) => {
//     const date = new Date(event.target.value);
//     setSelectedDate(date);
//   };

//   return (
//     <div>
//       <div>
//         <h2>Today's Attendance</h2>
//         <ul>
//           {todayAttendance.map((student) => (
//             <li key={student.id}>
//               {student.name} - {student.lastScan?.toLocaleTimeString()} -{" "}
//               {student.id}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2>Past Attendance</h2>
//         <label htmlFor="attendanceDate">Select a date:</label>
//         <input
//           type="date"
//           id="attendanceDate"
//           value={selectedDate.toISOString().slice(0, 10)}
//           onChange={handleDateChange}
//         />
//         <ul>
//           {pastAttendance.map((student) => (
//             <li key={student.id}>
//               {student.name} -{" "}
//               {student.lastScan instanceof Date &&
//                 student.lastScan.toLocaleTimeString()}{" "}
//               - {student.id}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default TodayAttendanceViewer;

{
  /* <p className="text-xl font-bold mt-6">Scan result:</p>
<p className="text-xl">{data}</p>
<h1 className="text-3xl font-semibold mt-8">Recent Logs</h1>
<div className="bg-white rounded-lg shadow-lg mt-6 w-full max-w-md">
  <ul className="text-gray-700 divide-y divide-gray-300">
    {log.map((entry, index) => (
      <li key={entry.id} className="py-4 px-6">
        <span className="block font-semibold">{entry.info}</span>
      </li>
    ))}
  </ul>
</div>
</div>
); */
}
