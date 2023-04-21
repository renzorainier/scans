import { useState, useEffect, useRef } from "react";

const teamMembers = [
  { name: "John Doe", imageUrl: "/pictures/1.png" },
  { name: "Jane Smith", imageUrl: "/pictures/2.png" },
  { name: "Bob Johnson", imageUrl: "/pictures/3.png" },
];

function TeamCarousel() {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const stripRef = useRef(null);

  useEffect(() => {
    const strip = stripRef.current;
    const stripWidth = strip.offsetWidth;
    let intervalId = setInterval(() => {
      setCurrentMemberIndex((currentMemberIndex + 1) % teamMembers.length);
      strip.style.transform = `translateX(-${currentMemberIndex * stripWidth}px)`;
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentMemberIndex]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex" ref={stripRef}>
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member flex-shrink-0 w-full h-64">
            <div
              className="h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${member.imageUrl})` }}
            ></div>
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
