function StudentChart({ student, onClose }) {
  const grades = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-4 w-3/4 h-1/2">
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
            case "Monday":
              gradeValue = "As";
              break;
            case "Tuesday":
              gradeValue = "Bs";
              break;
            case "Wednesday":
              gradeValue = "Cs";
              break;
            case "Thursday":
              gradeValue = "Ds";
              break;
            case "Friday":
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
              <div className={`${color} h-6 w-6 rounded-full mb-1`}></div>
              <p className="text-xs font-semibold text-gray-600">{grade === "Monday" ? "E" : "A"}</p>
              <p className="text-xs font-semibold text-gray-600">{grade}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentChart;
