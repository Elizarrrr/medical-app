"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TransitionalText({
  TEXTS,
  className
}: {
  TEXTS: string[];
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => (index + 1) % TEXTS.length),
      3000
    );
    return () => clearInterval(intervalId);
  }, [TEXTS.length]);

  return (
    <span className={`inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={TEXTS[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className="inline-block"
        >
          {TEXTS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}