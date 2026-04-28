/**
 * Animation utilities using anime.js
 * Centralized animation configuration and helpers
 */
import anime from 'anime';

/**
 * Smooth fade-in animation
 */
export const animateFadeIn = (element, options = {}) => {
  return anime({
    targets: element,
    opacity: [0, 1],
    duration: options.duration || 300,
    easing: options.easing || 'easeOutQuad',
  });
};

/**
 * Smooth fade-out animation
 */
export const animateFadeOut = (element, options = {}) => {
  return anime({
    targets: element,
    opacity: [1, 0],
    duration: options.duration || 300,
    easing: options.easing || 'easeOutQuad',
  });
};

/**
 * Slide down animation (for dropdowns, accordion)
 */
export const animateSlideDown = (element, options = {}) => {
  const maxHeight = element.scrollHeight;
  return anime({
    targets: element,
    height: [0, maxHeight],
    opacity: [0, 1],
    paddingTop: [0, 12],
    paddingBottom: [0, 12],
    marginTop: [0, 12],
    marginBottom: [0, 12],
    duration: options.duration || 400,
    easing: options.easing || 'easeOutQuart',
    complete: () => {
      element.style.height = 'auto';
    },
  });
};

/**
 * Slide up animation (for accordion collapse)
 */
export const animateSlideUp = (element, options = {}) => {
  return anime({
    targets: element,
    height: [element.scrollHeight, 0],
    opacity: [1, 0],
    paddingTop: [12, 0],
    paddingBottom: [12, 0],
    marginTop: [12, 0],
    marginBottom: [12, 0],
    duration: options.duration || 400,
    easing: options.easing || 'easeOutQuart',
  });
};

/**
 * Scale bounce animation (for modals, cards)
 */
export const animateScaleBounce = (element, options = {}) => {
  return anime({
    targets: element,
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: options.duration || 500,
    easing: options.easing || 'easeOutElastic(1, 0.6)',
  });
};

/**
 * Slide in from left animation
 */
export const animateSlideInLeft = (element, options = {}) => {
  return anime({
    targets: element,
    translateX: [-30, 0],
    opacity: [0, 1],
    duration: options.duration || 400,
    easing: options.easing || 'easeOutQuad',
  });
};

/**
 * Slide in from right animation
 */
export const animateSlideInRight = (element, options = {}) => {
  return anime({
    targets: element,
    translateX: [30, 0],
    opacity: [0, 1],
    duration: options.duration || 400,
    easing: options.easing || 'easeOutQuad',
  });
};

/**
 * Shake animation (for errors, alerts)
 */
export const animateShake = (element, options = {}) => {
  return anime({
    targets: element,
    translateX: [0, -10, 10, -10, 10, 0],
    duration: options.duration || 400,
    easing: options.easing || 'easeInOutQuad',
  });
};

/**
 * Pulse animation (for alerts, notifications)
 */
export const animatePulse = (element, options = {}) => {
  return anime({
    targets: element,
    scale: [1, 1.05, 1],
    duration: options.duration || 600,
    easing: options.easing || 'easeInOutQuad',
    loop: options.loop ?? true,
  });
};

/**
 * Rotate animation
 */
export const animateRotate = (element, options = {}) => {
  return anime({
    targets: element,
    rotate: options.rotate || 360,
    duration: options.duration || 600,
    easing: options.easing || 'easeInOutQuad',
  });
};

/**
 * Color transition animation
 */
export const animateColor = (element, fromColor, toColor, options = {}) => {
  return anime({
    targets: element,
    backgroundColor: [fromColor, toColor],
    duration: options.duration || 400,
    easing: options.easing || 'easeInOutQuad',
  });
};

/**
 * Number counter animation
 */
export const animateCounter = (element, targetValue, options = {}) => {
  const obj = { value: 0 };
  return anime({
    targets: obj,
    value: targetValue,
    duration: options.duration || 800,
    easing: options.easing || 'easeOutQuad',
    update: () => {
      element.textContent = Math.round(obj.value);
    },
  });
};

/**
 * Stagger multiple elements
 */
export const animateStagger = (elements, animation, options = {}) => {
  return anime.timeline().add({
    targets: elements,
    duration: options.duration || 400,
    easing: options.easing || 'easeOutQuad',
    delay: anime.stagger(options.staggerDelay || 50),
    ...animation,
  });
};

/**
 * Custom animation for expanding/collapsing content
 */
export const toggleExpandContent = (element, isExpanding, options = {}) => {
  if (isExpanding) {
    return animateSlideDown(element, options);
  } else {
    return animateSlideUp(element, options);
  }
};

export default {
  animateFadeIn,
  animateFadeOut,
  animateSlideDown,
  animateSlideUp,
  animateScaleBounce,
  animateSlideInLeft,
  animateSlideInRight,
  animateShake,
  animatePulse,
  animateRotate,
  animateColor,
  animateCounter,
  animateStagger,
  toggleExpandContent,
};
