import { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function BadgeReader() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "badges"));
      const documents = querySnapshot.docs.map((doc) => doc.data());
      setData(documents);
      console.log(documents)
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Badge Reader</h2>
      {data.map((doc) => (
        <div key={doc.id}>
          <h3>{doc.title}</h3>
          <p>{doc.top2}</p>
        </div>
      ))}
    </div>
  );
}

export default BadgeReader;
