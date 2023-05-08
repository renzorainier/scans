import React from 'react';
import Image from "next/image";


const BobbingImage = () => {
  return (
    <div className="h-40 w-40 flex items-center justify-center animate-bob">
      <Image
        src="/pictures/bob.png"
        alt="Bobbing Image"
        layout="fill"
        />
    </div>
  );
};

export default BobbingImage;
