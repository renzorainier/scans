import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function BadgeReader() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "badges/top"));
      const documents = querySnapshot.docs.map((doc) => doc.data());
      setData(documents);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Badge Reader</h2>
      {data.map((doc) => (
        <div key={doc.id}>
          <h3>{doc.title}</h3>
          <p>{doc.content}</p>
        </div>
      ))}
    </div>
  );
}

export default BadgeReader;
