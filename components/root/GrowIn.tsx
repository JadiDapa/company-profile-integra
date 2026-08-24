"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

import { growVariants } from "@/lib/motion/variants";

const TAGS = {
  div: motion.div,
  section: motion.section,
  span: motion.span,
  ul: motion.ul,
  li: motion.li,
} as const;

interface GrowInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  scale?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  as?: keyof typeof TAGS;
  id?: string;
}

export default function GrowIn({
  children,
  delay = 0,
  duration = 0.5,
  scale = 0.85,
  once = true,
  amount = 0.2,
  className,
  as = "div",
  id,
}: GrowInProps) {
  const MotionTag = TAGS[as];

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -120px 0px" }}
      variants={growVariants(duration, delay, scale)}
    >
      {children}
    </MotionTag>
  );
}
