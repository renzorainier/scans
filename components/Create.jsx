

import { useState } from "react";
import { collection, addDoc, doc, setDoc, deleteDocs, getDocs, bacth } from "firebase/firestore";
import { db } from "./firebase";

const deleteCollection = async (collectionPath) => {
  const q = query(collection(db, collectionPath));
  const querySnapshot = await getDocs(q);

  const batchDelete = batch(db);
  querySnapshot.forEach((doc) => {
    batchDelete(deleteDoc(doc.ref));
  });

  await batchDelete.commit();
  console.log(`Collection ${collectionPath} deleted successfully`);
};

const DeleteCollectionButton = () => {
  const handleDeleteCollection = async () => {
    await deleteCollection("STEM/1B");
  };


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

  const handleDeleteCollection = async () => {
    const studentsCollectionRef = collection(db, "STEM");
    await deleteCollection(studentsCollectionRef);
  };

  return (
    <div>
      <button onClick={createCollection}>Create Students Collection</button>
      <button onClick={handleDeleteCollection}>Delete Students Collection</button>
    </div>
  );
}

export default StudentCollection;



