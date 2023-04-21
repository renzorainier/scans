import { useState, useEffect, useRef } from "react";

const teamMembers = [
  { name: "John Doe", imageUrl: "https://example.com/john-doe.jpg" },
  { name: "Jane Smith", imageUrl: "https://example.com/jane-smith.jpg" },
  { name: "Bob Johnson", imageUrl: "https://example.com/bob-johnson.jpg" },
];

function TeamCarousel() {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const memberWidth = container.querySelector(".team-member").offsetWidth;
    let intervalId = setInterval(() => {
      setCurrentMemberIndex((currentMemberIndex + 1) % teamMembers.length);
      container.style.transform = `translateX(-${currentMemberIndex * memberWidth}px)`;
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentMemberIndex]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex" ref={containerRef}>
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
