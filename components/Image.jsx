import React from 'react';

const BobbingImage = () => {
  return (
    <div className="h-40 w-40 flex items-center justify-center animate-bob">
      <img
        src="path_to_your_image.jpg"
        alt="Bobbing Image"
        className="h-36 w-36 rounded-full"
      />
    </div>
  );
};

export default BobbingImage;
