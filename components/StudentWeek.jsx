import React from 'react';

function StudentDetails({ student }) {
  return (
    <div>
      <p>Name: {student.name}</p>
      <p>LRN: {student.lrn}</p>
    </div>
  );
}

export default StudentDetails;
