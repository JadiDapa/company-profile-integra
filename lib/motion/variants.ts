import { stagger, Variants } from "motion/react";

export type FadeDirection = "up" | "down" | "left" | "right" | "none";

const OFFSET = 32;

function getOffset(direction: FadeDirection) {
  switch (direction) {
    case "up":
      return { y: OFFSET };
    case "down":
      return { y: -OFFSET };
    case "left":
      return { x: OFFSET };
    case "right":
      return { x: -OFFSET };
    default:
      return {};
  }
}

export function fadeVariants(
  direction: FadeDirection = "up",
  duration = 0.45,
  delay?: number,
): Variants {
  return {
    hidden: { opacity: 0, ...getOffset(direction) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      // `delay` is only included when explicitly provided: setting it (even
      // to 0) on a child inside a staggered parent overrides the parent's
      // orchestrated per-child delay instead of composing with it.
      transition: { duration, ease: "easeOut", ...(delay !== undefined && { delay }) },
    },
  };
}

export function growVariants(
  duration = 0.5,
  delay = 0,
  scale = 0.85,
): Variants {
  return {
    hidden: { opacity: 0, scale },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration, delay, ease: "easeOut" },
    },
  };
}

export function staggerContainerVariants(
  staggerChildren = 0.12,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        delayChildren: stagger(staggerChildren, { startDelay: delayChildren }),
      },
    },
  };
}

export const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
