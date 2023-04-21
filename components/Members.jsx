import { useState, useEffect } from "react";

const teamMembers = [
  { name: "John Doe", imageUrl: "/pictures/1.png" },
  { name: "Jane Smith", imageUrl:  "/pictures/2.png" },
  { name: "Bob Johnson", imageUrl:  "/pictures/3.png"},
];

function TeamCarousel() {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMemberIndex((currentMemberIndex + 1) % teamMembers.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentMemberIndex]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex absolute top-1/2 left-0 transform -translate-y-1/2">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`${
              index === currentMemberIndex ? "opacity-100" : "opacity-50"
            } h-20 w-20 flex-shrink-0 rounded-full bg-cover bg-center mx-4 transition-opacity duration-500`}
            style={{ backgroundImage: `url(${member.imageUrl})` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default TeamCarousel;
