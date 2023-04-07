// generate.js
import React, { useState } from "react";
import QRCode from "react-qr-code";

const mappingTable = {
  "0": "T3R",
  "1": "F5E",
  "2": "A9G",
  "3": "C6W",
  "4": "D2Q",
  "5": "V7Y",
  "6": "Z8H",
  "7": "N1U",
  "8": "K4X",
  "9": "M0J",
  "-": "-",
  "A": "QwE",
  "B": "PoI",
  "C": "LkM",
  "D": "YtR",
  "E": "DfG",
  "F": "HjK",
  "G": "ZxV",
  "H": "SaW",
  "I": "NcB",
  "J": "UyT",
  "K": "MlO",
  "L": "PbN",
  "M": "EaS",
  "N": "XqZ",
  "O": "GhF",
  "P": "JkD",
  "Q": "WnY",
  "R": "VpC",
  "S": "TmU",
  "T": "iHg",
  "U": "rLj",
  "V": "sNk",
  "W": "aBc",
  "X": "oQe",
  "Y": "tZu",
  "Z": "wDy"
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
