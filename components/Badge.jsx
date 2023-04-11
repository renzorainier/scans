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
        OTop1: "",
        OTop2: "",
        OTop3: "",
        OTop4: "",
        OTop5: "",
        OTop6: "",
        OTop7: "",
        OTop8: "",
        OTop9: "",
        OTop10: "",
        OTop1t: "",
        OTop2t: "",
        OTop3t: "",
        OTop4t: "",
        OTop5t: "",
        OTop6t: "",
        OTop7t: "",
        OTop8t: "",
        OTop9t: "",
        OTop10t: "",

        STEM_1A_Top1: "",
        STEM_1A_Top2: "",
        STEM_1A_Top3: "",
        STEM_1A_Top4: "",
        STEM_1A_Top5: "",
        STEM_1A_Top6: "",
        STEM_1A_Top7: "",
        STEM_1A_Top8: "",
        STEM_1A_Top9: "",
        STEM_1A_Top10: "",
        STEM_1A_Top1t: "",
        STEM_1A_Top2t: "",
        STEM_1A_Top3t: "",
        STEM_1A_Top4t: "",
        STEM_1A_Top5t: "",
        STEM_1A_Top6t: "",
        STEM_1A_Top7t: "",
        STEM_1A_Top8t: "",
        STEM_1A_Top9t: "",
        STEM_1A_Top10t: "",

        STEM_1B_Top1: "",
        STEM_1B_Top2: "",
        STEM_1B_Top3: "",
        STEM_1B_Top4: "",
        STEM_1B_Top5: "",
        STEM_1B_Top6: "",
        STEM_1B_Top7: "",
        STEM_1B_Top8: "",
        STEM_1B_Top9: "",
        STEM_1B_Top10: "",
        STEM_1B_Top1t: "",
        STEM_1B_Top2t: "",
        STEM_1B_Top3t: "",
        STEM_1B_Top4t: "",
        STEM_1B_Top5t: "",
        STEM_1B_Top6t: "",
        STEM_1B_Top7t: "",
        STEM_1B_Top8t: "",
        STEM_1B_Top9t: "",
        STEM_1B_Top10t: "",

        STEM_1C_Top1: "",
        STEM_1C_Top2: "",
        STEM_1C_Top3: "",
        STEM_1C_Top4: "",
        STEM_1C_Top5: "",
        STEM_1C_Top6: "",
        STEM_1C_Top7: "",
        STEM_1C_Top8: "",
        STEM_1C_Top9: "",
        STEM_1C_Top10: "",

        STEM_1D_Top1: "",
        STEM_1D_Top2: "",
        STEM_1D_Top3: "",
        STEM_1D_Top4: "",
        STEM_1D_Top5: "",
        STEM_1D_Top6: "",
        STEM_1D_Top7: "",
        STEM_1D_Top8: "",
        STEM_1D_Top9: "",
        STEM_1D_Top10: "",
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
