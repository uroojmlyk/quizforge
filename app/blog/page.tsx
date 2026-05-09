// // app/blog/page.tsx
// import Link from 'next/link';
// import { Calendar, Clock, ArrowRight } from 'lucide-react';
// import { getAllPosts } from '@/lib/posts';

// export const metadata = {
//   title: "QuizForge Blog | Tips for Teachers & Educators",
//   description: "Practical guides and tips for creating engaging online quizzes, saving time with AI, and improving student assessments.",
// };

// export default async function BlogPage() {
//   const posts = await getAllPosts();

//   return (
//     <div className="min-h-screen bg-[#080810] pt-32 pb-20 px-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-bold text-white font-['DM_Serif_Display'] mb-4">
//             Teacher's Guide to{' '}
//             <span className="text-emerald-400">Online Quizzes</span>
//           </h1>
//           <p className="text-white/50 text-lg max-w-2xl mx-auto">
//             Practical tips, step-by-step guides, and expert advice for creating better assessments.
//           </p>
//         </div>

//         {/* Blog Posts Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {posts.map((post) => (
//             <Link
//               key={post.slug}
//               href={`/blog/${post.slug}`}
//               className="group bg-white/3 border border-white/10 rounded-2xl p-6 hover:bg-white/5 transition-all duration-300"
//             >
//               <h2 className="text-white font-semibold text-xl mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
//                 {post.title}
//               </h2>
//               <p className="text-white/50 text-sm mb-4 line-clamp-3">
//                 {post.description}
//               </p>
//               <div className="flex items-center gap-4 text-white/40 text-xs">
//                 <span className="flex items-center gap-1">
//                   <Calendar className="w-3 h-3" />
//                   {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Clock className="w-3 h-3" />
//                   {post.readTime}
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }









// // app/blog/page.tsx
// import Link from 'next/link';
// import { Calendar, Clock, ArrowRight, Search, TrendingUp, Sparkles } from 'lucide-react';
// import { getAllPosts } from '@/lib/posts';
// import { BackToTop } from '@/components/BackToTop';

// export const metadata = {
//   title: "QuizForge Blog | Tips for Teachers & Educators",
//   description: "Practical guides and step-by-step tutorials for creating engaging online quizzes, saving time with AI, and improving student assessments.",
//   keywords: "quiz blog, teacher tips, online assessment, AI quiz generator, education technology",
//   openGraph: {
//     title: "QuizForge Blog | Teacher's Guide to Online Quizzes",
//     description: "Expert tips and tutorials for creating better assessments with AI.",
//     type: "website",
//   },
// };

// function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
// }

// function FeaturedPost({ post }: { post: any }) {
//   return (
//     <Link
//       href={`/blog/${post.slug}`}
//       className="group relative block bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-500"
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//       <div className="relative p-8">
//         <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 mb-4">
//           <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
//           <span className="text-xs text-emerald-400 font-medium">Featured Article</span>
//         </div>
//         <h2 className="text-2xl md:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
//           {post.title}
//         </h2>
//         <p className="text-white/50 text-base mb-4 line-clamp-2 max-w-2xl">
//           {post.description}
//         </p>
//         <div className="flex items-center justify-between flex-wrap gap-4">
//           <div className="flex items-center gap-4 text-white/40 text-sm">
//             <span className="flex items-center gap-1.5">
//               <Calendar className="w-3.5 h-3.5" />
//               {formatDate(post.date)}
//             </span>
//             <span className="flex items-center gap-1.5">
//               <Clock className="w-3.5 h-3.5" />
//               {post.readTime}
//             </span>
//           </div>
//           <span className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium group-hover:gap-3 transition-all">
//             Read article <ArrowRight className="w-4 h-4" />
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// function BlogCard({ post, index }: { post: any; index: number }) {
//   return (
//     <Link
//       href={`/blog/${post.slug}`}
//       className="group bg-white/3 border border-white/10 rounded-2xl p-6 hover:bg-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1"
//       style={{ animationDelay: `${index * 50}ms` }}
//     >
//       <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 mb-3">
//         <span className="text-[9px] text-emerald-400 font-medium uppercase tracking-wider">Guide</span>
//       </div>
      
//       <h2 className="text-white font-semibold text-xl mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
//         {post.title}
//       </h2>
      
//       <p className="text-white/50 text-sm mb-4 line-clamp-3 group-hover:text-white/60 transition-colors">
//         {post.description}
//       </p>
      
//       <div className="flex items-center justify-between flex-wrap gap-3">
//         <div className="flex items-center gap-3 text-white/40 text-xs">
//           <span className="flex items-center gap-1">
//             <Calendar className="w-3 h-3" />
//             {formatDate(post.date)}
//           </span>
//           <span className="flex items-center gap-1">
//             <Clock className="w-3 h-3" />
//             {post.readTime}
//           </span>
//         </div>
//         <span className="text-emerald-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
//           Read more →
//         </span>
//       </div>
//     </Link>
//   );
// }

// export default async function BlogPage() {
//   const posts = await getAllPosts();
  
//   const [featuredPost, ...remainingPosts] = posts;

//   if (!posts.length) {
//     return (
//       <div className="min-h-screen bg-[#080810] pt-32 pb-20 px-6 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mx-auto mb-4">
//             <Sparkles className="w-8 h-8 text-emerald-400/40" />
//           </div>
//           <h2 className="text-white text-xl font-semibold mb-2">No posts yet</h2>
//           <p className="text-white/40">Check back soon for new content!</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#080810] to-[#0a0a12] pt-32 pb-20 px-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
//             <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
//             <span className="text-xs text-white/50 font-medium tracking-wide">Resources</span>
//           </div>
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['DM_Serif_Display'] mb-4">
//             Teacher's Guide to{' '}
//             <span className="text-emerald-400 bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
//               Online Quizzes
//             </span>
//           </h1>
//           <p className="text-white/50 text-lg max-w-2xl mx-auto">
//             Practical tips, step-by-step guides, and expert advice for creating better assessments.
//           </p>
          
//           <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-white/10">
//             <div className="text-center">
//               <p className="text-2xl font-bold text-white">{posts.length}</p>
//               <p className="text-xs text-white/40">Articles</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-bold text-white">10+</p>
//               <p className="text-xs text-white/40">Hours of reading</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-bold text-white">5k+</p>
//               <p className="text-xs text-white/40">Monthly readers</p>
//             </div>
//           </div>
//         </div>

//         {/* Search Bar - Static, no interactivity needed */}
//         <div className="max-w-md mx-auto mb-12">
//           <div className="relative group">
//             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
//             <input
//               type="text"
//               placeholder="Search articles..."
//               className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white/80 placeholder:text-white/20 focus:outline-none focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/15 transition-all"
//               readOnly
//             />
//           </div>
//         </div>

//         {/* Featured Post Section */}
//         {featuredPost && (
//           <div className="mb-12">
//             <div className="flex items-center gap-2 mb-4">
//               <TrendingUp className="w-4 h-4 text-emerald-400" />
//               <span className="text-xs font-medium text-white/50 uppercase tracking-wider">Featured</span>
//             </div>
//             <FeaturedPost post={featuredPost} />
//           </div>
//         )}

//         {/* Blog Posts Grid */}
//         {remainingPosts.length > 0 && (
//           <>
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-white text-xl font-semibold font-['DM_Serif_Display']">
//                 Latest Articles
//               </h2>
//               <span className="text-xs text-white/30">{remainingPosts.length} posts</span>
//             </div>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {remainingPosts.map((post, index) => (
//                 <BlogCard key={post.slug} post={post} index={index} />
//               ))}
//             </div>
//           </>
//         )}

//         {/* Newsletter Signup - Static */}
//         <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-transparent border border-white/10 text-center">
//           <h3 className="text-white font-semibold text-xl mb-2">Get Teaching Tips in Your Inbox</h3>
//           <p className="text-white/50 text-sm mb-6">New guides and resources delivered weekly.</p>
//           <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//             <input
//               type="email"
//               placeholder="Your email address"
//               className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white/80 placeholder:text-white/20 focus:outline-none focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/15 transition-all"
//             />
//             <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all hover:-translate-y-0.5">
//               Subscribe
//             </button>
//           </div>
//           <p className="text-white/25 text-xs mt-4">No spam. Unsubscribe anytime.</p>
//         </div>

//         {/* ✅ Back to Top - Client Component */}
//         <div className="text-center mt-12">
//           <BackToTop />
//         </div>
//       </div>
//     </div>
//   );
// }








// // app/blog/page.tsx
// import Link from 'next/link';
// import Image from 'next/image';
// import { Calendar, Clock, ArrowRight, TrendingUp, Sparkles, BookOpen, Users, Eye, Search } from 'lucide-react';
// import { getAllPosts } from '@/lib/posts';
// import { BackToTop } from '@/components/BackToTop';

// export const metadata = {
//   title: "QuizForge Blog | Tips for Teachers & Educators",
//   description: "Practical guides and step-by-step tutorials for creating engaging online quizzes, saving time with AI, and improving student assessments.",
//   keywords: "quiz blog, teacher tips, online assessment, AI quiz generator, education technology",
//   openGraph: {
//     title: "QuizForge Blog | Teacher's Guide to Online Quizzes",
//     description: "Expert tips and tutorials for creating better assessments with AI.",
//     type: "website",
//   },
// };

// // Real stats - remove fake numbers
// const REAL_STATS = {
//   articles: null, // Will be set dynamically
//   readers: "Growing",
//   contributors: "Expert educators",
// };

// function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
// }

// // Placeholder image generator
// function getPlaceholderImage(title: string): string {
//   // Using placeholder images - replace with actual images later
//   const colors = ['emerald', 'blue', 'purple', 'orange', 'pink'];
//   const randomColor = colors[Math.floor(Math.random() * colors.length)];
//   return `https://placehold.co/400x240/1a1a2e/34d399?text=${encodeURIComponent(title.slice(0, 30))}`;
// }

// function FeaturedPost({ post }: { post: any }) {
//   return (
//     <Link
//       href={`/blog/${post.slug}`}
//       className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500 hover:scale-[1.01]"
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
//       {/* Featured Image */}
//       <div className="relative w-full h-56 md:h-64 overflow-hidden">
//         <Image
//           src={post.image || getPlaceholderImage(post.title)}
//           alt={post.title}
//           fill
//           className="object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-transparent" />
//       </div>
      
//       <div className="relative p-6 md:p-8">
//         <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 mb-4">
//           <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
//           <span className="text-xs text-emerald-400 font-medium">Featured Article</span>
//         </div>
//         <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white font-['DM_Serif_Display'] mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
//           {post.title}
//         </h2>
//         <p className="text-white/50 text-sm md:text-base mb-4 line-clamp-2 max-w-2xl">
//           {post.description}
//         </p>
//         <div className="flex items-center justify-between flex-wrap gap-4">
//           <div className="flex items-center gap-4 text-white/40 text-xs md:text-sm">
//             <span className="flex items-center gap-1.5">
//               <Calendar className="w-3.5 h-3.5" />
//               {formatDate(post.date)}
//             </span>
//             <span className="flex items-center gap-1.5">
//               <Clock className="w-3.5 h-3.5" />
//               {post.readTime}
//             </span>
//           </div>
//           <span className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium group-hover:gap-3 transition-all">
//             Read article <ArrowRight className="w-4 h-4" />
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// function BlogCard({ post, index }: { post: any; index: number }) {
//   const animationStyle = {
//     animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
//   };

//   return (
//     <Link
//       href={`/blog/${post.slug}`}
//       className="group bg-white/3 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1"
//       style={animationStyle}
//     >
//       {/* Card Image */}
//       <div className="relative w-full h-48 overflow-hidden bg-white/5">
//         <Image
//           src={post.image || getPlaceholderImage(post.title)}
//           alt={post.title}
//           fill
//           className="object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//         <div className="absolute top-3 left-3">
//           <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-400/20 backdrop-blur-sm border border-emerald-400/30">
//             <span className="text-[9px] text-emerald-400 font-medium uppercase tracking-wider">Guide</span>
//           </div>
//         </div>
//       </div>
      
//       <div className="p-5">
//         <h2 className="text-white font-semibold text-lg mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
//           {post.title}
//         </h2>
        
//         <p className="text-white/50 text-sm mb-4 line-clamp-2 group-hover:text-white/60 transition-colors">
//           {post.description}
//         </p>
        
//         <div className="flex items-center justify-between flex-wrap gap-2">
//           <div className="flex items-center gap-3 text-white/40 text-xs">
//             <span className="flex items-center gap-1">
//               <Calendar className="w-3 h-3" />
//               {formatDate(post.date)}
//             </span>
//             <span className="flex items-center gap-1">
//               <Clock className="w-3 h-3" />
//               {post.readTime}
//             </span>
//           </div>
//           <span className="text-emerald-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
//             Read more →
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default async function BlogPage() {
//   const posts = await getAllPosts();
  
//   const [featuredPost, ...remainingPosts] = posts;

//   if (!posts.length) {
//     return (
//       <div className="min-h-screen bg-[#080810] pt-32 pb-20 px-6 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mx-auto mb-4">
//             <BookOpen className="w-8 h-8 text-emerald-400/40" />
//           </div>
//           <h2 className="text-white text-xl font-semibold mb-2">No posts yet</h2>
//           <p className="text-white/40">Check back soon for new content!</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#080810] to-[#0a0a12] pt-32 pb-20 px-6">
//       <style>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>

//       <div className="max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
//             <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
//             <span className="text-xs text-white/50 font-medium tracking-wide">Resources</span>
//           </div>
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['DM_Serif_Display'] mb-4">
//             Teacher's Guide to{' '}
//             <span className="text-emerald-400 bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
//               Online Quizzes
//             </span>
//           </h1>
//           <p className="text-white/50 text-lg max-w-2xl mx-auto">
//             Practical tips, step-by-step guides, and expert advice for creating better assessments.
//           </p>
          
//           {/* Real stats - no fake numbers */}
//           <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-white/10">
//             <div className="text-center">
//               <p className="text-2xl font-bold text-white">{posts.length}</p>
//               <p className="text-xs text-white/40">Articles</p>
//             </div>
//             <div className="text-center">
//               <div className="flex items-center gap-2">
//                 <Users className="w-4 h-4 text-emerald-400" />
//                 <p className="text-2xl font-bold text-white">{REAL_STATS.readers}</p>
//               </div>
//               <p className="text-xs text-white/40">Community</p>
//             </div>
//             <div className="text-center">
//               <div className="flex items-center gap-2">
//                 <Eye className="w-4 h-4 text-emerald-400" />
//                 <p className="text-2xl font-bold text-white">Featured</p>
//               </div>
//               <p className="text-xs text-white/40">Content</p>
//             </div>
//           </div>
//         </div>

//         {/* Search Bar - Coming Soon Badge */}
//         <div className="max-w-md mx-auto mb-12">
//           <div className="relative group">
//             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
//             <input
//               type="text"
//               placeholder="Search articles (coming soon)..."
//               className="w-full pl-10 pr-24 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white/50 placeholder:text-white/15 cursor-not-allowed"
//               disabled
//               readOnly
//             />
//             <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/30">
//               Soon
//             </span>
//           </div>
//         </div>

//         {/* Featured Post Section */}
//         {featuredPost && (
//           <div className="mb-12">
//             <div className="flex items-center gap-2 mb-4">
//               <TrendingUp className="w-4 h-4 text-emerald-400" />
//               <span className="text-xs font-medium text-white/50 uppercase tracking-wider">Featured</span>
//             </div>
//             <FeaturedPost post={featuredPost} />
//           </div>
//         )}

//         {/* Blog Posts Grid */}
//         {remainingPosts.length > 0 && (
//           <>
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-white text-xl font-semibold font-['DM_Serif_Display']">
//                 Latest Articles
//               </h2>
//               <span className="text-xs text-white/30">{remainingPosts.length} posts</span>
//             </div>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {remainingPosts.map((post, index) => (
//                 <BlogCard key={post.slug} post={post} index={index} />
//               ))}
//             </div>
//           </>
//         )}

//         {/* Newsletter Section - Simplified CTA without fake functionality */}
//         <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 text-center">
//           <h3 className="text-white font-semibold text-xl mb-2">Stay Updated</h3>
//           <p className="text-white/50 text-sm mb-6">Get notified when new guides are published.</p>
//           <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//             <Link
//               href="/signup"
//               className="flex-1 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all hover:-translate-y-0.5 text-center"
//             >
//               Create free account
//             </Link>
//             <Link
//               href="/features"
//               className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 font-medium hover:bg-white/10 transition-all hover:-translate-y-0.5 text-center"
//             >
//               Explore features
//             </Link>
//           </div>
//           <p className="text-white/25 text-xs mt-4">Join thousands of educators using QuizForge</p>
//         </div>

//         {/* Back to Top */}
//         <div className="text-center mt-12">
//           <BackToTop />
//         </div>
//       </div>
//     </div>
//   );
// }




// app/blog/page.tsx (Server Component - NO 'use client')
import { getAllPosts } from '@/lib/posts';
import BlogPageClient from '@/components/BlogPageClient.tsxBlogPageClient';
export const metadata = {
  title: "QuizForge Blog | Tips for Teachers & Educators",
  description: "Practical guides and step-by-step tutorials for creating engaging online quizzes, saving time with AI, and improving student assessments.",
  keywords: "quiz blog, teacher tips, online assessment, AI quiz generator, education technology",
  openGraph: {
    title: "QuizForge Blog | Teacher's Guide to Online Quizzes",
    description: "Expert tips and tutorials for creating better assessments with AI.",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogPageClient initialPosts={posts} />;
}