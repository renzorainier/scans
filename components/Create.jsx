import { useState } from "react";
import { collection, addDoc, doc, setDoc, deleteDoc, getDocs, batch } from "firebase/firestore";
import { db } from "./firebase";

function StudentCollection() {
  const [students, setStudents] = useState([
    { id: "402969160037", name: "ALARCON, RHYZEA", section: "ST-1A", strand: "STEM",  present: false, },
    { id: "114235070063", name: "BUCOG, JESSIELYN", section: "ST-1A", strand: "STEM" },
    { id: "109327100246", name: "BUAL, GABRIEL JOHN", section: "ST-1A", strand: "STEM" },
    { id: "109351121673", name: "DAEP, CASSANDRA", section: "ST-1A", strand: "STEM" },
    { id: "117873090005", name: "CAMIRING, LEO", section: "ST-1A", strand: "STEM" },
  ]);

  const createCollection = async () => {
    const studentsCollectionRef = collection(db, "STEM", "1B");
    const batchOps = batch();

    students.forEach((student) => {
      const studentRef = doc(studentsCollectionRef, student.id);
      batchOps.set(studentRef, { strand: student.strand, name: student.name, section: student.section});
    });
    try {
      await batchOps.commit();
      console.log("Students collection created successfully");
    } catch (e) {
      console.error("Error creating students collection: ", e);
    }
  };

  const deleteDocument = async () => {
    const studentRef = doc(db, "STEM", "1B");
    try {
      await deleteDoc(studentRef);
      console.log("Document deleted successfully");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };


  return (
    <div>
      <button onClick={createCollection}>Create Students Collection</button>
      <button onClick={deleteDocument}>Delete Document 1B</button>
    </div>
  );
}

export default StudentCollection;
