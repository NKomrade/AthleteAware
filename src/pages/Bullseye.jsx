// // Bullseye.jsx
// import React, { useRef, useState } from "react";
// import { TweenMax, Elastic, Back, Linear } from "gsap";
// import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// // Make sure you load the GSAP plugin if it's not included already
// gsap.registerPlugin(MorphSVGPlugin);

// const Bullseye = () => {
//   const svgRef = useRef(null);
//   const arrowAngleRef = useRef(null);
//   const arrowUseRef = useRef(null);
//   const [isArrowVisible, setArrowVisible] = useState(false);
//   const [randomAngle, setRandomAngle] = useState(0);

//   // Target coordinates
//   const target = { x: 900, y: 249.5 };
//   const lineSegment = { x1: 875, y1: 280, x2: 925, y2: 220 };

//   // Pivot (center) of the bow
//   const pivot = { x: 100, y: 250 };

//   const aim = (e) => {
//     const point = getMouseSVG(e);
//     const dx = point.x - pivot.x;
//     const dy = point.y - pivot.y;
//     const angle = Math.atan2(dy, dx) + randomAngle;
//     const bowAngle = angle - Math.PI;
//     const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 50);
//     const scale = Math.min(Math.max(distance / 30, 1), 2);

//     // Animate bow
//     TweenMax.to("#bow", 0.3, {
//       scaleX: scale,
//       rotation: bowAngle + "rad",
//       transformOrigin: "right center",
//     });

//     const arrowX = Math.min(pivot.x - (1 / scale) * distance, 88);

//     TweenMax.to(arrowAngleRef.current, 0.3, {
//       rotation: bowAngle + "rad",
//       svgOrigin: "100 250",
//     });
//     TweenMax.to(arrowUseRef.current, 0.3, {
//       x: -distance,
//     });

//     TweenMax.to("#bow polyline", 0.3, {
//       attr: {
//         points: `88,200 ${Math.min(
//           pivot.x - (1 / scale) * distance,
//           88
//         )},250 88,300`,
//       },
//     });

//     const radius = distance * 9;
//     const offset = { x: Math.cos(bowAngle) * radius, y: Math.sin(bowAngle) * radius };
//     const arcWidth = offset.x * 3;

//     TweenMax.to("#arc", 0.3, {
//       attr: {
//         d: `M100,250c${offset.x},${offset.y},${arcWidth - offset.x},${offset.y + 50},${arcWidth},50`,
//       },
//       autoAlpha: distance / 60,
//     });
//   };

//   const draw = (e) => {
//     setRandomAngle(Math.random() * Math.PI * 0.03 - 0.015);
//     setArrowVisible(true);

//     window.addEventListener("mousemove", aim);
//     window.addEventListener("mouseup", loose);

//     aim(e);
//   };

//   const loose = () => {
//     window.removeEventListener("mousemove", aim);
//     window.removeEventListener("mouseup", loose);

//     // Reset the bow animation after release
//     TweenMax.to("#bow", 0.4, {
//       scaleX: 1,
//       transformOrigin: "right center",
//       ease: Elastic.easeOut,
//     });

//     TweenMax.to("#bow polyline", 0.4, {
//       attr: {
//         points: "88,200 88,250 88,300",
//       },
//       ease: Elastic.easeOut,
//     });

//     // Create a new arrow and animate it
//     const newArrow = document.createElementNS("http://www.w3.org/2000/svg", "use");
//     newArrow.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#arrow");
//     svgRef.current.appendChild(newArrow);

//     const path = MorphSVGPlugin.pathDataToBezier("#arc");

//     TweenMax.to([newArrow], 0.5, {
//       force3D: true,
//       bezier: {
//         type: "cubic",
//         values: path,
//         autoRotate: ["x", "y", "rotation"],
//       },
//       onUpdate: hitTest,
//       onUpdateParams: ["{self}"],
//       onComplete: onMiss,
//       ease: Linear.easeNone,
//     });

//     TweenMax.to("#arc", 0.3, {
//       opacity: 0,
//     });

//     setArrowVisible(false);
//   };

//   const hitTest = (tween) => {
//     const arrow = tween.target[0];
//     const transform = arrow._gsTransform;
//     const radians = transform.rotation * Math.PI / 180;

//     const arrowSegment = {
//       x1: transform.x,
//       y1: transform.y,
//       x2: Math.cos(radians) * 60 + transform.x,
//       y2: Math.sin(radians) * 60 + transform.y,
//     };

//     const intersection = getIntersection(arrowSegment, lineSegment);

//     if (intersection.segment1 && intersection.segment2) {
//       tween.pause();

//       const dx = intersection.x - target.x;
//       const dy = intersection.y - target.y;
//       const distance = Math.sqrt(dx * dx + dy * dy);

//       let selector = ".hit";
//       if (distance < 7) {
//         selector = ".bullseye";
//       }

//       showMessage(selector);
//     }
//   };

//   const onMiss = () => {
//     showMessage(".miss");
//   };

//   const showMessage = (selector) => {
//     TweenMax.killTweensOf(selector);
//     TweenMax.killChildTweensOf(selector);
//     TweenMax.set(selector, {
//       autoAlpha: 1,
//     });
//     TweenMax.staggerFromTo(
//       `${selector} path`,
//       0.5,
//       { rotation: -5, scale: 0, transformOrigin: "center" },
//       { scale: 1, ease: Back.easeOut },
//       0.05
//     );
//     TweenMax.staggerTo(
//       `${selector} path`,
//       0.3,
//       { delay: 2, rotation: 20, scale: 0, ease: Back.easeIn },
//       0.03
//     );
//   };

//   const getMouseSVG = (e) => {
//     const cursor = svgRef.current.createSVGPoint();
//     cursor.x = e.clientX;
//     cursor.y = e.clientY;
//     return cursor.matrixTransform(svgRef.current.getScreenCTM().inverse());
//   };

//   const getIntersection = (segment1, segment2) => {
//     const dx1 = segment1.x2 - segment1.x1;
//     const dy1 = segment1.y2 - segment1.y1;
//     const dx2 = segment2.x2 - segment2.x1;
//     const dy2 = segment2.y2 - segment2.y1;
//     const cx = segment1.x1 - segment2.x1;
//     const cy = segment1.y1 - segment2.y1;
//     const denominator = dy2 * dx1 - dx2 * dy1;

//     if (denominator === 0) return null;

//     const ua = (dx2 * cy - dy2 * cx) / denominator;
//     const ub = (dx1 * cy - dy1 * cx) / denominator;

//     return {
//       x: segment1.x1 + ua * dx1,
//       y: segment1.y1 + ua * dy1,
//       segment1: ua >= 0 && ua <= 1,
//       segment2: ub >= 0 && ub <= 1,
//     };
//   };

//   return (
//     <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
//       <svg
//         ref={svgRef}
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 1000 400"
//         className="w-full h-full"
//       >
//         <defs>
//           <symbol id="arrow" viewBox="0 0 100 100">
//             <polygon points="50,10 60,20 50,30 40,20" fill="white" />
//           </symbol>
//         </defs>
//         <g id="arc">
//           <path stroke="white" fill="none" />
//         </g>
//         <g id="bow">
//           <path d="M100,250 Q120,240 140,250" stroke="white" fill="none" />
//         </g>
//         <g id="hit" className="hidden">
//           <path
//             d="M900,230 L920,230 L910,250 Z"
//             stroke="red"
//             fill="red"
//           />
//         </g>
//         <g id="bullseye" className="hidden">
//           <circle cx="900" cy="250" r="7" fill="gold" />
//         </g>
//       </svg>

//       <div
//         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
//         onMouseDown={draw}
//       >
//         <div className="cursor-pointer">Start Game</div>
//       </div>
//     </div>
//   );
// };

// export default Bullseye;
