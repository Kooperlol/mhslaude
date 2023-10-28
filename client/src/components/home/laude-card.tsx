"use client";
import React from "react";
import Image from "next/image";
import { Laude, toLatin } from "../../enums/laude-enum";
import { motion } from "framer-motion";

export default function LaudeCard(laude: Laude) {
  return (
    <motion.div
      className="flex flex-col gap-2 text-white font-bravaslab items-center text-center"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <p className="text-xl font-bold select-none">{laude}</p>
      <Image
        priority
        draggable={false}
        src={`/media/${laude.replaceAll(" ", "_").toLowerCase()}.png`}
        alt={laude}
        width={150}
        height={150}
      />
      <p className="italic">{toLatin(laude)}</p>
    </motion.div>
  );
}
