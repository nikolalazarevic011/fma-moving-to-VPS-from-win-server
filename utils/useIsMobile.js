import { useState, useEffect } from "react";

export const useIsMobile = () => {
  // Initialize state with undefined so it can be set on client-side
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
    const checkIfMobile = () => window.innerWidth <= 435;

    // Set initial mobile state based on the window
    setIsMobile(checkIfMobile());

    function handleResize() {
      setIsMobile(checkIfMobile());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}; 
