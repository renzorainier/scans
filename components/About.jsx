import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          About Scans
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                What is Scans?
              </h3>
              <div className="mt-2 text-sm text-gray-500">
                Scans is a web application developed by a Grade 12 ST-1B student of Sumulong College of Arts and Sciences as a research project titled "Development of QR Code Technology as an Attendance System for Enhancing Attendance and Punctuality"
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Our Mission
              </h3>
              <div className="mt-2 text-sm text-gray-500">
                Our mission is to improve student attendance and punctuality by utilizing QR code technology and psychological theories to create an efficient and reliable attendance tracking system. We strive to empower students, teachers, and parents with real-time attendance data to foster a culture of accountability and academic excellence.
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Who Will Benefit?
              </h3>
              <div className="mt-2 text-sm text-gray-500">
                <ul className="list-disc list-inside">
                  <li>Students: Motivates attendance and punctuality, recognizes and rewards positive behavior through digital achievement badges.</li>
                  <li>Teachers: Streamlines administrative tasks, enhances attendance tracking and monitoring, enabling more time for teaching.</li>
                  <li>Parents/Guardians: Offers timely attendance data for their child, allowing for better involvement in their education.</li>
                  <li>School: Cultivates a culture of responsibility and academic success, advances student participation and lowers absenteeism rates.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
