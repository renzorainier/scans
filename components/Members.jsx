import React from "react";
import Image from "next/image";

import renz from "./../public/pictures/renz.webp";
import celine from "./../public/pictures/celine.webp";
import xedrick from "./../public/pictures/xed.webp";
import aidrian from "./../public/pictures/adrian.webp";
import klaus from "./../public/pictures/klas.jpeg";
import marjorie from "./../public/pictures/marjorie.webp";

function TeamMembers() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
      <TeamMember
        name="Renz Pasagdan"
        role="Leader | Programmer"
        image={renz}
      />
      <TeamMember
        name="Celine Mendi"
        role="Researcher"
        image={celine}
      />
      <TeamMember
        name="Xedrick Pureza"
        role="Researcher"
        image={xedrick}
      />
        <TeamMember
        name="Marjorie Polinar"
        role="Researcher"
        image={marjorie}
      />
      <TeamMember
        name="Adrian Bataller"
        role="Researcher"
        image={aidrian}
      />
      <TeamMember
        name="Klaus Lonquino"
        role="Researcher"
        image={klaus}
      />

    </div>
  );
}

function TeamMember({ name, role, image }) {
  return (
    <div className="flex flex-col pt-6 items-center">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
        <Image className="object-cover w-full h-full" src={image} alt={name} />
      </div>
      <h2 className="font-bold text-lg mt-2 md:text-xl md:mt-4">{name}</h2>
      <h3 className="text-sm md:text-lg md:mt-2">{role}</h3>
    </div>
  );
}

export default TeamMembers;
