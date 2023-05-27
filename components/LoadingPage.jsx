import React from "react";
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div id="intro" className="flex items-center justify-center h-screen">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0 }}
        className="loading-text font-extrabold text-gray-900"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text"
        >
          Scae
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 50 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text"
        >
          e
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text"
        >
          n
        </motion.span>
      </motion.h1>
    </div>
  );
};

export default LoadingPage;
