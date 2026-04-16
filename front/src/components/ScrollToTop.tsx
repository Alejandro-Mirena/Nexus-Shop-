"use client";

import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className=" bg-[#0071E3] fixed bottom-10 right-6 w-10 h-10 rounded-full cursor-pointer text-white flex items-center justify-center shadow-md hover:opacity-80 transition-opacity z-50"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
};

export default ScrollToTop;
