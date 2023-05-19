import React from "react";

function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="fixed bottom-4 right-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
      onClick={scrollToTop}
    >
      Scroll to Top
    </button>
  );
}

export default ScrollToTopButton;
