import React from 'react';
import logo from '../images/logo.svg';

const About = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <img src={logo} alt="Logo" className="h-10 mb-4" />
      <p className="text-gray-700 text-lg leading-relaxed">
        Being early is always a good habit to exhibit. Wherever we go, whomever we will meet, and whatever time we are supposed to be in that place; everyone is always expected to present themselves at the right time – to be punctual at all times. Not meeting this expectation not only gives us a bad outlook, but also affects our performance. Likewise, every student is required to be in school and attend their classes on or before a specific time. Unfortunately, some students fail to, and any student has once experienced being late which is not really a surprising fact. The National Education for Statistics indicates that student tardiness occurs at a rate of 3.3% to 9.5% each day for all students in kindergarten through grade twelve (Harrman, 2007).
      </p>
      <p className="mt-4 text-gray-700 text-lg leading-relaxed">
        As a solution to this problem, most schools have a traditional way of attendance sheet logging at the school entrance. However, this is a time-consuming process and the attendance can be easily manipulated because it is manually written and can lead to inaccurate information. Therefore, utilizing the current technology that we now have access to, we developed a system to make a much more efficient and reliable attendance logging. QR code technology allows us to store information that when scanned, efficiently and almost instantly read and store this information somewhere. The attendance system that we developed utilizes this technology integrated into a website application we created that every student, teacher, and parent/guardian can visit anytime.
      </p>
      <p className="mt-4 text-gray-700 text-lg leading-relaxed">
        By keeping track of students' daily attendance time, storing it, and displaying it on a website application, the study aims to find out if the development of QR code technology can improve students' punctuality and attendance rates.
      </p>
    </div>
  );
};

export default About;
