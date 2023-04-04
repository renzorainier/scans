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
      <div>
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
              color = "bg-[#EC7063]";
              break;
            case "ontime":
              color = "bg-[#F7DC6F]";
              break;
            case "early":
              color = "bg-[#2ECC71]";
              break;
            default:
              color = "bg-[#BDCDD6]";
              break;
          }
          return (
            <div key={index} className="inline-block m-3">
              <div className={`${color} h-6 w-6 rounded-sm`}></div>
              <p className="text-sm font-semibold text-gray-600 mt-1">{grade}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentChart;
