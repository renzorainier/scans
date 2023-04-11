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
        STEM_1B_Top1t: null,
        STEM_1B_Top2t: null,
        STEM_1B_Top3t: null,
        STEM_1B_Top4t: null,
        STEM_1B_Top5t: null,
        STEM_1B_Top6t: null,
        STEM_1B_Top7t: null,
        STEM_1B_Top8t: null,
        STEM_1B_Top9t: null,
        STEM_1B_Top10t: null,


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






// STEM_1B_Top1: "",
// STEM_1B_Top2: "",
// STEM_1B_Top3: "",
// STEM_1B_Top4: "",
// STEM_1B_Top5: "",
// STEM_1B_Top6: "",
// STEM_1B_Top7: "",
// STEM_1B_Top8: "",
// STEM_1B_Top9: "",
// STEM_1B_Top10: "",
// STEM_1B_Top1t: "",
// STEM_1B_Top2t: "",
// STEM_1B_Top3t: "",
// STEM_1B_Top4t: "",
// STEM_1B_Top5t: "",
// STEM_1B_Top6t: "",
// STEM_1B_Top7t: "",
// STEM_1B_Top8t: "",
// STEM_1B_Top9t: "",
// STEM_1B_Top10t: "",

// STEM_1C_Top1: "",
// STEM_1C_Top2: "",
// STEM_1C_Top3: "",
// STEM_1C_Top4: "",
// STEM_1C_Top5: "",
// STEM_1C_Top6: "",
// STEM_1C_Top7: "",
// STEM_1C_Top8: "",
// STEM_1C_Top9: "",
// STEM_1C_Top10: "",
// STEM_1C_Top1t: "",
// STEM_1C_Top2t: "",
// STEM_1C_Top3t: "",
// STEM_1C_Top4t: "",
// STEM_1C_Top5t: "",
// STEM_1C_Top6t: "",
// STEM_1C_Top7t: "",
// STEM_1C_Top8t: "",
// STEM_1C_Top9t: "",
// STEM_1C_Top10t: "",

// STEM_1D_Top1: "",
// STEM_1D_Top2: "",
// STEM_1D_Top3: "",
// STEM_1D_Top4: "",
// STEM_1D_Top5: "",
// STEM_1D_Top6: "",
// STEM_1D_Top7: "",
// STEM_1D_Top8: "",
// STEM_1D_Top9: "",
// STEM_1D_Top10: "",
// STEM_1D_Top1t: "",
// STEM_1D_Top2t: "",
// STEM_1D_Top3t: "",
// STEM_1D_Top4t: "",
// STEM_1D_Top5t: "",
// STEM_1D_Top6t: "",
// STEM_1D_Top7t: "",
// STEM_1D_Top8t: "",
// STEM_1D_Top9t: "",
// STEM_1D_Top10t: "",
