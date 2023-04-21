import { useState } from "react";

const teamMembers = [
  { name: "John Doe", imageUrl: "https://example.com/john-doe.jpg" },
  { name: "Jane Smith", imageUrl: "https://example.com/jane-smith.jpg" },
  { name: "Bob Johnson", imageUrl: "https://example.com/bob-johnson.jpg" },
];

function TeamCarousel() {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);

  const prevMember = () => {
    setCurrentMemberIndex((currentMemberIndex - 1 + teamMembers.length) % teamMembers.length);
  };

  const nextMember = () => {
    setCurrentMemberIndex((currentMemberIndex + 1) % teamMembers.length);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button className="text-white bg-gray-500 px-2 py-1 rounded-l" onClick={prevMember}>
          {"<"}
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button className="text-white bg-gray-500 px-2 py-1 rounded-r" onClick={nextMember}>
          {">"}
        </button>
      </div>
      <div className="flex overflow-x-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`w-full flex-shrink-0 h-64 bg-cover bg-center transition-transform ${
              index === currentMemberIndex ? "transform-none" : "transform translate-x-full"
            }`}
            style={{ backgroundImage: `url(${member.imageUrl})` }}
          >
            <div className="bg-black bg-opacity-50 p-4">
              <h2 className="text-white text-lg font-bold">{member.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamCarousel;
