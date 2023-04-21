import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const teamMembers = [
  { name: "John Doe", imageUrl: "/pictures/1.png" },
  { name: "Jane Smith", imageUrl: "/pictures/2.png" },
  { name: "Bob Johnson", imageUrl: "/pictures/3.png" },
  { name: "Jane Doe", imageUrl: "/pictures/4.png" },
  { name: "Bob Smith", imageUrl: "/pictures/5.png" },
];

function TeamCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (current, next) => setCurrentSlide(next),
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <div className="relative overflow-hidden">
      <Slider {...settings}>
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member w-full h-64">
            <div
              className="h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${member.imageUrl})` }}
            ></div>
            <div className="bg-black bg-opacity-50 p-4">
              <h2 className="text-white text-lg font-bold">{member.name}</h2>
            </div>
          </div>
        ))}
      </Slider>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="text-gray-600">
          {currentSlide + 1} / {teamMembers.length}
        </div>
      </div>
    </div>
  );
}

export default TeamCarousel;
