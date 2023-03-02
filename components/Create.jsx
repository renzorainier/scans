import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function StudentCollection() {
  const [students, setStudents] = useState([
    { id: "01", lrn: "402969160037", name: "ALARCON, RHYZEA", section: "ST-1A", strand: "STEM", present: false },
    { id: "02", name: "Student 2", section: "1A", strand: "STEM", present: false },
    { id: "03", name: "Student 3", section: "1A", strand: "STEM", present: false },
  ]);


  { id: "402969160037", name: "ALARCON, RHYZEA", section: "ST-1A", strand: "STEM" },
  { id: "109339100105", name: "BANTOG, THAMZ JAZLEY", section: "ST-1A", strand: "STEM" },
  { id: "114235070063", name: "BUCOG, JESSIELYN", section: "ST-1A", strand: "STEM" },
  { id: "109327100246", name: "BUAL, GABRIEL JOHN", section: "ST-1A", strand: "STEM" },
  { id: "109351121673", name: "DAEP, CASSANDRA", section: "ST-1A", strand: "STEM" },
  { id: "117873090005", name: "CAMIRING, LEO", section: "ST-1A", strand: "STEM" },
  { id: "402941150090", name: "EDANG, CHESKA", section: "ST-1A", strand: "STEM" },


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
