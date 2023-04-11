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
        OTop1: null,
        OTop2: null,
        OTop3: null,
        OTop4: null,
        OTop5: null,
        OTop6: null,
        OTop7: null,
        OTop8: null,
        OTop9: null,
        OTop10: null,

        STEM-1A-Top1: null,
        STEM-1A-Top2: null,
        STEM-1A-Top3: null,
        STEM-1A-Top4: null,
        STEM-1A-Top5: null,
        STEM-1A-Top6: null,
        STEM-1A-Top7: null,
        STEM-1A-Top8: null,
        STEM-1A-Top9: null,
        STEM-1A-Top10: null,

        STEM-1B-Top1: null,
        STEM-1B-Top2: null,
        STEM-1B-Top3: null,
        STEM-1B-Top4: null,
        STEM-1B-Top5: null,
        STEM-1B-Top6: null,
        STEM-1B-Top7: null,
        STEM-1B-Top8: null,
        STEM-1B-Top9: null,
        STEM-1B-Top10: null,

        STEM-1C-Top1: null,
        STEM-1C-Top2: null,
        STEM-1C-Top3: null,
        STEM-1C-Top4: null,
        STEM-1C-Top5: null,
        STEM-1C-Top6: null,
        STEM-1C-Top7: null,
        STEM-1C-Top8: null,
        STEM-1C-Top9: null,
        STEM-1C-Top10: null,

        STEM-1D-Top1: null,
        STEM-1D-Top2: null,
        STEM-1D-Top3: null,
        STEM-1D-Top4: null,
        STEM-1D-Top5: null,
        STEM-1D-Top6: null,
        STEM-1D-Top7: null,
        STEM-1D-Top8: null,
        STEM-1D-Top9: null,
        STEM-1D-Top10: null,
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
