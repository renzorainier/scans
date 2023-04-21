import { useState, useEffect, useRef } from "react";

const teamMembers = [
  { name: "John Doe", imageUrl: "/pictures/1.png" },
  { name: "Jane Smith", imageUrl: "/pictures/2.png" },
  { name: "Bob Johnson", imageUrl: "/pictures/3.png" },
  { name: "Doe", imageUrl: "/pictures/4.png" },
  { name: "Smith", imageUrl: "/pictures/5.png" },
  { name: "Johnson", imageUrl: "/pictures/6.png" },
];

function TeamCarousel() {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const stripRef = useRef(null);

  useEffect(() => {
    const strip = stripRef.current;
    const stripWidth = strip.offsetWidth / teamMembers.length;
    let intervalId = setInterval(() => {
      setCurrentMemberIndex((currentMemberIndex + 1) % teamMembers.length);
      strip.style.transform = `translateX(-${currentMemberIndex * stripWidth}px)`;
    }, 500);
    return () => clearInterval(intervalId);
  }, [currentMemberIndex]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex" ref={stripRef}>
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64">
            <div
              className="h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${member.imageUrl})` }}
            ></div>
            <div className="bg-black bg-opacity-50 p-2 sm:p-3 md:p-4">
              <h2 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">{member.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamCarousel;
