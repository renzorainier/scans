import React from "react";
import Slider from "react-slick";


const teamMembers = [
  { name: "John Doe", imageUrl: "/pictures/1.png" },
  { name: "Jane Smith", imageUrl: "/pictures/2.png" },
  { name: "Bob Johnson", imageUrl: "/pictures/3.png" },
];

function TeamCarousel() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {teamMembers.map((member, index) => (
        <div key={index} className="team-member flex-shrink-0 w-full h-64">
          <div
            className="h-full bg-cover bg-center rounded-full"
            style={{ backgroundImage: `url(${member.imageUrl})` }}
          ></div>
          <div className="bg-black bg-opacity-50 p-4 rounded-b-lg">
            <h2 className="text-white text-lg font-bold">{member.name}</h2>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default TeamCarousel;
