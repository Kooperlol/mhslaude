"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function OverlayConfetti() {
  const [shown, setShown] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({
      width,
      height,
    });
    setClient(true);

    const handleScroll = () => {
      const newHeight = window.innerHeight;
      setDimensions((prevDimensions) => ({
        ...prevDimensions,
        height: newHeight,
      }));
    };
    window.addEventListener("scroll", handleScroll);

    const opacityTimer = setTimeout(() => {
      setShown(false);
    }, 8000);

    return () => {
      clearTimeout(opacityTimer);
    };
  }, []);

  return (
    <>
      {isClient && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: shown ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ zIndex: 100, position: "relative" }}
        >
          <Confetti
            style={{ zIndex: 100, position: "fixed", top: 0, left: 0 }}
            tweenDuration={1000}
            numberOfPieces={300}
            wind={0.01}
            colors={["#000000", "#470100", "#9F302F"]}
            width={dimensions.width}
            height={dimensions.height}
          />
        </motion.div>
      )}
    </>
  );
}
