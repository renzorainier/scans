import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function StudentCollection() {
  const [students, setStudents] = useState([
    { id: "01", lrn: "402969160037", name: "ALARCON, RHYZEA", section: "ST-1A", strand: "STEM", present: false },
    { id: "02", lrn: "109339100105", name: "BANTOG, THAMZ JAZLEY", section: "1A", strand: "STEM", present: false },
    { id: "03", lrn: "114235070063", name: "BUCOG, JESSIELYN", section: "1A", strand: "STEM", present: false },
  ]);

  const createCollection = async () => {
    const sectionDocRef = doc(db, "STEM", "1A");
    const sectionData = {};

    students.forEach((student) => {
      const { id, name, section, strand, present, lrn, } = student;
      sectionData[`${id}name`] = name;
      sectionData[`${id}lastScan`] = "";
      sectionData[`${id}present`] = present;
      sectionData[`${id}lrn`] = lrn;
      sectionData[`${id}status`] = "";
      sectionData[`${id}dif`] = "";
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
