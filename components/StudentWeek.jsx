import React from 'react';

function StudentDetails({ student, onClose }) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-4">
      <button className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700" onClick={() => onClose()}>
        <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.414 5.586a2 2 0 0 1 2.828 0L10 6.172l1.758-1.758a2 2 0 0 1 2.828 2.828L12.828 9l1.758 1.758a2 2 0 1 1-2.828 2.828L10 11.172l-1.758 1.758a2 2 0 1 1-2.828-2.828L7.172 9 5.414 7.242a2 2 0 0 1 0-2.828z"/></svg>
      </button>
      <p className="pt-4 text-lg font-bold mb-4">{student.name}</p>

    </div>
  );
}

export default StudentDetails;
