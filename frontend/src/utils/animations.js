// // Animation and Motion Utilities for AI Analytics Platform
// // Using Framer Motion for premium interactions

// import { useAnimation } from 'framer-motion';
// import { useEffect } from 'react';

// // ============================================================================
// // EASING FUNCTIONS (CSS-in-JS)
// // ============================================================================

// export const easing = {
//   // Subtle, quick feedback
//   fast: [0.4, 0, 0.2, 1],
//   // Natural, smooth motion
//   smooth: [0.34, 1.56, 0.64, 1],
//   // Snappy, energetic
//   snappy: [0.16, 1, 0.3, 1],
//   // Gentle entrance
//   soft: [0.17, 0.67, 0.83, 0.67],
//   // Linear for continuous rotation
//   linear: [0, 0, 1, 1],
// };

// // ============================================================================
// // ANIMATION VARIANTS
// // ============================================================================

// export const animations = {
//   // BUTTON ANIMATIONS
//   button: {
//     rest: { scale: 1, y: 0 },
//     hover: { 
//       scale: 1.02, 
//       y: -2,
//       transition: { 
//         duration: 0.2,
//         ease: easing.smooth 
//       }
//     },
//     tap: { 
//       scale: 0.98,
//       transition: { 
//         duration: 0.1,
//         ease: easing.fast 
//       }
//     },
//   },

//   // BUTTON LOADING STATE
//   buttonLoading: {
//     initial: { width: 'auto' },
//     loading: { width: '100%' },
//   },

//   spinner: {
//     rotate: [0, 360],
//     transition: {
//       duration: 1,
//       repeat: Infinity,
//       ease: 'linear',
//     },
//   },

//   // INPUT FOCUS
//   inputFocus: {
//     rest: { 
//       borderColor: 'rgba(226, 232, 240, 1)',
//       boxShadow: 'none'
//     },
//     focus: { 
//       borderColor: '#3B82F6',
//       boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
//       transition: { 
//         duration: 0.25,
//         ease: easing.fast 
//       }
//     },
//   },

//   // CARD HOVER
//   card: {
//     rest: { 
//       y: 0,
//       boxShadow: '0 4px 12px rgba(15, 22, 32, 0.08)'
//     },
//     hover: { 
//       y: -4,
//       boxShadow: '0 12px 32px rgba(15, 22, 32, 0.12)',
//       transition: { 
//         duration: 0.3,
//         ease: easing.smooth 
//       }
//     },
//   },

//   // FADE IN + SLIDE UP
//   slideUp: {
//     initial: { 
//       opacity: 0, 
//       y: 20 
//     },
//     animate: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.4,
//         ease: easing.smooth 
//       }
//     },
//     exit: { 
//       opacity: 0, 
//       y: 20,
//       transition: { 
//         duration: 0.3,
//         ease: easing.fast 
//       }
//     },
//   },

//   // FADE IN + SLIDE DOWN
//   slideDown: {
//     initial: { 
//       opacity: 0, 
//       y: -20 
//     },
//     animate: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.4,
//         ease: easing.smooth 
//       }
//     },
//   },

//   // FADE IN + SLIDE LEFT
//   slideLeft: {
//     initial: { 
//       opacity: 0, 
//       x: -20 
//     },
//     animate: { 
//       opacity: 1, 
//       x: 0,
//       transition: { 
//         duration: 0.4,
//         ease: easing.smooth 
//       }
//     },
//   },

//   // FADE IN + SLIDE RIGHT
//   slideRight: {
//     initial: { 
//       opacity: 0, 
//       x: 20 
//     },
//     animate: { 
//       opacity: 1, 
//       x: 0,
//       transition: { 
//         duration: 0.4,
//         ease: easing.smooth 
//       }
//     },
//   },

//   // SCALE BOUNCE
//   scaleBounce: {
//     initial: { 
//       scale: 0.9,
//       opacity: 0 
//     },
//     animate: { 
//       scale: 1,
//       opacity: 1,
//       transition: { 
//         duration: 0.5,
//         ease: easing.smooth 
//       }
//     },
//   },

//   // FADE
//   fade: {
//     initial: { opacity: 0 },
//     animate: { 
//       opacity: 1,
//       transition: { 
//         duration: 0.3,
//         ease: easing.fast 
//       }
//     },
//     exit: { 
//       opacity: 0,
//       transition: { 
//         duration: 0.2,
//         ease: easing.fast 
//       }
//     },
//   },

//   // MODAL ENTRANCE
//   modal: {
//     backdrop: {
//       initial: { opacity: 0 },
//       animate: { 
//         opacity: 1,
//         transition: { 
//           duration: 0.3,
//           ease: easing.fast 
//         }
//       },
//       exit: { 
//         opacity: 0,
//         transition: { 
//           duration: 0.2,
//           ease: easing.fast 
//         }
//       },
//     },
//     dialog: {
//       initial: { 
//         scale: 0.95,
//         opacity: 0,
//         y: 20
//       },
//       animate: { 
//         scale: 1,
//         opacity: 1,
//         y: 0,
//         transition: { 
//           duration: 0.3,
//           ease: easing.smooth 
//         }
//       },
//       exit: { 
//         scale: 0.95,
//         opacity: 0,
//         y: 20,
//         transition: { 
//           duration: 0.2,
//           ease: easing.fast 
//         }
//       },
//     },
//   },

//   // TOAST NOTIFICATION
//   toast: {
//     initial: { 
//       opacity: 0, 
//       x: 400,
//       y: 100
//     },
//     animate: { 
//       opacity: 1, 
//       x: 0,
//       y: 0,
//       transition: { 
//         duration: 0.3,
//         ease: easing.smooth 
//       }
//     },
//     exit: { 
//       opacity: 0, 
//       x: 400,
//       y: 100,
//       transition: { 
//         duration: 0.3,
//         ease: easing.fast 
//       }
//     },
//   },

//   // MESSAGE BUBBLE (CHAT)
//   messageBubble: {
//     initial: { 
//       opacity: 0, 
//       scale: 0.95,
//       y: 10
//     },
//     animate: { 
//       opacity: 1, 
//       scale: 1,
//       y: 0,
//       transition: { 
//         duration: 0.3,
//         ease: easing.smooth 
//       }
//     },
//   },

//   // STAGGER CONTAINER (for lists)
//   staggerContainer: {
//     initial: { opacity: 0 },
//     animate: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   },

//   staggerItem: {
//     initial: { 
//       opacity: 0, 
//       y: 10 
//     },
//     animate: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.3,
//         ease: easing.smooth 
//       }
//     },
//   },

//   // SUCCESS STATE ANIMATION
//   successPulse: {
//     animate: {
//       scale: [1, 1.1, 1],
//       transition: {
//         duration: 0.4,
//         ease: easing.smooth,
//       }
//     }
//   },

//   // SIDEBAR ACTIVE STATE
//   sidebarActive: {
//     rest: { 
//       x: 0,
//       backgroundColor: 'rgba(59, 130, 246, 0)'
//     },
//     active: { 
//       x: 0,
//       backgroundColor: 'rgba(59, 130, 246, 0.08)',
//       transition: { 
//         duration: 0.2,
//         ease: easing.fast 
//       }
//     },
//   },

//   // HOVER LIFT
//   hoverLift: {
//     rest: { y: 0 },
//     hover: { 
//       y: -4,
//       transition: { 
//         duration: 0.2,
//         ease: easing.smooth 
//       }
//     },
//   },

//   // ICON SCALE
//   iconScale: {
//     rest: { scale: 1 },
//     hover: { 
//       scale: 1.1,
//       transition: { 
//         duration: 0.2,
//         ease: easing.smooth 
//       }
//     },
//   },

//   // CHART BAR ANIMATION
//   chartBar: {
//     initial: { 
//       height: 0,
//       opacity: 0
//     },
//     animate: (i) => ({
//       height: '100%',
//       opacity: 1,
//       transition: {
//         delay: i * 0.1,
//         duration: 0.6,
//         ease: easing.smooth,
//       }
//     }),
//   },

//   // PAGE TRANSITION
//   pageTransition: {
//     initial: { 
//       opacity: 0,
//       y: 20
//     },
//     animate: { 
//       opacity: 1,
//       y: 0,
//       transition: { 
//         duration: 0.4,
//         ease: easing.smooth 
//       }
//     },
//     exit: { 
//       opacity: 0,
//       y: -20,
//       transition: { 
//         duration: 0.3,
//         ease: easing.fast 
//       }
//     },
//   },
// };

// // ============================================================================
// // CUSTOM HOOKS FOR ANIMATIONS
// // ============================================================================

// /**
//  * Hook to respect user's motion preferences
//  */
// export function useReducedMotion() {
//   const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
//     setPrefersReducedMotion(mediaQuery.matches);

//     const handleChange = (e) => setPrefersReducedMotion(e.matches);
//     mediaQuery.addEventListener('change', handleChange);

//     return () => mediaQuery.removeEventListener('change', handleChange);
//   }, []);

//   return prefersReducedMotion;
// }

// /**
//  * Hook for typing effect in chat messages
//  */
// export function useTypewriter(text, speed = 50) {
//   const [displayedText, setDisplayedText] = React.useState('');

//   useEffect(() => {
//     if (!text) {
//       setDisplayedText('');
//       return;
//     }

//     let index = 0;
//     const interval = setInterval(() => {
//       if (index < text.length) {
//         setDisplayedText(text.slice(0, index + 1));
//         index++;
//       } else {
//         clearInterval(interval);
//       }
//     }, speed);

//     return () => clearInterval(interval);
//   }, [text, speed]);

//   return displayedText;
// }

// /**
//  * Hook for success animation sequence
//  */
// export function useSuccessAnimation() {
//   const controls = useAnimation();

//   const trigger = async () => {
//     await controls.start({
//       scale: [1, 1.1, 1],
//       transition: { duration: 0.4, ease: easing.smooth }
//     });
//   };

//   return { controls, trigger };
// }

// /**
//  * Hook for scroll-triggered animations
//  */
// export function useScrollAnimation(ref, options = {}) {
//   const controls = useAnimation();
//   const isInView = React.useRef(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !isInView.current) {
//         isInView.current = true;
//         controls.start('animate');
//       }
//     }, {
//       threshold: 0.1,
//       ...options
//     });

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => observer.disconnect();
//   }, [controls, options]);

//   return controls;
// }

// // ============================================================================
// // TRANSITION PRESETS
// // ============================================================================

// export const transitions = {
//   // Standard transition
//   default: {
//     duration: 0.3,
//     ease: easing.smooth,
//   },
//   // Fast feedback
//   fast: {
//     duration: 0.2,
//     ease: easing.fast,
//   },
//   // Slower, more elegant
//   slow: {
//     duration: 0.5,
//     ease: easing.smooth,
//   },
//   // Very quick (micro-interactions)
//   snap: {
//     duration: 0.15,
//     ease: easing.fast,
//   },
//   // For exit animations
//   exit: {
//     duration: 0.2,
//     ease: easing.fast,
//   },
// };

// // ============================================================================
// // PRESET COMBINATIONS
// // ============================================================================

// export const presets = {
//   // Button interaction
//   button: (isHover) => ({
//     scale: isHover ? 1.02 : 1,
//     y: isHover ? -2 : 0,
//     boxShadow: isHover 
//       ? '0 12px 32px rgba(59, 130, 246, 0.3)'
//       : '0 4px 12px rgba(59, 130, 246, 0.1)',
//     transition: transitions.default,
//   }),

//   // Card interaction
//   card: (isHover) => ({
//     y: isHover ? -4 : 0,
//     boxShadow: isHover
//       ? '0 12px 32px rgba(15, 22, 32, 0.12)'
//       : '0 4px 12px rgba(15, 22, 32, 0.08)',
//     transition: transitions.default,
//   }),

//   // Link interaction
//   link: (isHover) => ({
//     color: isHover ? '#3B82F6' : 'inherit',
//     textDecoration: isHover ? 'underline' : 'none',
//     transition: transitions.fast,
//   }),
// };
