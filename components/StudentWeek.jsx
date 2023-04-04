function StudentChart({ student, onClose }) {
  const grades = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-4 w-4/5 ">
      <button
        className="text-lg font-bold absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => onClose()}
      >
        X
      </button>
      <p className="pt-4 text-lg font-bold">{student.name}</p>
      <p className="text-base">
        {student.strand}-{student.section}
      </p>
      <div className="flex justify-between">
        {grades.map((grade, index) => {
          let gradeValue;
          switch (grade) {
            case "Mon":
              gradeValue = "As";
              break;
            case "Tue":
              gradeValue = "Bs";
              break;
            case "Wed":
              gradeValue = "Cs";
              break;
            case "Thu":
              gradeValue = "Ds";
              break;
            case "Fri":
              gradeValue = "Es";
              break;
            default:
              break;
          }
          let color = "";
          switch (student[gradeValue]) {
            case "late":
              color = "bg-red-500";
              break;
            case "ontime":
              color = "bg-yellow-400";
              break;
            case "early":
              color = "bg-green-500";
              break;
            default:
              color = "bg-gray-400";
              break;
          }
          return (
            <div key={index} className="flex flex-col items-center">
              <p className="text-xs font-semibold text-gray-600">{grade}</p>
              <div className={`${color} h-6 w-6 rounded-full mb-1`}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentChart;
