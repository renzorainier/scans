import React, { useState, useEffect } from "react";

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const screenHeight = window.innerHeight;
      const scrollPosition = window.pageYOffset;

      // Calculate the threshold for showing the button (e.g., 20% of the screen height)
      const threshold = screenHeight * 0.2;

      // Update the showButton state based on the scroll position
      setShowButton(scrollPosition > threshold);
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove the scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    showButton && (
      <button
        className="fixed bottom-4 right-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={scrollToTop}
      >
        Scroll to Top
      </button>
    )
  );
}

export default ScrollToTopButton;

