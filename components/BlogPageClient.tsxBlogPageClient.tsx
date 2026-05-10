// // components/BlogPageClient.tsx (Client Component)
// 'use client';

// import { useState, useMemo } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Calendar, Clock, ArrowRight, TrendingUp, Sparkles, BookOpen, Users, Eye, Search, X } from 'lucide-react';
// import { BackToTop } from '@/components/BackToTop';

// // Placeholder until we have real images
// function getPlaceholderImage(title: string): string {
//   return `https://placehold.co/400x240/1a1a2e/34d399?text=${encodeURIComponent(title.slice(0, 30))}`;
// }

// function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
// }

// // Search Bar Component
// function SearchBar({ value, onChange }: { value: string; onChange: (val: string) => void }) {
//   return (
//     <div className="relative max-w-md mx-auto mb-12">
//       <div className="relative group">
//         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-colors group-focus-within:text-emerald-400" />
//         <input
//           type="text"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           placeholder="Search articles..."
//           className="w-full pl-11 pr-11 py-3 rounded-2xl text-sm bg-white/5 border border-white/10 text-white/80 placeholder:text-white/20 focus:outline-none focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/15 transition-all"
//           aria-label="Search articles"
//         />
//         {value && (
//           <button
//             onClick={() => onChange('')}
//             className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-white/10 transition-colors"
//             aria-label="Clear search"
//           >
//             <X className="w-3.5 h-3.5 text-white/40" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// // Blog Card Component
// function BlogCard({ post }: { post: any }) {
//   return (
//     <Link
//       href={`/blog/${post.slug}`}
//       className="group block bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
//     >
//       <div className="relative w-full h-48 overflow-hidden bg-white/5">
//         <Image
//           src={post.image || getPlaceholderImage(post.title)}
//           alt={post.title}
//           fill
//           className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//         />
//       </div>
      
//       <div className="p-6">
//         <div className="flex items-center gap-2 mb-3">
//           <span className="text-[11px] font-medium text-emerald-400/70 uppercase tracking-wide">Article</span>
//           <span className="w-1 h-1 rounded-full bg-white/20" />
//           <span className="text-[11px] text-white/40">{post.readTime}</span>
//         </div>
        
//         <h2 className="text-white font-semibold text-lg leading-tight mb-2 group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2">
//           {post.title}
//         </h2>
        
//         <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
//           {post.description}
//         </p>
        
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2 text-white/30 text-xs">
//             <Calendar className="w-3 h-3" />
//             <span>{formatDate(post.date)}</span>
//           </div>
//           <span className="text-emerald-400/60 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//             Read →
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // Featured Post Component
// function FeaturedPost({ post }: { post: any }) {
//   return (
//     <Link
//       href={`/blog/${post.slug}`}
//       className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/5 to-emerald-500/0 border border-emerald-500/15 hover:border-emerald-500/25 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
//     >
//       <div className="relative w-full h-64 md:h-80 overflow-hidden">
//         <Image
//           src={post.image || getPlaceholderImage(post.title)}
//           alt={post.title}
//           fill
//           className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-[#080810]/60 to-transparent" />
//       </div>
      
//       <div className="relative p-6 md:p-8 -mt-20">
//         <div className="flex items-center gap-2 mb-3">
//           <Sparkles className="w-4 h-4 text-emerald-400" />
//           <span className="text-xs font-medium text-emerald-400">Featured</span>
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

// // Empty State Component
// function EmptyState({ searchQuery }: { searchQuery: string }) {
//   return (
//     <div className="text-center py-16">
//       <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
//         <Search className="w-8 h-8 text-white/20" />
//       </div>
//       <h3 className="text-white font-medium mb-2">No articles found</h3>
//       <p className="text-white/40 text-sm">
//         No results for "{searchQuery}". Try a different search term.
//       </p>
//     </div>
//   );
// }

// // Loading Skeleton
// function BlogSkeleton() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#080810] to-[#0a0a12] pt-32 pb-20 px-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12 animate-pulse">
//           <div className="h-8 w-48 bg-white/10 rounded-full mx-auto mb-6" />
//           <div className="h-12 w-96 bg-white/10 rounded-lg mx-auto mb-4" />
//           <div className="h-6 w-64 bg-white/5 rounded-lg mx-auto" />
//         </div>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[1, 2, 3, 4, 5, 6].map((i) => (
//             <div key={i} className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
//               <div className="w-full h-48 bg-white/10" />
//               <div className="p-6 space-y-3">
//                 <div className="h-4 w-24 bg-white/10 rounded" />
//                 <div className="h-6 w-full bg-white/10 rounded" />
//                 <div className="h-4 w-3/4 bg-white/10 rounded" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function BlogPageClient({ initialPosts }: { initialPosts: any[] }) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Filter posts based on search query
//   const filteredPosts = useMemo(() => {
//     if (!searchQuery.trim()) return initialPosts;
    
//     const query = searchQuery.toLowerCase().trim();
//     return initialPosts.filter((post) => {
//       const titleMatch = post.title?.toLowerCase().includes(query);
//       const descMatch = post.description?.toLowerCase().includes(query);
//       return titleMatch || descMatch;
//     });
//   }, [initialPosts, searchQuery]);

//   const featuredPost = filteredPosts[0];
//   const remainingPosts = filteredPosts.slice(1);

//   if (loading) {
//     return <BlogSkeleton />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#080810] to-[#0a0a12] pt-32 pb-20 px-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 mb-6">
//             <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
//             <span className="text-xs text-white/50 font-medium tracking-wide">Resources</span>
//           </div>
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['DM_Serif_Display'] mb-4 tracking-tight">
//             Teacher's Guide to{' '}
//             <span className="text-emerald-400">Online Quizzes</span>
//           </h1>
//           <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
//             Practical tips, step-by-step guides, and expert advice for creating better assessments.
//           </p>
          
//           <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-white/5">
//             <div className="text-center">
//               <p className="text-2xl font-semibold text-white">{initialPosts.length}</p>
//               <p className="text-xs text-white/30">Articles</p>
//             </div>
//             <div className="w-px h-8 bg-white/5" />
//             <div className="text-center">
//               <div className="flex items-center gap-2">
//                 <Users className="w-4 h-4 text-white/40" />
//                 <p className="text-2xl font-semibold text-white">Growing</p>
//               </div>
//               <p className="text-xs text-white/30">Community</p>
//             </div>
//             <div className="w-px h-8 bg-white/5" />
//             <div className="text-center">
//               <div className="flex items-center gap-2">
//                 <Eye className="w-4 h-4 text-white/40" />
//                 <p className="text-2xl font-semibold text-white">Featured</p>
//               </div>
//               <p className="text-xs text-white/30">Content</p>
//             </div>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <SearchBar value={searchQuery} onChange={setSearchQuery} />

//         {/* Featured Post */}
//         {featuredPost && (
//           <div className="mb-12">
//             <div className="flex items-center gap-2 mb-4">
//               <TrendingUp className="w-4 h-4 text-white/40" />
//               <span className="text-xs font-medium text-white/40 uppercase tracking-wide">Featured</span>
//             </div>
//             <FeaturedPost post={featuredPost} />
//           </div>
//         )}

//         {/* Blog Posts Grid */}
//         {remainingPosts.length > 0 ? (
//           <>
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-white text-lg font-medium tracking-wide">
//                 Latest Articles
//               </h2>
//               <span className="text-xs text-white/30">{remainingPosts.length} posts</span>
//             </div>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {remainingPosts.map((post) => (
//                 <BlogCard key={post.slug} post={post} />
//               ))}
//             </div>
//           </>
//         ) : featuredPost && searchQuery && (
//           <EmptyState searchQuery={searchQuery} />
//         )}

//         {/* No results state */}
//         {filteredPosts.length === 0 && searchQuery && (
//           <EmptyState searchQuery={searchQuery} />
//         )}

//         {/* Call to Action */}
//         {filteredPosts.length > 0 && (
//           <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-transparent border border-white/5 text-center">
//             <h3 className="text-white font-medium text-lg mb-2">Stay Updated</h3>
//             <p className="text-white/40 text-sm mb-6">Get notified when new guides are published.</p>
//             <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//               <Link
//                 href="/signup"
//                 className="flex-1 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all hover:-translate-y-0.5 text-center"
//               >
//                 Create free account
//               </Link>
//               <Link
//                 href="/features"
//                 className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/5 text-white/60 font-medium hover:bg-white/10 transition-all hover:-translate-y-0.5 text-center"
//               >
//                 Explore features
//               </Link>
//             </div>
//             <p className="text-white/20 text-xs mt-4">Join thousands of educators using QuizForge</p>
//           </div>
//         )}

//         {/* Back to Top */}
//         <div className="text-center mt-12">
//           <BackToTop />
//         </div>
//       </div>
//     </div>
//   );
// }





// components/BlogPageClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, Clock, User, ArrowRight, BookOpen, X, Tag } from 'lucide-react';

// ── Design tokens ─────────────────────────────────────────────────
const T = {
  bg: '#080810',
  card: 'rgba(255,255,255,0.025)',
  border: 'rgba(255,255,255,0.07)',
  accent: '#34d399',
  accentBg: 'rgba(52,211,153,0.07)',
  accentBorder: 'rgba(52,211,153,0.18)',
  muted: 'rgba(255,255,255,0.4)',
  dim: 'rgba(255,255,255,0.22)',
};

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  image?: string;
  tags?: string[];
  wordCount?: number;
}

interface BlogPageClientProps {
  initialPosts: Post[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

// Featured post card (first post)
function FeaturedCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div
        className="rounded-2xl overflow-hidden border transition-all duration-300"
        style={{ background: T.card, borderColor: T.border }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = T.accentBorder;
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = T.border;
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image side */}
          <div className="relative aspect-video md:aspect-auto min-h-[220px]"
            style={{ background: 'rgba(52,211,153,0.05)' }}>
            {post.image ? (
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                  <BookOpen className="w-8 h-8" style={{ color: T.accent }} />
                </div>
              </div>
            )}
            {/* Featured badge */}
            <div className="absolute top-4 left-4">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accent }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} />
                Featured
              </span>
            </div>
          </div>

          {/* Content side */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            {post.tags && post.tags[0] && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium mb-4 w-fit px-2.5 py-1 rounded-full"
                style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accent }}>
                <Tag className="w-3 h-3" />
                {post.tags[0]}
              </span>
            )}
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-emerald-300 transition-colors"
              style={{ fontFamily: "'DM Serif Display', serif" }}>
              {post.title}
            </h2>
            <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: T.muted }}>
              {post.description}
            </p>
            <div className="flex items-center gap-4 text-xs mb-5" style={{ color: T.dim }}>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3 h-3" />
                {post.author}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium transition-all"
              style={{ color: T.accent }}>
              Read article
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Regular post card
function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <div
        className="rounded-2xl overflow-hidden border h-full flex flex-col transition-all duration-300"
        style={{ background: T.card, borderColor: T.border }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = T.accentBorder;
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = T.border;
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}>
        {/* Image */}
        <div className="relative aspect-video" style={{ background: 'rgba(52,211,153,0.04)' }}>
          {post.image ? (
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                <BookOpen className="w-5 h-5" style={{ color: T.accent }} />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {post.tags && post.tags[0] && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium mb-3 w-fit px-2 py-0.5 rounded-full"
              style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accent }}>
              {post.tags[0]}
            </span>
          )}
          <h3 className="text-base font-semibold text-white mb-2 leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors flex-shrink-0">
            {post.title}
          </h3>
          <p className="text-xs leading-relaxed mb-4 line-clamp-2 flex-1" style={{ color: T.muted }}>
            {post.description}
          </p>
          <div className="flex items-center justify-between mt-auto pt-3 border-t"
            style={{ borderColor: T.border }}>
            <div className="flex items-center gap-3 text-[10px]" style={{ color: T.dim }}>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 flex-shrink-0"
              style={{ color: T.accent }} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPageClient({ initialPosts }: BlogPageClientProps) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique tags
  const allTags = Array.from(
    new Set(initialPosts.flatMap(p => p.tags || []))
  ).slice(0, 8);

  // Filter posts
  const filtered = initialPosts.filter(post => {
    const matchSearch = !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());
    const matchTag = !activeTag || (post.tags || []).includes(activeTag);
    return matchSearch && matchTag;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen text-white pt-28 pb-20" style={{ background: T.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');
      `}</style>

      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
            <BookOpen className="w-3 h-3" style={{ color: T.accent }} />
            <span className="text-[11px] font-medium tracking-wide" style={{ color: T.accent }}>
              QuizForge Blog
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            Tips for educators<span style={{ color: T.accent }}>.</span>
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: T.muted }}>
            Practical guides on creating better quizzes, saving time with AI, and improving student outcomes.
          </p>
        </div>

        {/* Search + filter toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: T.muted }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm text-white focus:outline-none transition-all"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
              onFocus={e => e.target.style.borderColor = T.accentBorder}
              onBlur={e => e.target.style.borderColor = T.border}
            />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: T.muted }}>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Result count */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border shrink-0"
            style={{ background: T.card, borderColor: T.border }}>
            <span className="text-sm font-semibold text-white">{filtered.length}</span>
            <span className="text-xs" style={{ color: T.muted }}>
              article{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Tag filter pills */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveTag(null)}
              className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
              style={!activeTag
                ? { background: T.accentBg, borderColor: T.accentBorder, color: T.accent }
                : { background: 'transparent', borderColor: T.border, color: T.muted }}>
              All
            </button>
            {allTags.map(tag => (
              <button key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                style={activeTag === tag
                  ? { background: T.accentBg, borderColor: T.accentBorder, color: T.accent }
                  : { background: 'transparent', borderColor: T.border, color: T.muted }}>
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* No results */}
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: T.card, border: `1px solid ${T.border}` }}>
              <Search className="w-6 h-6" style={{ color: T.muted }} />
            </div>
            <p className="text-base font-medium text-white mb-2">No articles found</p>
            <p className="text-sm mb-4" style={{ color: T.muted }}>Try a different search or clear the filter</p>
            <button onClick={() => { setSearch(''); setActiveTag(null); }}
              className="px-4 py-2 rounded-xl text-sm font-medium border transition-all"
              style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
              Clear filters
            </button>
          </div>
        )}

        {/* Featured post */}
        {featured && (
          <div className="mb-8">
            <FeaturedCard post={featured} />
          </div>
        )}

        {/* Post grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* CTA strip */}
        <div className="mt-16 rounded-2xl p-8 text-center border"
          style={{ background: T.accentBg, borderColor: T.accentBorder }}>
          <h3 className="text-xl font-bold text-white mb-2"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            Ready to create your first quiz?
          </h3>
          <p className="text-sm mb-6" style={{ color: T.muted }}>
            Put what you've learned into practice. Free plan, no credit card.
          </p>
          <Link href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: '#fff', color: '#080810' }}>
            Start for free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}