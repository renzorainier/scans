import React, { useState } from "react";

function Schedule({ strand, section, id, onSaveStatus }) {
  const [status, setStatus] = useState(null);

  const checkStatus = async () => {
    // Retrieve schedule for this section from your database
    const sectionSchedule = [
      { time: "08:00", status: "early" },
      { time: "08:30", status: "on time" },
      { time: "09:00", status: "late" },
    ];

    // Retrieve the student's schedule from your database
    const studentSchedule = [
      { day: "monday", time: "08:30" },
      { day: "tuesday", time: "08:00" },
      { day: "wednesday", time: "09:30" },
      { day: "thursday", time: "09:30" },
      { day: "friday", time: "09:30" },
    ];

    // Find the first time in the section schedule that is later than the student's schedule
    const studentTime = studentSchedule.find(
      (s) => s.day.toLowerCase() === new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase()
    ).time;
    const firstLateTime = sectionSchedule.find(
      (s) => s.time >= studentTime
    );

    if (firstLateTime) {
      setStatus(firstLateTime.status);
    } else {
      setStatus("late");
    }
    onSaveStatus(id, status);
  };

  return (
    <div>
      <button onClick={checkStatus}>Check status</button>
      {status && <div>Status: {status}</div>}
    </div>
  );
}

export default Schedule;
