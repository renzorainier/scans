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

function TodayAttendance() {
  const [todayAttendance, setTodayAttendance] = useState([]);

  useEffect(() => {
    const fetchTodayAttendance = async () => {
      const presentStudentsQuery = query(
        collection(db, "strands", "STEM", "1B"),
        where("present", "==", true)
      );
      const presentStudentsQuerySnapshot = await getDocs(presentStudentsQuery);
      const presentStudents = presentStudentsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        lastScan: doc.data().lastScan?.toDate() || null,
        section: doc.data().section,
      }));
      presentStudents.sort((a, b) => b.lastScan - a.lastScan);
      setTodayAttendance(presentStudents);
    };

    fetchTodayAttendance();
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-gray-700 text-xl font-bold mb-4">Attendance For Today</h2>
      <ul className="divide-y divide-gray-200">
        {todayAttendance.map((student) => (
          <li key={student.id} className="py-4 divide-x divide-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center justify-between">
                <h3 className="text-gray-700 text-lg font-bold">{student.name}</h3>
                <p className="text-gray-700">
                  {student.lastScan
                    ? `Last Scan: ${student.lastScan.toLocaleTimeString()}`
                    : "Not yet scanned"}
                </p>
                <p className="text-gray-800">{student.section}</p>
              </div>
              <span className="text-gray-700">{}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}



export default AttendanceViewer
