import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase.js";

function ScheduleChecker({ strand, section, id }) {
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    async function fetchSchedule() {
      // Get the current date as a string in YYYY-MM-DD format
      const currentDate = new Date().toISOString().split("T")[0];

      // Query the schedules collection for the current strand and section
      const schedulesRef = doc(db, "schedules", strand, section);
      const schedulesSnapshot = await getDoc(schedulesRef);

      // Filter the results based on the current date
      const scheduleForDay = schedulesSnapshot.data().filter(
        (s) => s.date === currentDate
      )[0];

      setSchedule(scheduleForDay);
    }

    fetchSchedule();
  }, [strand, section]);

  useEffect(() => {
    async function updateStatus() {
      // If there's no schedule for the day, don't update anything
      if (!schedule) {
        return;
      }

      const currentTime = new Date();
      const startTime = new Date(schedule.start_time);
      const endTime = new Date(schedule.end_time);

      if (currentTime < startTime) {
        // Student is early
        await updateDoc(doc(db, "strands", strand, section, id), {
          status: "early",
        });
      } else if (currentTime > endTime) {
        // Student is late
        await updateDoc(doc(db, "strands", strand, section, id), {
          status: "late",
        });
      } else {
        // Student is on time
        await updateDoc(doc(db, "strands", strand, section, id), {
          status: "on time",
        });
      }
    }

    updateStatus();
  }, [id, schedule, section, strand]);

  return null;
}

export default ScheduleChecker;
