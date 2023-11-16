/*

Built this while following Jonas Schedtmann's course

*/

// import React, { useState } from 'react';

// const containerStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   gap: '16px',
// };

// const starContainerStyle = {
//   display: 'flex',
//   gap: '4px',
// };

// // set default value for ratings
// const StarRating = ({
//   maxRating = 5,
//   color = '#fcc419',
//   size = 48,
//   className = '', // reusability: can choose to add their own custom style to it
//   messages = [], // reusability: can choose to display text instead of numbers if they pass through an array of len = no. stars
//   defaultRating = 0,
//   onSetRating = () => {},
// }) => {
//   const [rating, setRating] = useState(defaultRating);
//   const [hoverRating, setHoverRating] = useState(0);

//   function handleRating(rating) {
//     setRating(rating);
//     onSetRating(rating);
//   }

//   const textStyle = {
//     lineHeight: '1',
//     margin: '0',
//     color: color,
//     fontSize: `${size / 1.5}px`,
//   };

//   return (
//     <div style={containerStyle} className={className}>
//       <div style={starContainerStyle}>
//         {/* generate n Star components*/}
//         {Array.from({ length: maxRating }, (_, i) => (
//           <Star
//             key={i}
//             onRate={() => handleRating(i + 1)}
//             full={hoverRating ? hoverRating >= i + 1 : rating >= i + 1}
//             onHoverIn={() => setHoverRating(i + 1)}
//             onHoverOut={() => setHoverRating(0)}
//             size={size}
//             color={color}
//           />
//         ))}
//       </div>
//       {/*If message array of valid length passed in (eq to no. stars), use messages instead of numbers  */}
//       <p style={textStyle}>
//         {messages.length === maxRating
//           ? messages[hoverRating - 1] || messages[rating - 1]
//           : hoverRating || rating || ''}
//       </p>
//     </div>
//   );
// };

// const Star = ({ onRate, full, onHoverIn, onHoverOut, size, color }) => {
//   const starStyle = {
//     width: `${size}px`,
//     height: `${size}px`,
//     display: 'block',
//     cursor: 'pointer',
//   };
//   return (
//     <span
//       role="button"
//       style={starStyle}
//       onClick={onRate}
//       onMouseEnter={onHoverIn}
//       onMouseLeave={onHoverOut}
//     >
//       {full ? (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill={color}
//           stroke={color}
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke={color}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="{2}"
//             d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//           />
//         </svg>
//       )}
//     </span>
//   );
// };

// export default StarRating;
