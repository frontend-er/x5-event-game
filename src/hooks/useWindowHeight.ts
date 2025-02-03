import { useState, useEffect } from "react";

const useWindowHeight = (offset = 0) => {
  const [height, setHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight - offset : 300
  );

  useEffect(() => {
    const updateHeight = () => setHeight(window.innerHeight - offset);

    window.addEventListener("resize", updateHeight);
    updateHeight(); // Initialize on mount

    return () => window.removeEventListener("resize", updateHeight);
  }, [offset, window]);

  return height;
};

export default useWindowHeight;
