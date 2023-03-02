import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function StudentCollection() {
  const [students, setStudents] = useState([
    { id: "01", name: "Student 1", section: "1A", strand: "STEM", present: false },
    { id: "02", name: "Student 2", section: "1A", strand: "STEM", present: false },
    { id: "03", name: "Student 3", section: "1A", strand: "STEM", present: false },
  ]);

  const createCollection = async () => {
    const sectionDocRef = doc(db, "STEM", "1A");
    const sectionData = {};

    students.forEach((student) => {
      const { id, name, section, strand, present } = student;
      sectionData[`${id}name`] = name;
      sectionData[`${id}lastScan`] = "";
      sectionData[`${id}present`] = present;
      sectionData["strand"] = strand;
      sectionData["section"] = section;
    });

    try {
      await setDoc(sectionDocRef, sectionData);
      console.log("Students collection created successfully");
    } catch (e) {
      console.error("Error creating students collection: ", e);
    }
  };

  return (
    <div>
      <button onClick={createCollection}>Create Students Collection</button>
    </div>
  );
}

export default StudentCollection;
