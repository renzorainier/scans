import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";
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

  const handleMarkPresent = async (code) => {
    try {
      const studentRef = doc(db, "students", code);
      const docSnapshot = await getDoc(studentRef);
      if (docSnapshot.exists()) {
        const studentData = docSnapshot.data();
        if (!studentData.present) {
          await setDoc(
            studentRef,
            { present: true, lastScan: new Date() },
            { merge: true }
          );
          console.log(`Student ${code} marked as present`);
        } else {
          console.log(`Student ${code} is already marked as present`);
        }

        const timeString = studentData.lastScan.toDate().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return {
          name: studentData.name,
          time: timeString,
        };
      } else {
        console.log(`No student found with ID ${code}`);
        return undefined;
      }
    } catch (e) {
      console.error("Error marking student as present: ", e);
    }
  };

  useEffect(() => {
    if (data) {
      const newLogEntry = {
        id: lastScanned,
        info: data,
      };

      // Remove duplicates
      const existingEntryIndex = log.findIndex((entry) => entry.id === lastScanned);
      if (existingEntryIndex !== -1) {
        const updatedLog = [...log];
        updatedLog[existingEntryIndex] = newLogEntry;
        setLog(updatedLog);
      } else {
        const updatedLog = [newLogEntry, ...log.slice(0, 9)];
        setLog(updatedLog);
      }
    }
  }, [data]);

  return (
    <div>
      <QrReader
        onResult={async (result) => {
          if (!!result) {
            const code = result.text;
            if (code !== lastScanned) {
              setLastScanned(code);
              const studentInfo = await handleMarkPresent(code);
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
        style={{ width: "40%", height: "40%" }}
      />
      <p>{data}</p>
      <h1>Recent Logs</h1>
      <ul>
        {log.map((entry, index) => (
          <li key={entry.id}>
            <span>{entry.info}</span>
          </li>
        ))}
      </ul>


    </div>
  );
}

export default Scan;
