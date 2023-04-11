import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function BadgeWriter() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      // write data to Firebase
      await setDoc(doc(db, "badges/top"), {
        Top1: null,
        Top2: null,
        Top3: null,
        Top4: null,
        Top5: null,
        Top6: null,
        Top7: null,
        Top8: null,
        Top9: null,
        Top10: null,
        strandWide: null
      });
      console.log("Data successfully written to Firebase!");
    } catch (error) {
      console.error("Error writing data to Firebase: ", error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Write to Firebase"}
      </button>
    </div>
  );
}

export default BadgeWriter;
