import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (

  <footer className="bg-gray-200 py-4 px-8">
      <div className="container mx-auto text-center text-gray-700">
        <p className="text-sm">
          <span className="font-bold">Scans</span> &copy; {currentYear}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
