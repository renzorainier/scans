// generate.js
import React, { useState } from "react";
import QRCode from "react-qr-code";

const mappingTable = {
  "A": "0Z", "B": "1X", "C": "2C", "D": "3V", "E": "4B", "F": "5N",
  "G": "6M", "H": "7Q", "I": "8K", "J": "9L", "K": "AP", "L": "JH",
  "M": "FD", "N": "SE", "O": "GR", "P": "TY", "Q": "UI", "R": "OP",
  "S": "ZX", "T": "CV", "U": "NM", "V": "LK", "W": "JU", "X": "YH",
  "Y": "TB", "Z": "EQ", "0": "2W", "1": "4R", "2": "6T", "3": "8Y",
  "4": "0U", "5": "1I", "6": "3O", "7": "5P", "8": "7A", "9": "9S",
  "-": "DX"
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
