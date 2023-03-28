import React from 'react';

function StudentDetails({ student, onClose }) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-4">
      <button className=" text-lg font-bold absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700" onClick={() => onClose()}>
        X
      </button>
      <p className="pt-4 text-lg font-bold mb-4">{student.name}</p>
    </div>
  );
}

export default StudentDetails;
