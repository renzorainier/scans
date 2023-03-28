import React from "react";

function StudentDetails({ data, lrn }) {
  const student = data.find((student) => student.lrn === lrn);

  return (
    <div>
      <h2>{student.name}</h2>
      <p>LRN: {student.lrn}</p>
      <p>Strand: {student.strand}</p>
      <p>Section: {student.section}</p>
    </div>
  );
}

export default StudentDetails;
