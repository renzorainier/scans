import React from "react";

const teamMembers = [
  { name: "John Doe", imageUrl: "/pictures/1.png" },
  { name: "Jane Smith", imageUrl: "/pictures/2.png" },
  { name: "Bob Johnson", imageUrl: "/pictures/3.png" },
  { name: "Samuel Lee", imageUrl: "/pictures/4.png" },
  { name: "Emma Watson", imageUrl: "/pictures/5.png" },
  { name: "Peter Parker", imageUrl: "/pictures/6.png" },
];

function TeamMembers() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {teamMembers.map((member, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img className="w-full h-64 object-cover object-center" src={member.imageUrl} alt={member.name} />
          <div className="p-4">
            <h2 className="font-bold text-lg">{member.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TeamMembers;
