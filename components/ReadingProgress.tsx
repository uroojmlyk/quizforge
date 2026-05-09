// 'use client';

// import React, { useEffect, useState } from 'react';

// interface ReadingProgressProps {
//   showPercentage?: boolean;
//   showCircle?: boolean;
//   barHeight?: 'thin' | 'medium' | 'thick';
//   position?: 'top' | 'bottom';
// }

// const ReadingProgress: React.FC<ReadingProgressProps> = ({
//   showPercentage = true,
//   showCircle = true,
//   barHeight = 'thin',
//   position = 'top'
// }) => {
//   const [progress, setProgress] = useState<number>(0);

//   useEffect(() => {
//     const updateProgress = (): void => {
//       const windowHeight = window.innerHeight;
//       const documentHeight = document.documentElement.scrollHeight;
//       const scrollTop = window.scrollY;
      
//       const scrollPercent: number = (scrollTop / (documentHeight - windowHeight)) * 100;
//       setProgress(Math.min(Math.max(scrollPercent, 0), 100));
//     };

//     // Add scroll event listener
//     window.addEventListener('scroll', updateProgress);
//     window.addEventListener('resize', updateProgress);
    
//     // Initial calculation
//     updateProgress();

//     // Cleanup
//     return () => {
//       window.removeEventListener('scroll', updateProgress);
//       window.removeEventListener('resize', updateProgress);
//     };
//   }, []);

//   // Bar height classes
//   const barHeightClass = {
//     thin: 'h-1',
//     medium: 'h-1.5',
//     thick: 'h-2'
//   }[barHeight];

//   // Position classes
//   const positionClass = {
//     top: 'top-0',
//     bottom: 'bottom-0'
//   }[position];

//   // Don't show if page is not scrollable
//   if (progress === 0 && document.documentElement.scrollHeight <= window.innerHeight) {
//     return null;
//   }

//   return (
//     <>
//       {/* Progress Bar */}
//       <div className={`fixed ${positionClass} left-0 z-50 w-full ${barHeightClass} bg-gray-200`}>
//         <div
//           className="h-full bg-gradient-to-r from-[#FFD966] via-[#FFB5B5] to-[#A0E7E5] transition-all duration-300 ease-out"
//           style={{ width: `${progress}%` }}
//         />
//       </div>

//       {/* Percentage Circle */}
//       {showCircle && progress > 0 && progress < 100 && (
//         <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
//           <div className="relative w-10 h-10 md:w-12 md:h-12">
//             <svg className="w-full h-full transform -rotate-90">
//               <defs>
//                 <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                   <stop offset="0%" stopColor="#FFD966" />
//                   <stop offset="50%" stopColor="#FFB5B5" />
//                   <stop offset="100%" stopColor="#A0E7E5" />
//                 </linearGradient>
//               </defs>
//               <circle
//                 cx="50%"
//                 cy="50%"
//                 r="45%"
//                 fill="none"
//                 stroke="#e5e7eb"
//                 strokeWidth="4"
//               />
//               <circle
//                 cx="50%"
//                 cy="50%"
//                 r="45%"
//                 fill="none"
//                 stroke="url(#progressGradient)"
//                 strokeWidth="4"
//                 strokeDasharray={`${2 * Math.PI * 45}`}
//                 strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
//                 className="transition-all duration-300 ease-out"
//               />
//             </svg>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className="text-xs font-bold md:text-sm text-gray-700">
//                 {Math.round(progress)}%
//               </span>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Progress Number (Top Right) */}
//       {showPercentage && progress > 0 && (
//         <div className="fixed top-4 right-4 z-50 hidden md:block">
//           <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-gray-200">
//             <span className="text-sm font-semibold bg-gradient-to-r from-[#FFD966] to-[#FFB5B5] bg-clip-text text-transparent">
//               {Math.round(progress)}% read
//             </span>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ReadingProgress;












// components/ReadingProgress.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface ReadingProgressProps {
  showPercentage?: boolean;
  showCircle?: boolean;
  barHeight?: 'thin' | 'medium' | 'thick';
  position?: 'top' | 'bottom';
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({
  showPercentage = true,
  showCircle = true,
  barHeight = 'thin',
  position = 'top'
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [isScrollable, setIsScrollable] = useState<boolean>(true);

  useEffect(() => {
    // Check if page is scrollable
    const checkScrollable = () => {
      const isScrollableContent = document.documentElement.scrollHeight > window.innerHeight;
      setIsScrollable(isScrollableContent);
    };

    const updateProgress = (): void => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const scrollPercent: number = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(Math.min(Math.max(scrollPercent, 0), 100));
    };

    // Add scroll event listener
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    window.addEventListener('resize', checkScrollable);
    
    // Initial calculations
    checkScrollable();
    updateProgress();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      window.removeEventListener('resize', checkScrollable);
    };
  }, []);

  // Don't show if page is not scrollable
  if (!isScrollable) {
    return null;
  }

  // Bar height classes
  const barHeightClass = {
    thin: 'h-0.5',
    medium: 'h-1',
    thick: 'h-1.5'
  }[barHeight];

  // Position classes
  const positionClass = {
    top: 'top-0',
    bottom: 'bottom-0'
  }[position];

  return (
    <>
      {/* Progress Bar */}
      <div className={`fixed ${positionClass} left-0 z-50 w-full ${barHeightClass} bg-white/10`}>
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage Circle */}
      {showCircle && progress > 0 && progress < 100 && (
        <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="4"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="#34d399"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-300 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold md:text-sm text-white/80">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Progress Number (Top Right) */}
      {showPercentage && progress > 0 && (
        <div className="fixed top-4 right-4 z-50 hidden md:block">
          <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
            <span className="text-sm font-semibold text-emerald-400">
              {Math.round(progress)}% read
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ReadingProgress;