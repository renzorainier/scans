import React, { useState } from "react";
import { collection, query, where, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

function SavePresentStudents() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSavePresentStudents = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");

    try {
      const presentStudentsQuery = query(collection(db, "students"), where("present", "==", true));
      const presentStudentsQuerySnapshot = await getDocs(presentStudentsQuery);
      const presentStudents = presentStudentsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        lastScan: new Date(doc.data().lastScan?.toDate() || null),
      }));

      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10);

      const presentStudentsDocRef = doc(db, "presentStudents", dateStr);

      // Check if the document already exists with today's date
      const presentStudentsDocSnapshot = await getDoc(presentStudentsDocRef);

      if (presentStudentsDocSnapshot.exists() && presentStudentsDocSnapshot.id === dateStr) {
        // Document with today's date exists, update the data
        const presentStudentsData = presentStudentsDocSnapshot.data();
        presentStudentsData.presentStudents = [...presentStudentsData.presentStudents, ...presentStudents];
        await setDoc(presentStudentsDocRef, presentStudentsData);
      } else {
        // Document with today's date does not exist, create it
        await setDoc(presentStudentsDocRef, { presentStudents: presentStudents });
      }

      setIsLoading(false)
      setIsSuccess(true);
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage("Error saving present students: " + e.message);
      console.error(e);
    }
  };

  return (
    <div>
      <button onClick={handleSavePresentStudents}>Save Present Students</button>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Present students saved successfully.</p>}
      {isError && <p>{errorMessage}</p>}
    </div>

  );
}

export default SavePresentStudents;