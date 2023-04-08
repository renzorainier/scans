// generate.js
import React, { useState } from "react";
import QRCode from "react-qr-code";

const mappingTable = {
  "0": "Z",
  "1": "X",
  "2": "C",
  "3": "V",
  "4": "B",
  "5": "N",
  "6": "M",
  "-": "-",
  "8": "L",
  "9": "K",
  "7": "D",
  "A": "Q",
  "B": "R",
  "C": "E",
  "D": "F",
  "E": "G",
  "F": "H",
  "G": "I",
  "H": "J",
  "I": "P",
  "J": "S",
  "K": "U",
  "L": "Y",
  "M": "A",
  "N": "O",
  "O": "W",
  "P": "T",
  "Q": "1",
  "R": "2",
  "S": "3",
  "T": "4",
  "U": "5",
  "V": "6",
  "W": "7",
  "X": "8",
  "Y": "9",
  "Z": "0"
};


function Generate() {
  const [qrCodeValue, setQrCodeValue] = useState("");

  const transformValue = (value) => {
    let transformedValue = "";
    for (let i = 0; i < value.length; i++) {
      const char = value[i].toUpperCase();
      if (mappingTable.hasOwnProperty(char)) {
        transformedValue += mappingTable[char];
      }
      console.log(transformedValue)
    }
    return transformedValue;
    // console.log(qrCodeValue)
  };

  return (
    <div className="bg-white flex flex-col items-center">
      <div>Generate QR</div>
      {qrCodeValue !== "" && <QRCode value={transformValue(qrCodeValue)} />}
      <input className="text-black"
        onChange={(e) => {
          setQrCodeValue(e.target.value);
        }}
      />
    </div>
  );
}

export default Generate;



// import React, { useState } from "react";
// import QRCode from "react-qr-code";

// function Generate() {
//   const [qrCodeValue, setQrCodeValue] = useState("");

//   return (
//     <div className="bg-white flex flex-col items-center">
//       <div>Generate QR</div>
//       {qrCodeValue != "" && <QRCode value={qrCodeValue} />}
//       <input className="text-black"
//         onChange={(e) => {
//           setQrCodeValue(e.target.value);
//         }}
//       />
//     </div>
//   );
// }

// export default Generate;
