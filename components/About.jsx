import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import TeamMembers from "./Members.jsx";

const About = () => {
  const [card1Expanded, setCard1Expanded] = useState(false);
  const [card2Expanded, setCard2Expanded] = useState(false);
  const [card3Expanded, setCard3Expanded] = useState(false);
  const [card4Expanded, setCard4Expanded] = useState(true);
  const [card5Expanded, setCard5Expanded] = useState(false);

  const toggleCard1 = () => setCard1Expanded(!card1Expanded);
  const toggleCard2 = () => setCard2Expanded(!card2Expanded);
  const toggleCard3 = () => setCard3Expanded(!card3Expanded);
  const toggleCard4 = () => setCard4Expanded(!card4Expanded);
  const toggleCard5 = () => setCard5Expanded(!card5Expanded);

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
  About <span className="bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">Scans</span>
</h2>
<p className="text-gray-500 text-sm mt-2">Latest Update: <span className="font-semibold">May 22, 2023</span></p>

</div>

<div class="text-center mt-8">
  <h1 class="text-lg font-bold text-gray-900">
    With the widespread adoption of <span class="text-violet-400">beep cards</span> in private schools,
  </h1>
  <h1 class="text-lg font-bold text-gray-900">
    <span class="text-purple-400">SCAS</span> can revolutionize its attendance system by implementing its own <span class="text-blue-400">innovative</span> solution.
  </h1>
</div>



        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            style={{ animation: "slide-from-left 1s ease forwards" }}
          >
            <div
              className="px-4 py-5 sm:p-6 cursor-pointer"
              onClick={toggleCard1}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold leading-6  text-gray-900">
                  What is{" "}
                  <span class="bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
                    Scans
                  </span>
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
                <div className="mt-2 pl-2 text-sm text-gray-500">
                  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;Scans is an attendance system
                  developed by Renz Pasagdan - a Grade 12 STEM-1B student of
                  Sumulong College of Arts and Sciences as a research project
                  titled &ldquo;<span className="text-violet-400">Development of QR Code Technology as an
                  Attendance System for Enhancing Attendance and
                  Punctuality</span>&rdquo;. One of the key advantages of Scans, is its cost-effectiveness. Unlike the other systems utilized by many prominent private schools, scans incurs zero expenses in its operation.
                </div>
              )}
            </div>
          </div>

          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            style={{ animation: "slide-from-left 1s ease 0.1s forwards" }}
          >
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
                <div className="mt-2 pl-2 text-sm text-gray-500">
                  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;Our{" "}
                  <span class="bg-gradient-to-r text-xl from-blue-400 to-violet-400 text-transparent bg-clip-text">
                    {" "}
                    mission{" "}
                  </span>
                  is to improve student attendance and punctuality by utilizing
                  QR code technology and psychological theories to create an
                  efficient and reliable attendance tracking system. We strive
                  to empower students, teachers, and parents with real-time
                  attendance data to foster a culture of accountability and
                  academic excellence.
                </div>
              )}
            </div>
          </div>
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            style={{ animation: "slide-from-left 1s ease 0.1s forwards" }}
          >
            <div
              className="px-4 py-5 sm:p-6 cursor-pointer"
              onClick={toggleCard5}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold  leading-6 text-gray-900">
                  How{" "}
                  <span class="bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
                    Scans
                  </span>{" "}
                  Work?
                </h3>
                <div className="flex items-center">
                  <FaChevronDown
                    className={`transition-transform ${
                      card5Expanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {card5Expanded && (
                <div className="mt-2 pl-2 text-sm text-gray-500">
                  <ul>
                    <li>
                      <span class="bg-gradient-to-r text-xl from-blue-400 to-violet-400 text-transparent bg-clip-text">
                        1. Scan QR Code
                      </span>
                    </li>

                    <li className="pl-3">
                      Students&apos; unique QR codes are scanned at the gate upon
                      entering the school (In the trial phase, a selected
                      student scans the QR codes of their classmates instead.)
                    </li>
                    <li>
                      <span class="bg-gradient-to-r text-xl from-blue-400 to-violet-400 text-transparent bg-clip-text">
                        2. Mark Attendance and Color Code
                      </span>
                    </li>
                    <li className="pl-3">
                      The system marks the student&apos;s attendance for the day and
                      assigns a color code (green for early, yellow for on time,
                      red for late).
                    </li>
                    <li>
                      <span class="bg-gradient-to-r text-xl from-blue-400 to-violet-400 text-transparent bg-clip-text">
                        3. Access Attendance Records and Digital Badges
                      </span>
                    </li>
                    <li className="pl-3">
                      Students, teachers, and parents can view attendance
                      records and digital badges on scans-scas.vercel.app.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            style={{ animation: "slide-from-left 1s ease 0.2s forwards" }}
          >
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
                      <span class="bg-gradient-to-r text-xl from-blue-400 to-violet-400 text-transparent bg-clip-text">
                        {" "}
                        Students:
                      </span>{" "}
                      Motivates attendance and punctuality, recognizes and
                      rewards positive behavior through digital achievement
                      badges.
                    </li>
                    <li>
                      <span class="bg-gradient-to-r text-xl from-blue-400 to-violet-400 text-transparent bg-clip-text">
                        {" "}
                        Teachers:
                      </span>{" "}
                      Streamlines administrative tasks, enhances attendance
                      tracking and monitoring, enabling more time for teaching.
                    </li>
                    <li>
                      <span class="bg-gradient-to-r text-xl from-blue-400 to-violet-400 text-transparent bg-clip-text">
                        {" "}
                        Parents/Guardians:
                      </span>{" "}
                      Offers timely attendance data for their child, allowing
                      for better involvement in their education.
                    </li>
                    <li>
                      <span class="bg-gradient-to-r text-xl from-blue-400 to-violet-400 text-transparent bg-clip-text">
                        {" "}
                        School:{" "}
                      </span>
                      Cultivates a culture of responsibility and academic
                      success, advances student participation and lowers
                      absenteeism rates.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            style={{ animation: "slide-from-left 1s ease 0.3s forwards" }}
          >
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
