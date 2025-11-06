'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={scrollToTop}
          className="
            fixed bottom-6 right-6
            w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
            rounded-full glass-pink text-foreground hover-lift
            flex items-center justify-center text-xl sm:text-2xl md:text-3xl
            shadow-lg
          "
          title="Scroll ke atas"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }} 
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
