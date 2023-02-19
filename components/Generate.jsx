// generate.js
import React, { useState } from "react";
import QRCode from "react-qr-code";

function Generate() {
  const [qrCodeValue, setQrCodeValue] = useState("");

  return (
    <div>
      <div>Generate QR</div>
      {qrCodeValue != "" && <QRCode value={qrCodeValue} />}
      <input
        onChange={(e) => {
          setQrCodeValue(e.target.value);
        }}
      />
    </div>
  );
}

export default Generate;
