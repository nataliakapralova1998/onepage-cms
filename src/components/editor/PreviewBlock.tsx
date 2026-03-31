"use client";

import { motion } from "framer-motion";

type PreviewBlockProps = {
  index: number;
  children: React.ReactNode;
};

export default function PreviewBlock({ index, children }: PreviewBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}