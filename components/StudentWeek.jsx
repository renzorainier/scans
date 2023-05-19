import { useEffect, useState } from 'react';

function StudentChart({ student, onClose }) {
  const grades = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const times = ["A", "B", "C", "D", "E"];
  const [screenPosition, setScreenPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      const modalWidth = document.getElementById("student-chart-modal").offsetWidth;
      const modalHeight = document.getElementById("student-chart-modal").offsetHeight;

      const top = Math.max((innerHeight - modalHeight) / 2, 0);
      const left = Math.max((innerWidth - modalWidth) / 2, 0);

      setScreenPosition({ top, left });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className="fixed z-50 top-0 left-0 w-full h-full backdrop-blur-xl rounded-lg"></div>
      <div
        id="student-chart-modal"
        className="fixed z-50 bg-white rounded-md shadow-xl p-8 w-4/5 max-w-md"
        style={{ top: screenPosition.top, left: screenPosition.left }}
      >
        {/* Content here */}
      </div>
    </div>
  );
}

export default StudentChart;


// <button
// className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
// onClick={onClose}
// >
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   className="h-6 w-6"
//   fill="none"
//   viewBox="0 0 24 24"
//   stroke="currentColor"
// >
//   <path
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     strokeWidth="2"
//     d="M6 18L18 6M6 6l12 12"
//   />
// </svg>
// </button>

// <div className="p-4">
// <p className="text-xl font-bold">{student.name}</p>
// <p className="text-gray-500 text-base">
//   {student.strand}-{student.section}
// </p>
// </div>
// <div className="h-[2px] w-full mt-7 bg-gray-500"></div>

// <div className=" flex justify-between mt-8">
// {grades.map((grade, index) => {
//   let gradeValue;
//   switch (grade) {
//     case "Mon":
//       gradeValue = "As";
//       break;
//     case "Tue":
//       gradeValue = "Bs";
//       break;
//     case "Wed":
//       gradeValue = "Cs";
//       break;
//     case "Thu":
//       gradeValue = "Ds";
//       break;
//     case "Fri":
//       gradeValue = "Es";
//       break;
//     default:
//       break;
//   }
//   let color = "";
//   switch (student[gradeValue]) {
//     case "late":
//       color = "bg-red-500";
//       break;
//     case "ontime":
//       color = "bg-yellow-400";
//       break;
//     case "early":
//       color = "bg-green-500";
//       break;
//     default:
//       color = "bg-gray-400";
//       break;
//   }
//   const timeValue = student[times[index]];
//   return (
//     <div key={index} className="flex flex-col items-center">
//       <p className="text-xs font-semibold text-gray-500">{grade}</p>
//       <div className={`${color} h-6 w-6 rounded-full my-4`}></div>
//       {timeValue && times.includes(times[index]) ? (
//         <p className="text-xs font-semibold text-gray-500">
//           {new Date(timeValue.seconds * 1000).toLocaleTimeString([], {
//             hour: "numeric",
//             minute: "2-digit",
//             hour12: false,
//           })}
//         </p>
//       ) : (
//         <p className="text-xs font-semibold text-gray-500">
//           no record
//         </p>
//       )}
//     </div>
//   );
// })}
// </div>