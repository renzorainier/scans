import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import TeamMembers from "./Members.jsx";

const About = () => {
  const [card1Expanded, setCard1Expanded] = useState(false);
  const [card2Expanded, setCard2Expanded] = useState(false);
  const [card3Expanded, setCard3Expanded] = useState(false);
  const [card4Expanded, setCard4Expanded] = useState(true);

  const toggleCard1 = () => setCard1Expanded(!card1Expanded);
  const toggleCard2 = () => setCard2Expanded(!card2Expanded);
  const toggleCard3 = () => setCard3Expanded(!card3Expanded);
  const toggleCard4 = () => setCard4Expanded(!card4Expanded);

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
  About <span class="bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">Scans</span>
</h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div
              className="px-4 py-5 sm:p-6 cursor-pointer"
              onClick={toggleCard1}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold leading-6  text-gray-900">
                  What is  <span class="bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">Scans</span> ?
                </h3>
                <div className="flex items-center">
                  <FaChevronDown
                    className={`transition-transform ${
                      card1Expanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {card1Expanded && (
                <div className="mt-2 text-sm text-gray-500">
                  Scans is a web application developed by Renz Pasagdan - a Grade 12 ST-1B
                  student of Sumulong College of Arts and Sciences as a research
                  project titled &ldquo;Development of QR Code Technology as an
                  Attendance System for Enhancing Attendance and
                  Punctuality&rdquo;
                </div>
              )}
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div
              className="px-4 py-5 sm:p-6 cursor-pointer"
              onClick={toggleCard2}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold  leading-6 text-gray-900">
                  Our Mission
                </h3>
                <div className="flex items-center">
                  <FaChevronDown
                    className={`transition-transform ${
                      card2Expanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {card2Expanded && (
                <div className="mt-2 text-sm text-gray-500">
                  Our mission is to improve student attendance and punctuality
                  by utilizing QR code technology and psychological theories to
                  create an efficient and reliable attendance tracking system.
                  We strive to empower students, teachers, and parents with
                  real-time attendance data to foster a culture of
                  accountability and academic excellence.
                </div>
              )}
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div
              className="px-4 py-5 sm:p-6 cursor-pointer"
              onClick={toggleCard3}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg  font-bold  leading-6  text-gray-900">
                  Who will Benefit?
                </h3>
                <div className="flex items-center">
                  <FaChevronDown
                    className={`transition-transform ${
                      card3Expanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {card3Expanded && (
                <div className="mt-2 text-sm text-gray-500">
                  <ul className="list-disc list-inside">
                    <li>
                      <span classname="font-bold"> Students:</span>  Motivates attendance and punctuality, recognizes
                      and rewards positive behavior through digital achievement
                      badges.
                    </li>
                    <li>
                    <span classname="font-bold"> Teachers: </span> Streamlines administrative tasks, enhances
                      attendance tracking and monitoring, enabling more time for
                      teaching.
                    </li>
                    <li>
                    <span classname="font-bold"> Parents/Guardians:  </span>  Offers timely attendance data for their
                      child, allowing for better involvement in their education.
                    </li>
                    <li>
                    <span classname="font-bold "> School:  </span> Cultivates a culture of responsibility and
                      academic success, advances student participation and
                      lowers absenteeism rates.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div
              className="px-4 py-5 sm:p-6 cursor-pointer"
              onClick={toggleCard4}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold  leading-6  text-gray-900">
                  Meet Our Team
                </h3>
                <div className="flex items-center">
                  <FaChevronDown
                    className={`transition-transform ${
                      card4Expanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {card4Expanded && <TeamMembers />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
