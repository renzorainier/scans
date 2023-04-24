import React from "react";
import Image from "next/image";

import renz from "./../public/pictures/pic.jpg";
import celine from "./../public/pictures/pic.jpg";
import xedrick from "./../public/pictures/pic.jpg";
import aidrian from "./../public/pictures/pic.jpg";
import klaus from "./../public/pictures/pic.jpg";
import marjorie from "./../public/pictures/pic.jpg";

function TeamMembers() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden">
          <Image className="object-cover w-full h-full" src={renz} alt="Renz" />
        </div>
        <h2 className="font-bold text-base md:text-lg mt-2 md:mt-4">
          Renz Doe
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden">
          <Image
            className="object-cover w-full h-full"
            src={celine}
            alt="Celine"
          />
        </div>
        <h2 className="font-bold text-base md:text-lg mt-2 md:mt-4">
          Celine Doe
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden">
          <Image
            className="object-cover w-full h-full"
            src={xedrick}
            alt="Xedrick"
          />
        </div>
        <h2 className="font-bold text-base md:text-lg mt-2 md:mt-4">
          Xedrick Doe
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden">
          <Image
            className="object-cover w-full h-full"
            src={aidrian}
            alt="Aidrian"
          />
        </div>
        <h2 className="font-bold text-base md:text-lg mt-2 md:mt-4">
          Aidrian Doe
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden">
          <Image
            className="object-cover w-full h-full"
            src={klaus}
            alt="Klaus"
          />
        </div>
        <h2 className="font-bold text-base md:text-lg mt-2 md:mt-4">
          Klaus Doe
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden">
          <Image
            className="object-cover w-full h-full"
            src={marjorie}
            alt="Marjorie"
          />
        </div>
        <h2 className="font-bold text-base md:text-lg mt-2 md:mt-4">
          Marjorie Doe
        </h2>
      </div>
    </div>
  );
}

export default TeamMembers;
