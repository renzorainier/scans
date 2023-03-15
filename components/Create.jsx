import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function StudentCollection() {
  const [students, setStudents] = useState([
    // { id: "01", lrn: "109329100333", name: "MALLARI, JHAZREAL", section: "1C", strand: "STEM", present: false },
    // { id: "02", lrn: "109350100604", name: "NALZARO, CHRISTIAN", section: "1C", strand: "STEM", present: false },
    // { id: "03", lrn: "109311100426", name: "VALLECERA, ROEL", section: "1C", strand: "STEM", present: false },
    // { id: "04", lrn: "109336100225", name: "INAS, JUSTIN", section: "1C", strand: "STEM", present: false },

  // { id: "01", lrn: "402969160037", name: "ALARCON, RHYZEA", section: "1A", strand: "STEM", present: false },
  // { id: "02", lrn: "109339100105", name: "BANTOG, THAMZ JAZLEY", section: "1A", strand: "STEM", present: false },
  // { id: "03", lrn: "114235070063", name: "BUCOG, JESSIELYN", section: "1A", strand: "STEM", present: false },

  // { id: "01", lrn: "109329100329", name: "MALICDEM, CARLO", section: "1B", strand: "STEM", present: false },
  // { id: "02", lrn: "109351121643", name: "PUREZA, XEDRICK", section: "1B", strand: "STEM", present: false },
  // { id: "03", lrn: "109311100219", name: "ILAO, GIAN RUSSEL", section: "1B", strand: "STEM", present: false },
  // { id: "04", lrn: "425707150124", name: "REGIS, YESTIN GABRIEL", section: "1B", strand: "STEM", present: false },
  { id: "04", lrn: "109352100024", name: "BELDA, CAMILLE SHAINNE", section: "1D", strand: "STEM", present: false },



  // { id: "109329100329", name: "MALICDEM, CARLO", section: "ST-1B", strand: "STEM" },
  // { id: "109351121643", name: "PUREZA, XEDRICK", section: "ST-1B", strand: "STEM" },
  // { id: "109311100219", name: "ILAO, GIAN RUSSEL", section: "ST-1B", strand: "STEM" },
  // { id: "425707150124", name: "REGIS, YESTIN GABRIEL", section: "ST-1B", strand: "STEM" }


  ]);

  // { id: "109329100329", name: "MALICDEM, CARLO", section: "ST-1A", strand: "STEM" },

  // { id: "109351121643", name: "PUREZA, XEDRICK", section: "ST-1A", strand: "STEM" },
  // { id: "109311100219", name: "ILAO, GIAN RUSSEL", section: "ST-1A", strand: "STEM" },
  // { id: "425707150124", name: "REGIS, YESTIN GABRIEL", section: "ST-1A", strand: "STEM" }


  // { id: "01", lrn: "402969160037", name: "ALARCON, RHYZEA", section: "ST-1A", strand: "STEM", present: false },
  // { id: "02", lrn: "109339100105", name: "BANTOG, THAMZ JAZLEY", section: "1A", strand: "STEM", present: false },
  // { id: "03", lrn: "114235070063", name: "BUCOG, JESSIELYN", section: "1A", strand: "STEM", present: false },

  const createCollection = async () => {
    const sectionDocRef = doc(db, "STEM", "1D");
    const sectionData = {};

    students.forEach((student) => {
      const { id, name, section, strand, present, lrn, } = student;
      sectionData[`${id}name`] = name;
      sectionData[`${id}lastScan`] = "";
      sectionData[`${id}present`] = present;
      sectionData[`${id}lrn`] = lrn;
      sectionData[`${id}status`] = "";
      sectionData[`${id}dif`] = "";
      sectionData[`${id}strand`] = strand;
      sectionData[`${id}section`] = section;
    });

    try {
      await setDoc(sectionDocRef, sectionData);
      console.log("Students collection created successfully");
    } catch (e) {
      console.error("Error creating students collection: ", e);
    }
  };

  return (
    <div>
      <button onClick={createCollection}>Create Students Collection</button>
    </div>
  );
}

export default StudentCollection;
