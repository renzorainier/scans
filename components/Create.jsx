

import { useState } from "react";
import { collection, addDoc, doc, setDoc, deleteDocs, getDocs, batch } from "firebase/firestore";
import { db } from "./firebase";

function StudentCollection() {
  const [students, setStudents] = useState([
    { id: "402969160037", name: "ALARCON, RHYZEA", section: "ST-1A", strand: "STEM",  present: false, },
  ]);

  const createCollection = async () => {
    const studentsCollectionRef = collection(db, "STEM", "1B");
    const batch = [];

    students.forEach((student) => {
      const studentRef = doc(studentsCollectionRef, student.id);
      batch.push(setDoc(studentRef, { strand: student.strand, name: student.name, section: student.section}));
    });
    try {
      await Promise.all(batch);
      console.log("Students collection created successfully");
    } catch (e) {
      console.error("Error creating students collection: ", e);
    }
  };

  const deleteCollection = async () => {
    const studentsCollectionRef = collection(db, "STEM");
    const querySnapshot = await getDocs(studentsCollectionRef);
    const batch = batch();

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    try {
      await batch.commit();
      console.log("Students collection deleted successfully");
    } catch (e) {
      console.error("Error deleting students collection: ", e);
    }
  };


  return (
    <div>
      <button onClick={createCollection}>Create Students Collection</button>
      <button onClick={deleteCollection}>Delete Students Collectn</button>

    </div>
  );
}

export default StudentCollection;



