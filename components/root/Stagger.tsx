"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

import {
  FadeDirection,
  fadeVariants,
  staggerContainerVariants,
} from "@/lib/motion/variants";

const CONTAINER_TAGS = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
} as const;

interface StaggerProps {
  children: ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  as?: keyof typeof CONTAINER_TAGS;
  id?: string;
}

export function Stagger({
  children,
  staggerChildren = 0.12,
  delayChildren = 0,
  once = true,
  amount = 0.2,
  className,
  as = "div",
  id,
}: StaggerProps) {
  const MotionTag = CONTAINER_TAGS[as];

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -120px 0px" }}
      variants={staggerContainerVariants(staggerChildren, delayChildren)}
    >
      {children}
    </MotionTag>
  );
}

const ITEM_TAGS = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
} as const;

interface StaggerItemProps {
  children: ReactNode;
  direction?: FadeDirection;
  duration?: number;
  className?: string;
  as?: keyof typeof ITEM_TAGS;
}

export function StaggerItem({
  children,
  direction = "up",
  duration = 0.45,
  className,
  as = "div",
}: StaggerItemProps) {
  const MotionTag = ITEM_TAGS[as];

  return (
    <MotionTag
      className={className}
      variants={fadeVariants(direction, duration)}
    >
      {children}
    </MotionTag>
  );
}
