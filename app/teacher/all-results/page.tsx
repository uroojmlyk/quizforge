


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { 
//   ArrowLeft,
//   Sparkles,
//   BarChart3,
//   Award,
//   Search,
//   Download,
//   Filter,
//   ChevronLeft,
//   ChevronRight,
//   TrendingUp,
//   Clock,
//   Users
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// interface Result {
//   _id: string;
//   quizId: string;
//   quizTitle: string;
//   userName: string;
//   score: number;
//   totalMarks: number;
//   percentage: number;
//   submittedAt: string;
// }

// export default function AllResultsPage() {
//   const router = useRouter();
//   const [results, setResults] = useState<Result[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortBy, setSortBy] = useState<'date' | 'percentage' | 'quiz'>('date');
//   const [filterQuiz, setFilterQuiz] = useState<string>('all');
//   const resultsPerPage = 10;

//   useEffect(() => {
//     fetchAllResults();
//   }, []);

//   const fetchAllResults = async () => {
//     try {
//       setLoading(true);
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
//       const teacherId = user.id || user._id;
      
//       const res = await fetch(`/api/results/teacher/${teacherId}`);
//       const data = await res.json();

//       if (data.success) {
//         setResults(data.data);
//         showToast.success(`Loaded ${data.data.length} results`);
//       } else {
//         showToast.error('Failed to load results');
//       }
//     } catch (error) {
//       showToast.error('Error loading results');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get unique quiz titles for filter
//   const uniqueQuizzes = ['all', ...new Set(results.map(r => r.quizTitle))];

//   // Filter and sort results
//   const filteredResults = results
//     .filter(r => {
//       const matchesSearch = r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            r.quizTitle.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesQuiz = filterQuiz === 'all' || r.quizTitle === filterQuiz;
//       return matchesSearch && matchesQuiz;
//     })
//     .sort((a, b) => {
//       switch(sortBy) {
//         case 'percentage':
//           return b.percentage - a.percentage;
//         case 'quiz':
//           return a.quizTitle.localeCompare(b.quizTitle);
//         default:
//           return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
//       }
//     });

//   // Pagination
//   const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
//   const paginatedResults = filteredResults.slice(
//     (currentPage - 1) * resultsPerPage,
//     currentPage * resultsPerPage
//   );

//   const getScoreColor = (percentage: number) => {
//     if (percentage >= 80) return 'text-green-400 bg-green-500/10 border-green-500/30';
//     if (percentage >= 60) return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
//     if (percentage >= 40) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
//     return 'text-red-400 bg-red-500/10 border-red-500/30';
//   };

//   const downloadCSV = () => {
//     const csv = [
//       ['Student', 'Quiz', 'Score', 'Total', 'Percentage', 'Date'].join(','),
//       ...filteredResults.map(r => [
//         r.userName,
//         `"${r.quizTitle}"`,
//         r.score,
//         r.totalMarks,
//         `${r.percentage}%`,
//         new Date(r.submittedAt).toLocaleDateString()
//       ].join(','))
//     ].join('\n');

//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `results-${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
//       <Toaster />
      
//       {/* Animated Background */}
//       <div className="fixed inset-0">
//         <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10">
//         {/* Header */}
//         <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#111117]/80 border-b border-[#2a2a35]">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16 sm:h-20">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <button
//                   onClick={() => router.back()}
//                   className="p-2 hover:bg-[#1a1a23] rounded-xl transition-colors group"
//                 >
//                   <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white" />
//                 </button>
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
//                     <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                   </div>
//                   <div>
//                     <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                       All Results
//                     </h1>
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       {filteredResults.length} total submissions
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={downloadCSV}
//                 className="flex items-center gap-2 px-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-gray-300 hover:bg-[#252530] transition-all"
//               >
//                 <Download className="w-4 h-4" />
//                 <span className="hidden sm:inline">Export CSV</span>
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//           {/* Filters */}
//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-4 sm:p-5 mb-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                 <input
//                   type="text"
//                   placeholder="Search by student or quiz..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500"
//                 />
//               </div>
              
//               <div className="flex gap-3">
//                 <select
//                   value={filterQuiz}
//                   onChange={(e) => setFilterQuiz(e.target.value)}
//                   className="px-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white focus:outline-none focus:border-purple-500"
//                 >
//                   {uniqueQuizzes.map((quiz, index) => (
//                     <option key={`quiz-filter-${index}`} value={quiz}>
//                       {quiz === 'all' ? 'All Quizzes' : quiz}
//                     </option>
//                   ))}
//                 </select>

//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value as any)}
//                   className="px-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white focus:outline-none focus:border-purple-500"
//                 >
//                   <option value="date">Latest First</option>
//                   <option value="percentage">Highest Score</option>
//                   <option value="quiz">Quiz Name</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Results Table */}
//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-[#2a2a35] bg-[#1a1a23]/50">
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                       Student
//                     </th>
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                       Quiz
//                     </th>
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                       Score
//                     </th>
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                       Percentage
//                     </th>
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                       Date
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-[#2a2a35]">
//                   {paginatedResults.map((result, index) => (
//                     <tr key={result?._id || `result-row-${index}`} className="hover:bg-[#1a1a23] transition-colors">
//                       <td className="px-4 sm:px-6 py-3">
//                         <div className="flex items-center gap-2">
//                           <div className="w-6 h-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
//                             <span className="text-xs font-medium text-purple-400">
//                               {result.userName?.charAt(0) || '?'}
//                             </span>
//                           </div>
//                           <span className="text-sm text-white">{result.userName}</span>
//                         </div>
//                       </td>
//                       <td className="px-4 sm:px-6 py-3">
//                         <span className="text-sm text-gray-300">{result.quizTitle}</span>
//                       </td>
//                       <td className="px-4 sm:px-6 py-3">
//                         <span className="text-sm text-white font-medium">
//                           {result.score}/{result.totalMarks}
//                         </span>
//                       </td>
//                       <td className="px-4 sm:px-6 py-3">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(result.percentage)}`}>
//                           {result.percentage}%
//                         </span>
//                       </td>
//                       <td className="px-4 sm:px-6 py-3">
//                         <span className="text-sm text-gray-400">
//                           {new Date(result.submittedAt).toLocaleDateString()}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-[#2a2a35]">
//                 <div className="text-sm text-gray-400">
//                   Showing {(currentPage - 1) * resultsPerPage + 1} to {Math.min(currentPage * resultsPerPage, filteredResults.length)} of {filteredResults.length} results
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                     disabled={currentPage === 1}
//                     className="p-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                   </button>
//                   <span className="px-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white text-sm">
//                     {currentPage} / {totalPages}
//                   </span>
//                   <button
//                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                     disabled={currentPage === totalPages}
//                     className="p-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }










'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import {
  ArrowLeft, BarChart3, Search, Download,
  ChevronLeft, ChevronRight, TrendingUp, Trophy, Filter
} from 'lucide-react';
import { showToast } from '@/lib/toast';

// ── Design tokens ─────────────────────────────────────────────────
const T = {
  bg: '#080810',
  card: 'rgba(255,255,255,0.025)',
  cardHover: 'rgba(255,255,255,0.04)',
  border: 'rgba(255,255,255,0.07)',
  borderFocus: 'rgba(52,211,153,0.4)',
  accent: '#34d399',
  accentBg: 'rgba(52,211,153,0.07)',
  accentBorder: 'rgba(52,211,153,0.18)',
  muted: 'rgba(255,255,255,0.4)',
  dim: 'rgba(255,255,255,0.22)',
  navBg: 'rgba(8,8,16,0.85)',
};

interface Result {
  _id: string; quizId: string; quizTitle: string;
  userName: string; score: number; totalMarks: number;
  percentage: number; submittedAt: string;
}

// ── Score color helper ────────────────────────────────────────────
function scoreStyle(pct: number) {
  if (pct >= 80) return { color: T.accent, bg: T.accentBg, border: T.accentBorder };
  if (pct >= 60) return { color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)' };
  if (pct >= 40) return { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' };
  return { color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' };
}

const selectCls = `px-3 py-2 rounded-xl text-xs text-white focus:outline-none transition-all appearance-none cursor-pointer`;

export default function AllResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'date' | 'percentage' | 'quiz'>('date');
  const [filterQuiz, setFilterQuiz] = useState<string>('all');
  const resultsPerPage = 10;

  // ── Logic untouched ──────────────────────────────────────────────
  useEffect(() => { fetchAllResults(); }, []);

  const fetchAllResults = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const teacherId = user.id || user._id;
      const res = await fetch(`/api/results/teacher/${teacherId}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
        showToast.success(`Loaded ${data.data.length} results`);
      } else { showToast.error('Failed to load results'); }
    } catch { showToast.error('Error loading results'); }
    finally { setLoading(false); }
  };

  const uniqueQuizzes = ['all', ...new Set(results.map(r => r.quizTitle))];

  const filteredResults = results
    .filter(r => {
      const matchesSearch = r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.quizTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesQuiz = filterQuiz === 'all' || r.quizTitle === filterQuiz;
      return matchesSearch && matchesQuiz;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'percentage': return b.percentage - a.percentage;
        case 'quiz': return a.quizTitle.localeCompare(b.quizTitle);
        default: return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      }
    });

  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * resultsPerPage, currentPage * resultsPerPage
  );

  const downloadCSV = () => {
    const csv = [
      ['Student', 'Quiz', 'Score', 'Total', 'Percentage', 'Date'].join(','),
      ...filteredResults.map(r => [
        r.userName, `"${r.quizTitle}"`, r.score, r.totalMarks,
        `${r.percentage}%`, new Date(r.submittedAt).toLocaleDateString()
      ].join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };
  // ────────────────────────────────────────────────────────────────

  const avgScore = results.length
    ? Math.round(results.reduce((a, r) => a + r.percentage, 0) / results.length)
    : 0;
  const topScore = results.length ? Math.max(...results.map(r => r.percentage)) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: T.bg }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
            <span className="font-bold text-sm" style={{ color: T.accent }}>Q</span>
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                style={{ background: T.accent, animationDelay: `${i * 0.15}s`, opacity: 0.6 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ background: T.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
      <Toaster position="top-right" />

      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)' }} />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ background: T.navBg, borderColor: T.border }}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => router.back()}
              className="p-2 rounded-xl transition-all hover:bg-white/[0.04] shrink-0" style={{ color: T.muted }}>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                <span className="font-bold text-[11px]" style={{ color: T.accent }}>Q</span>
              </div>
              <span className="font-semibold text-sm hidden sm:block" style={{ color: 'rgba(255,255,255,0.8)' }}>QuizForge</span>
            </div>
            <div className="w-px h-4 shrink-0" style={{ background: T.border }} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white leading-none">All Results</p>
              <p className="text-[10px] mt-0.5" style={{ color: T.dim }}>
                {filteredResults.length} submission{filteredResults.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Export */}
          <button onClick={downloadCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all shrink-0"
            style={{ background: T.card, borderColor: T.border, color: T.muted }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.accentBorder; (e.currentTarget as HTMLElement).style.color = T.accent; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.muted; }}>
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 space-y-4">

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Submissions', value: results.length, icon: BarChart3, color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)' },
            { label: 'Average Score', value: `${avgScore}%`, icon: TrendingUp, color: T.accent, bg: T.accentBg, border: T.accentBorder },
            { label: 'Top Score', value: `${topScore}%`, icon: Trophy, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-3.5 border" style={{ background: T.card, borderColor: s.border }}>
              <div className="w-7 h-7 rounded-xl flex items-center justify-center mb-2.5" style={{ background: s.bg }}>
                <s.icon style={{ width: 14, height: 14, color: s.color }} />
              </div>
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: T.muted }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters + table */}
        <div className="rounded-2xl overflow-hidden border" style={{ background: T.card, borderColor: T.border }}>
          {/* Filter toolbar */}
          <div className="p-4 border-b" style={{ borderColor: T.border }}>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.muted }} />
                <input type="text" placeholder="Search by student or quiz..."
                  value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-sm text-white focus:outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}` }}
                  onFocus={e => e.target.style.borderColor = T.borderFocus}
                  onBlur={e => e.target.style.borderColor = T.border} />
              </div>
              {/* Selects */}
              <div className="flex gap-2 shrink-0">
                <div className="relative">
                  <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: T.dim }} />
                  <select value={filterQuiz} onChange={(e) => { setFilterQuiz(e.target.value); setCurrentPage(1); }}
                    className={`${selectCls} pl-7 pr-2`}
                    style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}` }}>
                    {uniqueQuizzes.map((quiz, i) => (
                      <option key={`qf-${i}`} value={quiz} style={{ background: '#0f1012' }}>
                        {quiz === 'all' ? 'All Quizzes' : quiz}
                      </option>
                    ))}
                  </select>
                </div>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}
                  className={`${selectCls} px-3`}
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}` }}>
                  <option value="date" style={{ background: '#0f1012' }}>Latest First</option>
                  <option value="percentage" style={{ background: '#0f1012' }}>Highest Score</option>
                  <option value="quiz" style={{ background: '#0f1012' }}>Quiz Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          {paginatedResults.length === 0 ? (
            <div className="py-14 text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <BarChart3 className="w-6 h-6" style={{ color: T.muted }} />
              </div>
              <p className="text-sm" style={{ color: T.muted }}>No results found</p>
              {(searchTerm || filterQuiz !== 'all') && (
                <button onClick={() => { setSearchTerm(''); setFilterQuiz('all'); }}
                  className="mt-2 text-xs" style={{ color: T.accent }}>
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: T.border, background: 'rgba(255,255,255,0.01)' }}>
                    {['Student', 'Quiz', 'Score', 'Percentage', 'Date'].map((h, i) => (
                      <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider"
                        style={{ color: T.dim }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedResults.map((result, index) => {
                    const s = scoreStyle(result.percentage);
                    return (
                      <tr key={result?._id || `row-${index}`}
                        className="border-b transition-colors"
                        style={{ borderColor: T.border, background: 'transparent' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>

                        {/* Student */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                              style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
                              {result.userName?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                              {result.userName}
                            </span>
                          </div>
                        </td>

                        {/* Quiz title */}
                        <td className="px-4 py-3.5">
                          <span className="text-sm truncate max-w-[180px] block" style={{ color: T.muted }}>
                            {result.quizTitle}
                          </span>
                        </td>

                        {/* Score */}
                        <td className="px-4 py-3.5">
                          <span className="text-sm font-semibold text-white">
                            {result.score}<span style={{ color: T.dim }}>/{result.totalMarks}</span>
                          </span>
                        </td>

                        {/* Percentage badge */}
                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border"
                            style={{ background: s.bg, borderColor: s.border, color: s.color }}>
                            {result.percentage}%
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3.5">
                          <span className="text-xs" style={{ color: T.dim }}>
                            {new Date(result.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3.5 border-t" style={{ borderColor: T.border }}>
              <p className="text-xs" style={{ color: T.dim }}>
                {(currentPage - 1) * resultsPerPage + 1}–{Math.min(currentPage * resultsPerPage, filteredResults.length)} of {filteredResults.length}
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: T.card, borderColor: T.border, color: T.muted }}
                  onMouseEnter={e => !e.currentTarget.disabled && ((e.currentTarget as HTMLElement).style.borderColor = T.accentBorder)}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = T.border}>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-2 rounded-xl border text-xs font-medium"
                  style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
                  {currentPage} / {totalPages}
                </span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: T.card, borderColor: T.border, color: T.muted }}
                  onMouseEnter={e => !e.currentTarget.disabled && ((e.currentTarget as HTMLElement).style.borderColor = T.accentBorder)}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = T.border}>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}