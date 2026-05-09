// // components/BlogTOC.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { Menu, X } from 'lucide-react';

// interface Heading {
//   id: string;
//   text: string;
//   level: number;
// }

// function generateSlug(text: string): string {
//   return text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/^-|-$/g, '');
// }

// export function BlogTOC({ content }: { content: string }) {
//   const [headings, setHeadings] = useState<Heading[]>([]);
//   const [activeId, setActiveId] = useState<string>('');
//   const [isMobileOpen, setIsMobileOpen] = useState(false);

//   useEffect(() => {
//     // Extract headings from content
//     const headingRegex = /^(#{2,3})\s+(.*)$/gm;
//     const matches = [...content.matchAll(headingRegex)];
    
//     const extractedHeadings = matches.map((match) => {
//       const text = match[2];
//       const level = match[1].length;
//       return {
//         id: generateSlug(text),
//         text,
//         level: level === 2 ? 2 : 3,
//       };
//     });
    
//     setHeadings(extractedHeadings);

//     // ✅ ONLY observer - NO setTimeout for setting IDs
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveId(entry.target.id);
//           }
//         });
//       },
//       { rootMargin: '0px 0px -70% 0px', threshold: 0.1 }
//     );

//     // Observe headings that already have IDs (set by MDX components)
//     const elements = document.querySelectorAll('h2[id], h3[id]');
//     elements.forEach((el) => observer.observe(el));

//     return () => observer.disconnect();
//   }, [content]);

//   if (headings.length === 0) return null;

//   return (
//     <>
//       {/* Mobile TOC Button */}
//       <div className="lg:hidden fixed bottom-6 right-6 z-40">
//         <button
//           onClick={() => setIsMobileOpen(!isMobileOpen)}
//           className="p-3 rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 transition"
//         >
//           {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//         </button>
//       </div>

//       {/* Mobile TOC Dropdown */}
//       {isMobileOpen && (
//         <div className="lg:hidden fixed inset-x-4 bottom-20 z-30 bg-[#0f1019] border border-white/10 rounded-xl p-4 max-h-96 overflow-y-auto shadow-2xl">
//           <h4 className="text-white font-semibold text-sm mb-3">Table of Contents</h4>
//           <ul className="space-y-2">
//             {headings.map((heading) => (
//               <li key={heading.id}>
//                 <a
//                   href={`#${heading.id}`}
//                   className={`text-sm block transition-colors ${
//                     activeId === heading.id
//                       ? 'text-emerald-400'
//                       : 'text-white/40 hover:text-white/60'
//                   } ${heading.level === 2 ? 'pl-0' : 'pl-4'}`}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     document.getElementById(heading.id)?.scrollIntoView({
//                       behavior: 'smooth',
//                     });
//                     setIsMobileOpen(false);
//                   }}
//                 >
//                   {heading.text}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Desktop TOC */}
//       <div className="hidden lg:block sticky top-32 w-64 flex-shrink-0">
//         <div className="bg-white/5 rounded-xl p-4 border border-white/10">
//           <h4 className="text-white font-semibold text-sm mb-3">Table of Contents</h4>
//           <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
//             {headings.map((heading) => (
//               <li key={heading.id}>
//                 <a
//                   href={`#${heading.id}`}
//                   className={`text-sm block transition-colors ${
//                     activeId === heading.id
//                       ? 'text-emerald-400'
//                       : 'text-white/40 hover:text-white/60'
//                   } ${heading.level === 2 ? 'pl-0' : 'pl-4'}`}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     document.getElementById(heading.id)?.scrollIntoView({
//                       behavior: 'smooth',
//                     });
//                   }}
//                 >
//                   {heading.text}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }














// // components/BlogTOC.tsx
// 'use client';

// import { useEffect, useState, useCallback, useRef } from 'react';
// import { Menu, X, ChevronRight } from 'lucide-react';

// interface Heading {
//   id: string;
//   text: string;
//   level: number;
// }

// // ✅ DOM-based heading extraction - no regex, no mismatch
// function extractHeadingsFromDOM(): Heading[] {
//   const elements = Array.from(document.querySelectorAll('h2[id], h3[id]'));
  
//   return elements.map((el) => ({
//     id: el.id,
//     text: el.textContent || '',
//     level: el.tagName === 'H2' ? 2 : 3,
//   }));
// }

// export function BlogTOC({ content }: { content: string }) {
//   const [headings, setHeadings] = useState<Heading[]>([]);
//   const [activeId, setActiveId] = useState<string>('');
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const isUpdatingRef = useRef(false);

//   // ✅ Extract headings from DOM after render
//   useEffect(() => {
//     // Small delay to ensure DOM is fully rendered
//     const timer = setTimeout(() => {
//       const extracted = extractHeadingsFromDOM();
//       setHeadings(extracted);
//     }, 100);
    
//     return () => clearTimeout(timer);
//   }, [content]);

//   // ✅ Improved IntersectionObserver with "last visible" logic
//   useEffect(() => {
//     if (headings.length === 0) return;

//     // Cleanup previous observer
//     if (observerRef.current) {
//       observerRef.current.disconnect();
//     }

//     let currentActive = '';
//     let timeoutId: NodeJS.Timeout;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         // Use requestAnimationFrame to avoid render blocking
//         requestAnimationFrame(() => {
//           entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//               currentActive = entry.target.id;
//             }
//           });

//           if (currentActive && !isUpdatingRef.current) {
//             isUpdatingRef.current = true;
//             setActiveId(currentActive);
//             // Debounce to prevent flicker
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => {
//               isUpdatingRef.current = false;
//             }, 50);
//           }
//         });
//       },
//       {
//         rootMargin: '0px 0px -65% 0px',
//         threshold: [0, 0.25, 0.5, 0.75, 1],
//       }
//     );

//     // Observe all heading elements
//     headings.forEach((heading) => {
//       const element = document.getElementById(heading.id);
//       if (element) observer.observe(element);
//     });

//     observerRef.current = observer;

//     return () => {
//       observer.disconnect();
//       clearTimeout(timeoutId);
//     };
//   }, [headings]);

//   // ✅ Smooth scroll with offset for fixed navbar
//   const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
//     e.preventDefault();
//     setIsMobileOpen(false);
    
//     const element = document.getElementById(id);
//     if (element) {
//       const navbarHeight = 80;
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.scrollY - navbarHeight;
      
//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth',
//       });
      
//       // Update URL hash without jumping
//       window.history.pushState(null, '', `#${id}`);
//       setActiveId(id);
//     }
//   }, []);

//   // ✅ Close mobile menu on escape key
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === 'Escape' && isMobileOpen) {
//         setIsMobileOpen(false);
//       }
//     };
//     window.addEventListener('keydown', handleEscape);
//     return () => window.removeEventListener('keydown', handleEscape);
//   }, [isMobileOpen]);

//   if (headings.length === 0) return null;

//   return (
//     <>
//       {/* Mobile TOC Button - Premium floating action */}
//       <div className="lg:hidden fixed bottom-6 right-6 z-40">
//         <button
//           onClick={() => setIsMobileOpen(!isMobileOpen)}
//           className="group p-3 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
//           aria-label="Table of contents"
//         >
//           {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//         </button>
//       </div>

//       {/* Mobile TOC Overlay + Dropdown */}
//       {isMobileOpen && (
//         <>
//           {/* Backdrop overlay */}
//           <div 
//             className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
//             onClick={() => setIsMobileOpen(false)}
//           />
          
//           {/* Mobile TOC Panel */}
//           <div className="lg:hidden fixed bottom-24 left-4 right-4 z-40 bg-[#0f1019] border border-white/10 rounded-2xl p-5 max-h-[60vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
//             <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
//               <h4 className="text-white font-semibold text-sm tracking-wide">Table of Contents</h4>
//               <button 
//                 onClick={() => setIsMobileOpen(false)}
//                 className="p-1 rounded-lg hover:bg-white/10 transition"
//               >
//                 <X className="w-4 h-4 text-white/40" />
//               </button>
//             </div>
//             <ul className="space-y-2.5">
//               {headings.map((heading) => (
//                 <li key={heading.id}>
//                   <a
//                     href={`#${heading.id}`}
//                     className={`group flex items-center gap-2 text-sm transition-all duration-200 rounded-lg px-3 py-2 ${
//                       activeId === heading.id
//                         ? 'text-emerald-400 bg-emerald-400/10 border-l-2 border-emerald-400'
//                         : 'text-white/40 hover:text-white/70 hover:bg-white/5'
//                     } ${heading.level === 2 ? '' : 'ml-4'}`}
//                     onClick={(e) => handleClick(e, heading.id)}
//                   >
//                     <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${
//                       activeId === heading.id ? 'translate-x-0.5 text-emerald-400' : 'text-white/20'
//                     }`} />
//                     <span className="line-clamp-2">{heading.text}</span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       )}

//       {/* Desktop TOC - Premium Sidebar */}
//       <div className="hidden lg:block sticky top-24 w-72 flex-shrink-0">
//         <div className="bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-5 border border-white/10 shadow-xl">
//           <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
//             <div className="w-1 h-4 rounded-full bg-emerald-400" />
//             <h4 className="text-white font-semibold text-sm tracking-wide">On this page</h4>
//           </div>
          
//           <nav className="relative">
//             {/* Scroll indicator gradient */}
//             <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#0f1019] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            
//             <ul className="space-y-1.5 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2">
//               {headings.map((heading) => (
//                 <li key={heading.id}>
//                   <a
//                     href={`#${heading.id}`}
//                     className={`group flex items-center gap-2 text-sm transition-all duration-200 rounded-lg px-3 py-2 ${
//                       activeId === heading.id
//                         ? 'text-emerald-400 bg-emerald-400/8 border-l-2 border-emerald-400'
//                         : 'text-white/40 hover:text-white/60 hover:bg-white/5'
//                     } ${heading.level === 2 ? '' : 'pl-7'}`}
//                     onClick={(e) => handleClick(e, heading.id)}
//                   >
//                     <ChevronRight className={`w-3 h-3 transition-all duration-200 ${
//                       activeId === heading.id 
//                         ? 'translate-x-0.5 text-emerald-400' 
//                         : 'text-white/20 group-hover:translate-x-0.5'
//                     }`} />
//                     <span className="line-clamp-2">{heading.text}</span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
            
//             {/* Bottom scroll indicator */}
//             <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#0f1019] to-transparent pointer-events-none" />
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// }






// // components/BlogTOC.tsx
// 'use client';

// import { useEffect, useState, useCallback, useRef } from 'react';
// import { Menu, X, ChevronRight } from 'lucide-react';

// interface Heading {
//   id: string;
//   text: string;
//   level: number;
// }

// // ✅ DOM-based heading extraction - no regex, no mismatch
// function extractHeadingsFromDOM(): Heading[] {
//   const elements = Array.from(document.querySelectorAll('h2[id], h3[id]'));
  
//   return elements.map((el) => ({
//     id: el.id,
//     text: el.textContent || '',
//     level: el.tagName === 'H2' ? 2 : 3,
//   }));
// }

// export function BlogTOC({ content }: { content: string }) {
//   const [headings, setHeadings] = useState<Heading[]>([]);
//   const [activeId, setActiveId] = useState<string>('');
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const isUpdatingRef = useRef(false);

//   // ✅ Extract headings from DOM after render
//   useEffect(() => {
//     // Small delay to ensure DOM is fully rendered
//     const timer = setTimeout(() => {
//       const extracted = extractHeadingsFromDOM();
//       setHeadings(extracted);
//     }, 100);
    
//     return () => clearTimeout(timer);
//   }, [content]);

//   // ✅ Improved IntersectionObserver with "last visible" logic
//   useEffect(() => {
//     if (headings.length === 0) return;

//     // Cleanup previous observer
//     if (observerRef.current) {
//       observerRef.current.disconnect();
//     }

//     let currentActive = '';
//     let timeoutId: NodeJS.Timeout;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         // Use requestAnimationFrame to avoid render blocking
//         requestAnimationFrame(() => {
//           entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//               currentActive = entry.target.id;
//             }
//           });

//           if (currentActive && !isUpdatingRef.current) {
//             isUpdatingRef.current = true;
//             setActiveId(currentActive);
//             // Debounce to prevent flicker
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => {
//               isUpdatingRef.current = false;
//             }, 50);
//           }
//         });
//       },
//       {
//         rootMargin: '0px 0px -65% 0px',
//         threshold: [0, 0.25, 0.5, 0.75, 1],
//       }
//     );

//     // Observe all heading elements
//     headings.forEach((heading) => {
//       const element = document.getElementById(heading.id);
//       if (element) observer.observe(element);
//     });

//     observerRef.current = observer;

//     return () => {
//       observer.disconnect();
//       clearTimeout(timeoutId);
//     };
//   }, [headings]);

//   // ✅ Smooth scroll with offset for fixed navbar
//   const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
//     e.preventDefault();
//     setIsMobileOpen(false);
    
//     const element = document.getElementById(id);
//     if (element) {
//       const navbarHeight = 80;
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.scrollY - navbarHeight;
      
//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth',
//       });
      
//       // Update URL hash without jumping
//       window.history.pushState(null, '', `#${id}`);
//       setActiveId(id);
//     }
//   }, []);

//   // ✅ Close mobile menu on escape key
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === 'Escape' && isMobileOpen) {
//         setIsMobileOpen(false);
//       }
//     };
//     window.addEventListener('keydown', handleEscape);
//     return () => window.removeEventListener('keydown', handleEscape);
//   }, [isMobileOpen]);

//   if (headings.length === 0) return null;

//   return (
//     <>
//       {/* Mobile TOC Button - Premium floating action */}
//       <div className="lg:hidden fixed bottom-6 right-6 z-40">
//         <button
//           onClick={() => setIsMobileOpen(!isMobileOpen)}
//           className="group p-3 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
//           aria-label="Table of contents"
//         >
//           {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//         </button>
//       </div>

//       {/* Mobile TOC Overlay + Dropdown */}
//       {isMobileOpen && (
//         <>
//           {/* Backdrop overlay */}
//           <div 
//             className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
//             onClick={() => setIsMobileOpen(false)}
//           />
          
//           {/* Mobile TOC Panel */}
//           <div className="lg:hidden fixed bottom-24 left-4 right-4 z-40 bg-[#0f1019] border border-white/10 rounded-2xl p-5 max-h-[60vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
//             <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
//               <h4 className="text-white font-semibold text-sm tracking-wide">Table of Contents</h4>
//               <button 
//                 onClick={() => setIsMobileOpen(false)}
//                 className="p-1 rounded-lg hover:bg-white/10 transition"
//               >
//                 <X className="w-4 h-4 text-white/40" />
//               </button>
//             </div>
//             <ul className="space-y-2.5">
//               {/* ✅ Fixed: Added index to key */}
//               {headings.map((heading, index) => (
//                 <li key={`${heading.id}-${index}`}>
//                   <a
//                     href={`#${heading.id}`}
//                     className={`group flex items-center gap-2 text-sm transition-all duration-200 rounded-lg px-3 py-2 ${
//                       activeId === heading.id
//                         ? 'text-emerald-400 bg-emerald-400/10 border-l-2 border-emerald-400'
//                         : 'text-white/40 hover:text-white/70 hover:bg-white/5'
//                     } ${heading.level === 2 ? '' : 'ml-4'}`}
//                     onClick={(e) => handleClick(e, heading.id)}
//                   >
//                     <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${
//                       activeId === heading.id ? 'translate-x-0.5 text-emerald-400' : 'text-white/20'
//                     }`} />
//                     <span className="line-clamp-2">{heading.text}</span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       )}

//       {/* Desktop TOC - Premium Sidebar */}
//       <div className="hidden lg:block sticky top-24 w-72 flex-shrink-0">
//         <div className="bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-5 border border-white/10 shadow-xl">
//           <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
//             <div className="w-1 h-4 rounded-full bg-emerald-400" />
//             <h4 className="text-white font-semibold text-sm tracking-wide">On this page</h4>
//           </div>
          
//           <nav className="relative">
//             {/* Scroll indicator gradient */}
//             <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#0f1019] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            
//             <ul className="space-y-1.5 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2">
//               {/* ✅ Fixed: Added index to key */}
//               {headings.map((heading, index) => (
//                 <li key={`${heading.id}-${index}`}>
//                   <a
//                     href={`#${heading.id}`}
//                     className={`group flex items-center gap-2 text-sm transition-all duration-200 rounded-lg px-3 py-2 ${
//                       activeId === heading.id
//                         ? 'text-emerald-400 bg-emerald-400/8 border-l-2 border-emerald-400'
//                         : 'text-white/40 hover:text-white/60 hover:bg-white/5'
//                     } ${heading.level === 2 ? '' : 'pl-7'}`}
//                     onClick={(e) => handleClick(e, heading.id)}
//                   >
//                     <ChevronRight className={`w-3 h-3 transition-all duration-200 ${
//                       activeId === heading.id 
//                         ? 'translate-x-0.5 text-emerald-400' 
//                         : 'text-white/20 group-hover:translate-x-0.5'
//                     }`} />
//                     <span className="line-clamp-2">{heading.text}</span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
            
//             {/* Bottom scroll indicator */}
//             <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#0f1019] to-transparent pointer-events-none" />
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// }














// components/BlogTOC.tsx
'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

// ✅ DOM-based heading extraction - safe with guard
function extractHeadingsFromDOM(): Heading[] {
  if (typeof document === 'undefined') return [];
  
  const elements = Array.from(document.querySelectorAll('h2[id], h3[id]'));
  
  return elements.map((el) => ({
    id: el.id,
    text: el.textContent || '',
    level: el.tagName === 'H2' ? 2 : 3,
  }));
}

export function BlogTOC({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isUpdatingRef = useRef(false);

  // ✅ Extract headings from DOM after render
  useEffect(() => {
    const timer = setTimeout(() => {
      const extracted = extractHeadingsFromDOM();
      setHeadings(extracted);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [content]);

  // ✅ Improved IntersectionObserver with "last visible" logic
  useEffect(() => {
    if (headings.length === 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    let currentActive = '';
    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        requestAnimationFrame(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              currentActive = entry.target.id;
            }
          });

          if (currentActive && !isUpdatingRef.current) {
            isUpdatingRef.current = true;
            setActiveId(currentActive);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              isUpdatingRef.current = false;
            }, 50);
          }
        });
      },
      {
        rootMargin: '0px 0px -65% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    observerRef.current = observer;

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [headings]);

  // ✅ Smooth scroll with offset
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  }, []);

  // ✅ Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileOpen]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile TOC Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="group p-3 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Table of contents"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile TOC Overlay + Dropdown */}
      {isMobileOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMobileOpen(false)}
          />
          
          <div className="lg:hidden fixed bottom-24 left-4 right-4 z-40 bg-[#0f1019] border border-white/10 rounded-2xl p-5 max-h-[60vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <h4 className="text-white font-semibold text-sm tracking-wide">Table of Contents</h4>
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-4 h-4 text-white/40" />
              </button>
            </div>
            <ul className="space-y-2.5">
              {headings.map((heading, index) => (
                <li key={`${heading.id}-${index}`}>
                  <a
                    href={`#${heading.id}`}
                    className={`group flex items-center gap-2 text-sm transition-all duration-200 rounded-lg px-3 py-2 ${
                      activeId === heading.id
                        ? 'text-emerald-400 bg-emerald-400/10 border-l-2 border-emerald-400'
                        : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                    } ${heading.level === 2 ? '' : 'ml-4'}`}
                    onClick={(e) => handleClick(e, heading.id)}
                  >
                    <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${
                      activeId === heading.id ? 'translate-x-0.5 text-emerald-400' : 'text-white/20'
                    }`} />
                    <span className="line-clamp-2">{heading.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Desktop TOC */}
      <div className="hidden lg:block sticky top-24 w-72 flex-shrink-0">
        <div className="bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-5 border border-white/10 shadow-xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="w-1 h-4 rounded-full bg-emerald-400" />
            <h4 className="text-white font-semibold text-sm tracking-wide">On this page</h4>
          </div>
          
          <nav className="relative">
            <ul className="space-y-1.5 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2">
              {headings.map((heading, index) => (
                <li key={`${heading.id}-${index}`}>
                  <a
                    href={`#${heading.id}`}
                    className={`group flex items-center gap-2 text-sm transition-all duration-200 rounded-lg px-3 py-2 ${
                      activeId === heading.id
                        ? 'text-emerald-400 bg-emerald-400/8 border-l-2 border-emerald-400'
                        : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                    } ${heading.level === 2 ? '' : 'pl-7'}`}
                    onClick={(e) => handleClick(e, heading.id)}
                  >
                    <ChevronRight className={`w-3 h-3 transition-all duration-200 ${
                      activeId === heading.id 
                        ? 'translate-x-0.5 text-emerald-400' 
                        : 'text-white/20 group-hover:translate-x-0.5'
                    }`} />
                    <span className="line-clamp-2">{heading.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}