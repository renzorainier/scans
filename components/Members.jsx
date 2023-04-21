import { useState, useEffect, useRef } from "react";

const teamMembers = [
  { name: "John Doe", imageUrl: "/pictures/pic.jpg" },
  { name: "Jane Smith", imageUrl: "/pictures/pic.jpg" },
  { name: "Bob Johnson", imageUrl: "/pictures/pic.jpg" },
  { name: "Alice Lee", imageUrl: "/pictures/pic.jpg" },
  { name: "Peter Parker", imageUrl: "/pictures/pic.jpg" },
  { name: "Mary Jane", imageUrl: "/pictures/pic.jpg" },
];

function TeamMembers() {
  return (
    <div className="grid grid-cols-3 gap-4 grid-auto-rows-minmax(0, 1fr)">
      {teamMembers.map((member, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center">
          <div className="rounded-full w-36 h-36 overflow-hidden mt-6">
            <img className="w-full h-full object-cover object-center" src={member.imageUrl} alt={member.name} />
          </div>
          <div className="p-4">
            <h2 className="font-bold text-lg mt-4">{member.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );


}

export default TeamMembers;
