/**
 * Animation utilities using Framer Motion
 * Centralized animation configuration and helpers
 */

/**
 * Smooth fade-in animation
 */
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

/**
 * Smooth fade-out animation
 */
export const fadeOutVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0, transition: { duration: 0.3 } },
};

/**
 * Slide down animation (for dropdowns, accordion)
 */
export const slideDownVariants = {
  hidden: { height: 0, opacity: 0, marginTop: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    marginTop: 12,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

/**
 * Slide up animation (for accordion collapse)
 */
export const slideUpVariants = {
  visible: { height: 'auto', opacity: 1, marginTop: 12 },
  hidden: {
    height: 0,
    opacity: 0,
    marginTop: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

/**
 * Scale bounce animation (for modals, cards)
 */
export const scaleBounceVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      duration: 0.5,
    },
  },
};

/**
 * Slide in from left animation
 */
export const slideInLeftVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4 } },
};

/**
 * Slide in from right animation
 */
export const slideInRightVariants = {
  hidden: { x: 30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4 } },
};

/**
 * Pulse animation (for alerts, notifications)
 */
export const pulseVariants = {
  hidden: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

/**
 * Stagger container for multiple elements
 */
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

/**
 * Stagger item
 */
export const staggerItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

/**
 * Bounce animation
 */
export const bounceVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

export default {
  fadeInVariants,
  fadeOutVariants,
  slideDownVariants,
  slideUpVariants,
  scaleBounceVariants,
  slideInLeftVariants,
  slideInRightVariants,
  pulseVariants,
  staggerContainerVariants,
  staggerItemVariants,
  bounceVariants,
};
