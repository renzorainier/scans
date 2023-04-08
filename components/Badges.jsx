import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";


function BadgeWriter() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      // write data to Firebase
      await db.collection("badges").doc("top").set({
        sectionWide: null,
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
