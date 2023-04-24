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
    <div className="grid grid-cols-3 md:grid-cols-6">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden">
          <Image className="object-cover w-full h-full" src={renz} alt="Renz" />
        </div>
        <h2 className="font-bold text-base md:text-lg mt-2 md:mt-4">
          Renz Pasagdan
        </h2>
          <h2 className=" text-base md:text-lg  md:mt-4">
          Leader
        </h2>
          <h2 className=" text-base md:text-lg  md:mt-4">
          Programmer
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
          Celine Mendi
        </h2>
        <h2 className=" text-base md:text-lg  md:mt-4">
          Researcher
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
          Xedrick Pureza
        </h2>
        <h2 className=" text-base md:text-lg  md:mt-4">
          Researcher
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
          Adrian Bataller
        </h2>
        <h2 className=" text-base md:text-lg  md:mt-4">
          Researcher
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
          Klaus Lonquino
        </h2>
        <h2 className=" text-base md:text-lg  md:mt-4">
          Researcher
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
          Marjorie Polinar
        </h2>
        <h2 className=" text-base md:text-lg  md:mt-4">
          Researcher
        </h2>
      </div>
    </div>
  );
}

export default TeamMembers;
