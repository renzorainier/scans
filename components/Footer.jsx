import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 py-4 px-8">
      <div className="container mx-auto text-center text-gray-500">
        <p className="text-sm">
          &copy; {currentYear} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
