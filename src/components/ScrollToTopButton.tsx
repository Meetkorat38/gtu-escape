"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      variant="outline"
      className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg bg-white hover:bg-gray-100 dark:bg-zinc-950 transition-colors"
    >
      <ArrowUp className="h-5 w-5 text-gray-800 dark:text-white" />
    </Button>
  );
};

export default ScrollToTopButton;
