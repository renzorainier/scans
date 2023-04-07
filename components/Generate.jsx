// generate.js
import React, { useState } from "react";
import QRCode from "react-qr-code";

const mappingTable = {
  "0": "T",
  "1": "F",
  "2": "A",
  "3": "C",
  "4": "D",
  "5": "V",
  "6": "Z",
  "7": "N",
  "8": "K",
  "9": "M",
  "-": "-",
  "A": "Q",
  "B": "-",
  "C": "L",
  "D": "Y",
  "E": "D",
  "F": "H",
  "G": "Z",
  "H": "S",
  "I": "N",
  "J": "-",
  "K": "M",
  "L": "P",
  "M": "E",
  "N": "X",
  "O": "-",
  "P": "J",
  "Q": "W",
  "R": "V",
  "S": "T",
  "T": "I",
  "U": "-",
  "V": "S",
  "W": "B",
  "X": "-",
  "Y": "T",
  "Z": "W"
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
