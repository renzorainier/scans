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
        
        STEM_1A_Top1: null,
        STEM_1A_Top2: null,
        STEM_1A_Top3: null,
        STEM_1A_Top4: null,
        STEM_1A_Top5: null,
        STEM_1A_Top6: null,
        STEM_1A_Top7: null,
        STEM_1A_Top8: null,
        STEM_1A_Top9: null,
        STEM_1A_Top10: null,

        STEM_1B_Top1: null,
        STEM_1B_Top2: null,
        STEM_1B_Top3: null,
        STEM_1B_Top4: null,
        STEM_1B_Top5: null,
        STEM_1B_Top6: null,
        STEM_1B_Top7: null,
        STEM_1B_Top8: null,
        STEM_1B_Top9: null,
        STEM_1B_Top10: null,

        STEM_1C_Top1: null,
        STEM_1C_Top2: null,
        STEM_1C_Top3: null,
        STEM_1C_Top4: null,
        STEM_1C_Top5: null,
        STEM_1C_Top6: null,
        STEM_1C_Top7: null,
        STEM_1C_Top8: null,
        STEM_1C_Top9: null,
        STEM_1C_Top10: null,

        STEM_1D_Top1: null,
        STEM_1D_Top2: null,
        STEM_1D_Top3: null,
        STEM_1D_Top4: null,
        STEM_1D_Top5: null,
        STEM_1D_Top6: null,
        STEM_1D_Top7: null,
        STEM_1D_Top8: null,
        STEM_1D_Top9: null,
        STEM_1D_Top10: null,
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
