"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

import { FadeDirection, fadeVariants } from "@/lib/motion/variants";

const TAGS = {
  div: motion.div,
  section: motion.section,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
  ul: motion.ul,
  li: motion.li,
} as const;

interface FadeInProps {
  children: ReactNode;
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  as?: keyof typeof TAGS;
  id?: string;
}

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.45,
  once = true,
  amount = 0.2,
  className,
  as = "div",
  id,
}: FadeInProps) {
  const MotionTag = TAGS[as];

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -120px 0px" }}
      variants={fadeVariants(direction, duration, delay)}
    >
      {children}
    </MotionTag>
  );
}
