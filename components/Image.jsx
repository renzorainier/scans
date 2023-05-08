import React from 'react';
import Image from "next/image";

const BobbingImage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-64 w-64 flex items-center justify-center animate-bob">
        <div className="relative h-56 w-56">
          <Image
            src="/pictures/bob.png"
            alt="Bobbing Image"
            layout="fill"
          />
        </div>
      </div>
    </div>
  );
};

export default BobbingImage;
