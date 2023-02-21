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

function PastAttendance() {
  const [pastAttendance, setPastAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchPastAttendance = async () => {
      const dateStr = selectedDate.toISOString().slice(0, 10);
      const attendanceDocRef = doc(db, "presentStudents", dateStr);
      const attendanceDocSnapshot = await getDoc(attendanceDocRef);
      if (attendanceDocSnapshot.exists()) {
        const attendanceData = attendanceDocSnapshot.data();
        const presentStudents = attendanceData.presentStudents.map(
          (student) => ({
            ...student,
            lastScan: student.lastScan.toDate(),
            section: student.section,
          })
        );
        presentStudents.sort((a, b) => b.lastScan - a.lastScan);
        setPastAttendance(presentStudents);
      } else {
        setPastAttendance([]);
      }
    };

    fetchPastAttendance();
  }, [selectedDate]);



export default AttendanceViewer
