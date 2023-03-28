import React from 'react';

function StudentDetails({ student }) {
  return (
    <div>
      <p>Name: {student.name}</p>
    </div>
  );
}

export default StudentDetails;
