import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";

function Scan() {
  const [lastScanned, setLastScanned] = useState(null);
  const [data, setData] = useState("");
  const [log, setLog] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setData("");
    }, 10000);
    return () => clearTimeout(timeoutId);
  }, [data]);

  const handleMarkPresent = async (strand, section, id) => {
    // Get student data from Firestore
    const studentRef = doc(db, "strands", strand, section, id);
    const docSnapshot = await getDoc(studentRef);

    if (docSnapshot.exists()) {
      const studentData = docSnapshot.data();

      // Check student's attendance status and update it
      let attendanceStatus = "";
      const scheduleRef = doc(db, "schedules", strand, section, "monday");
      const scheduleSnapshot = await getDoc(scheduleRef);

      if (scheduleSnapshot.exists()) {
        const scheduleData = scheduleSnapshot.data();
        const classStartTime = new Date(Date.parse(`01/01/1970 ${scheduleData.startTime}`));
        const scanTime = new Date();
        const timeDifference = scanTime.getTime() - classStartTime.getTime();

        if (timeDifference < -300000) {
          // Student is early (5 minutes before class start time)
          attendanceStatus = "early";
        } else if (timeDifference >= -300000 && timeDifference <= 600000) {
          // Student is on time (within 5 minutes of class start time)
          attendanceStatus = "on time";
        } else {
          // Student is late (more than 5 minutes after class start time)
          attendanceStatus = "late";
        }
      }

      if (!studentData.present) {
        await setDoc(
          studentRef,
          { present: true, lastScan: new Date(), attendanceStatus },
          { merge: true }
        );
        console.log(`Student ${id} marked as present`);
      } else {
        console.log(`Student ${id} is already marked as present`);
      }

      const timeString = studentData.lastScan
        .toDate()
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

      return {
        name: studentData.name,
        time: timeString,
      };
    } else {
      console.log(`No student found with ID ${id}`);
      return undefined;
    }
  };

  useEffect(() => {
    if (data) {
      const newLogEntry = {
        id: lastScanned,
        info: data,
      };

      // Remove duplicates
      const existingEntryIndex = log.findIndex(
        (entry) => entry.id === lastScanned
      );
      if (existingEntryIndex !== -1) {
        const updatedLog = [...log];
        updatedLog[existingEntryIndex] = newLogEntry;
        setLog(updatedLog);
      } else {
        const updatedLog = [newLogEntry, ...log.slice(0, 9)];
        setLog(updatedLog);
      }
    }
  }, [data, lastScanned, log]);

  return (
    <div>
      <QrReader
        onResult={async (result) => {
          if (!!result) {
            const code = result.text;
            const [strand, section, id] = code.split("-");
            if (strand && section && id && code !== lastScanned) {
              setLastScanned(code);
              const studentInfo = await handleMarkPresent(strand, section, id);
              if (studentInfo) {
                const { name, time } = studentInfo;
                setData(`Name: ${name}, Scanned at: ${time}`);
              }
            }
          }
        }}
        // This is facing mode: "environment". It will open the back camera of
        // the smartphone and if not found, will open the front camera
        constraints={{ facingMode: "environment" }}
        style={{ width: "100%", height: "100%" }}
      />

      <p className="text-xl font-bold mt-6">Scan result:</p>
      <p className="text-xl">{data}</p>
      <h1 className="text-3xl font-semibold mt-8">Recent Logs</h1>
      <div className="bg-white rounded-lg shadow-lg mt-6 w-full max-w-md">
        <ul className="text-gray-500 divide-y divide-gray-300">
          {log.map((entry, index) => (
            <li key={entry.id} className="py-4 px-6">
              <span className="block font-semibold">{entry.info}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Scan;

// const handleMarkPresent = async (strand, section, id) => {
//   // Get student data from Firestore
//   const studentRef = doc(db, "strands", strand, section, id);
//   const docSnapshot = await getDoc(studentRef);

//   if (docSnapshot.exists()) {
//     const studentData = docSnapshot.data();

//     // Check student's attendance status and update it
//     let attendanceStatus = "";
//     let scheduleRef;

//     if (studentData.day && studentData.start_time) {
//       scheduleRef = doc(db, "schedules", strand, section, studentData.day);
//     } else {
//       console.log(`No day or start time found for student ${id}`);
//       return undefined;
//     }

//     const scheduleSnapshot = await getDoc(scheduleRef);

//     if (scheduleSnapshot.exists()) {
//       const scheduleData = scheduleSnapshot.data();
//       const studentSchedule = scheduleData[strand];
//       const studentScheduleTime = studentSchedule[id];
//       const classStartTime = new Date(studentScheduleTime.start_time);
//       const scanTime = new Date();
//       const timeDifference = scanTime.getTime() - classStartTime.getTime();

//       if (timeDifference < -300000) {
//         // Student is early (5 minutes before class start time)
//         attendanceStatus = "early";
//       } else if (timeDifference >= -300000 && timeDifference <= 600000) {
//         // Student is on time (within 5 minutes of class start time)
//         attendanceStatus = "on time";
//       } else {
//         // Student is late (more than 5 minutes after class start time)
//         attendanceStatus = "late";
//       }
//     }

//     if (!studentData.present) {
//       await setDoc(
//         studentRef,
//         { present: true, lastScan: new Date(), attendanceStatus },
//         { merge: true }
//       );
//       console.log(`Student ${id} marked as present`);
//     } else {
//       console.log(`Student ${id} is already marked as present`);
//     }

//     const timeString = studentData.lastScan
//       .toDate()
//       .toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       });

//     return {
//       name: studentData.name,
//       time: timeString,
//     };
//   } else {
//     console.log(`No student found with ID ${id}`);
//     return undefined;
//   }
// };
