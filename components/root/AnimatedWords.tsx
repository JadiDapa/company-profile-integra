"use client";

import { motion } from "motion/react";

import { staggerContainerVariants, wordVariants } from "@/lib/motion/variants";

const TAGS = {
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

interface AnimatedWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  once?: boolean;
  amount?: number;
  staggerChildren?: number;
  delay?: number;
  as?: keyof typeof TAGS;
}

export default function AnimatedWords({
  text,
  className,
  wordClassName,
  once = true,
  amount = 0.4,
  staggerChildren = 0.08,
  delay = 0,
  as = "span",
}: AnimatedWordsProps) {
  const MotionTag = TAGS[as];
  const words = text.split(" ");

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={staggerContainerVariants(staggerChildren, delay)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className={wordClassName ?? "inline-block"}
        >
          {word}
          {i !== words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}
