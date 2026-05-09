



// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Toaster } from 'react-hot-toast';
// import {
//   PlusCircle,
//   BookOpen,
//   Users,
//   BarChart3,
//   LogOut,
//   Edit3,
//   Trash2,
//   Clock,
//   Star,
//   ChevronRight,
//   TrendingUp,
//   Award,
//   Eye,
//   MoreVertical,
//   Search,
//   Filter,
//   Globe,
//   Lock,
//   CheckCircle,
//   AlertCircle,
//   GraduationCap,
//   Layers,
//   Target,
//   Link2,
//   Zap,
//   ArrowUpRight,
//   FileText,
//   X
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// interface Quiz {
//   id: string;
//   title: string;
//   description: string;
//   duration: number;
//   totalMarks: number;
//   questions: any[];
//   createdAt: string;
//   visibility: 'public' | 'private' | 'assigned';
//   assignedTo?: string[];
//   attempts?: number;
// }

// interface Result {
//   id: string;
//   quizId: string;
//   quizTitle: string;
//   studentName: string;
//   score: number;
//   totalMarks: number;
//   percentage: number;
//   submittedAt: string;
// }

// export default function TeacherDashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [results, setResults] = useState<Result[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterVisibility, setFilterVisibility] = useState<'all' | 'public' | 'assigned'>('all');
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//   const [deleteModal, setDeleteModal] = useState<{ open: boolean; quiz: Quiz | null }>({ open: false, quiz: null });
//   const [deleting, setDeleting] = useState(false);
//   const [activeTab, setActiveTab] = useState<'quizzes' | 'results'>('quizzes');

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
//     if (!token || !storedUser) { router.push('/login'); return; }
//     const userData = JSON.parse(storedUser);
//     if (userData.role !== 'teacher') { router.push('/login'); return; }
//     setUser(userData);
//     fetchData(userData.id);
//   }, [router]);

//   const fetchData = async (teacherId: string) => {
//     try {
//       const [quizzesRes, resultsRes] = await Promise.all([
//         fetch(`/api/quizzes/teacher/${teacherId}`),
//         fetch(`/api/results/teacher/${teacherId}`)
//       ]);
//       const quizzesData = await quizzesRes.json();
//       const resultsData = await resultsRes.json();
//       if (quizzesData.success) setQuizzes(quizzesData.data || []);
//       if (resultsData.success) setResults(resultsData.data || []);
//     } catch {
//       showToast.error('Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteModal.quiz) return;
//     setDeleting(true);
//     try {
//       const res = await fetch(`/api/quizzes/${deleteModal.quiz.id}`, { method: 'DELETE' });
//       const data = await res.json();
//       if (data.success) {
//         setQuizzes(prev => prev.filter(q => q.id !== deleteModal.quiz!.id));
//         showToast.success('Quiz deleted');
//         setDeleteModal({ open: false, quiz: null });
//       } else {
//         showToast.error(data.error || 'Failed to delete');
//       }
//     } catch {
//       showToast.error('Network error');
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   const formatDate = (d: string) => {
//     const date = new Date(d);
//     const diff = Math.floor((Date.now() - date.getTime()) / 86400000);
//     if (diff === 0) return 'Today';
//     if (diff === 1) return 'Yesterday';
//     if (diff < 7) return `${diff}d ago`;
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//   };

//   // Filtered quizzes
//   const filteredQuizzes = quizzes.filter(q => {
//     const matchSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchFilter = filterVisibility === 'all' ? true : q.visibility === filterVisibility;
//     return matchSearch && matchFilter;
//   });

//   // Stats
//   const totalStudents = new Set(results.map(r => r.studentName)).size;
//   const avgScore = results.length
//     ? Math.round(results.reduce((a, r) => a + r.percentage, 0) / results.length)
//     : 0;
//   const totalAttempts = results.length;
//   const recentResults = [...results]
//     .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
//     .slice(0, 8);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#080810] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.18)' }}>
//             <GraduationCap className="w-6 h-6 text-white animate-pulse" />
//           </div>
//           <div className="flex gap-1.5">
//             {[0, 1, 2].map(i => (
//               <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-bounce"
//                 style={{ animationDelay: `${i * 0.15}s` }} />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#080810] text-white" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');`}</style>
//       <Toaster position="top-right" />

//       {/* Ambient Background */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)' }} />
//         <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)' }} />
//         <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
//       </div>

//       {/* Navbar */}
//       <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#080810]/85 backdrop-blur-xl">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
//               <span className="text-white/80 font-bold text-sm">F</span>
//             </div>
//             <div className="hidden sm:block">
//               <span className="font-semibold text-white/90 text-sm">Ficer</span>
//               <span className="ml-2 text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">Teacher</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <Link href="/teacher/create-quiz">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)' }}
//               >
//                 <PlusCircle className="w-4 h-4" />
//                 <span className="hidden sm:block">New Quiz</span>
//               </motion.button>
//             </Link>

//             <Link href="/profile">
//               <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.06] transition-all cursor-pointer">
//                 <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
//                   {user?.name?.charAt(0)?.toUpperCase() || 'T'}
//                 </div>
//                 <span className="text-xs text-white/60 hidden sm:block max-w-[100px] truncate">{user?.name}</span>
//               </div>
//             </Link>

//             <button
//               onClick={handleLogout}
//               className="p-2 rounded-xl text-white/30 hover:text-red-400/70 hover:bg-red-500/5 transition-all"
//             >
//               <LogOut className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

//         {/* Page Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
//         >
//           <div>
//             <p className="text-white/30 text-sm mb-1">Welcome back 👋</p>
//             <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
//               {user?.name?.split(' ')[0]}<span className="text-emerald-400">.</span>
//             </h1>
//             <p className="text-white/30 text-sm mt-2">
//               {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''} · {totalAttempts} total attempts
//             </p>
//           </div>

//           <Link href="/teacher/create-quiz">
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-medium text-sm transition-all cursor-pointer w-fit" style={{ background: '#fff', color: '#080810' }}
//             >
//               <PlusCircle className="w-4 h-4" />
//               Create New Quiz
//               <ArrowUpRight className="w-3.5 h-3.5" />
//             </motion.div>
//           </Link>
//         </motion.div>

//         {/* Stats Cards */}
//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.08 }}
//           className="grid grid-cols-2 lg:grid-cols-4 gap-3"
//         >
//           {[
//             {
//               label: 'Total Quizzes', value: quizzes.length, icon: Layers,
//               color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20',
//               sub: `${quizzes.filter(q => q.visibility === 'public').length} public`
//             },
//             {
//               label: 'Total Attempts', value: totalAttempts, icon: Target,
//               color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20',
//               sub: 'across all quizzes'
//             },
//             {
//               label: 'Avg Score', value: `${avgScore}%`, icon: TrendingUp,
//               color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20',
//               sub: avgScore >= 70 ? 'students doing well' : 'needs attention'
//             },
//             {
//               label: 'Students', value: totalStudents, icon: Users,
//               color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20',
//               sub: 'have attempted'
//             },
//           ].map((stat, i) => (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 + i * 0.05 }}
//               whileHover={{ y: -2 }}
//               className={`bg-white/[0.02] border ${stat.border} rounded-2xl p-4 hover:bg-white/[0.04] transition-all`}
//             >
//               <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
//                 <stat.icon className={`w-4 h-4 ${stat.color}`} />
//               </div>
//               <p className="text-2xl font-bold text-white">{stat.value}</p>
//               <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
//               <p className="text-[10px] text-white/20 mt-1">{stat.sub}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-6">

//           {/* Left: Quizzes + Results tabs */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.18 }}
//             className="lg:col-span-2 space-y-4"
//           >
//             {/* Tab Bar */}
//             <div className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-1.5 w-fit">
//               {(['quizzes', 'results'] as const).map(tab => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
//                     activeTab === tab
//                       ? 'border'
//                       : 'text-white/30 hover:text-white/60'
//                   }`}
//                 >
//                   {tab === 'quizzes' ? `Quizzes (${quizzes.length})` : `Results (${results.length})`}
//                 </button>
//               ))}
//             </div>

//             {/* Quizzes Tab */}
//             {activeTab === 'quizzes' && (
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//                 {/* Toolbar */}
//                 <div className="p-4 border-b border-white/[0.05] flex flex-col sm:flex-row gap-3">
//                   {/* Search */}
//                   <div className="relative flex-1">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
//                     <input
//                       type="text"
//                       value={searchQuery}
//                       onChange={e => setSearchQuery(e.target.value)}
//                       placeholder="Search quizzes..."
//                       className="w-full pl-9 pr-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/40"
//                     />
//                     {searchQuery && (
//                       <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
//                         <X className="w-3.5 h-3.5" />
//                       </button>
//                     )}
//                   </div>
//                   {/* Filter */}
//                   <div className="flex items-center gap-1 bg-white/[0.02] rounded-xl p-1 shrink-0">
//                     {(['all', 'public', 'assigned'] as const).map(f => (
//                       <button
//                         key={f}
//                         onClick={() => setFilterVisibility(f)}
//                         className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
//                           filterVisibility === f
//                             ? 'bg-white/[0.08] text-white'
//                             : 'text-white/30 hover:text-white/60'
//                         }`}
//                       >
//                         {f}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Quiz List */}
//                 {filteredQuizzes.length === 0 ? (
//                   <div className="p-12 text-center">
//                     <div className="w-14 h-14 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <BookOpen className="w-7 h-7 text-white/15" />
//                     </div>
//                     <p className="text-white/30 text-sm">
//                       {searchQuery ? 'No quizzes match your search' : 'No quizzes yet'}
//                     </p>
//                     {!searchQuery && (
//                       <Link href="/teacher/create-quiz">
//                         <button className="mt-4 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm hover:bg-emerald-500/20 transition-all">
//                           Create your first quiz
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="divide-y divide-white/[0.04]">
//                     {filteredQuizzes.map((quiz, i) => {
//                       const quizResults = results.filter(r => r.quizTitle === quiz.title);
//                       const quizAvg = quizResults.length
//                         ? Math.round(quizResults.reduce((a, r) => a + r.percentage, 0) / quizResults.length)
//                         : null;

//                       return (
//                         <motion.div
//                           key={quiz.id}
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: i * 0.04 }}
//                           className="p-4 hover:bg-white/[0.02] transition-colors group relative"
//                         >
//                           {/* ✅ FIX: Make entire card clickable */}
//                           <div 
//                             onClick={() => router.push(`/teacher/quizzes/${quiz.id}`)}
//                             className="cursor-pointer"
//                           >
//                             <div className="flex items-start gap-3">
//                               {/* Icon */}
//                               <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
//                                 quiz.visibility === 'assigned'
//                                   ? 'bg-amber-500/10 border border-amber-500/20'
//                                   : 'bg-emerald-500/8 border border-emerald-500/15'
//                               }`}>
//                                 {quiz.visibility === 'assigned'
//                                   ? <Lock className="w-4 h-4 text-amber-400/70" />
//                                   : <Globe className="w-4 h-4 text-emerald-400/70" />
//                                 }
//                               </div>

//                               <div className="flex-1 min-w-0">
//                                 <div className="flex items-start justify-between gap-2">
//                                   <div className="min-w-0">
//                                     <div className="flex flex-wrap items-center gap-2 mb-1">
//                                       <h3 className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors truncate">
//                                         {quiz.title}
//                                       </h3>
//                                       <span className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 ${
//                                         quiz.visibility === 'assigned'
//                                           ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
//                                           : 'bg-emerald-500/8 text-emerald-400 border-emerald-500/15'
//                                       }`}>
//                                         {quiz.visibility}
//                                       </span>
//                                     </div>
//                                     <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/25">
//                                       <span className="flex items-center gap-1">
//                                         <Clock className="w-3 h-3" /> {quiz.duration}m
//                                       </span>
//                                       <span className="flex items-center gap-1">
//                                         <FileText className="w-3 h-3" /> {quiz.questions?.length || 0} Qs
//                                       </span>
//                                       <span className="flex items-center gap-1">
//                                         <Star className="w-3 h-3" /> {quiz.totalMarks} marks
//                                       </span>
//                                       {quizResults.length > 0 && (
//                                         <span className="flex items-center gap-1">
//                                           <Users className="w-3 h-3" /> {quizResults.length} attempts
//                                         </span>
//                                       )}
//                                       {quizAvg !== null && (
//                                         <span className={`flex items-center gap-1 font-medium ${quizAvg >= 70 ? 'text-emerald-400/70' : 'text-amber-400/70'}`}>
//                                           <TrendingUp className="w-3 h-3" /> avg {quizAvg}%
//                                         </span>
//                                       )}
//                                       <span className="text-white/15">{formatDate(quiz.createdAt)}</span>
//                                     </div>
//                                   </div>

//                                   {/* Actions - Edit/Delete */}
//                                   <div className="flex items-center gap-1.5 shrink-0">
//                                     <Link href={`/teacher/quizzes/${quiz.id}`} onClick={e => e.stopPropagation()}>
//                                       <button className="p-2 rounded-lg text-white/25 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all opacity-0 group-hover:opacity-100" title="View & Generate Link">
//                                         <Link2 className="w-3.5 h-3.5" />
//                                       </button>
//                                     </Link>
//                                     <Link href={`/teacher/edit-quiz/${quiz.id}`} onClick={(e) => e.stopPropagation()}>
//                                       <button className="p-2 rounded-lg text-white/25 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all opacity-0 group-hover:opacity-100">
//                                         <Edit3 className="w-3.5 h-3.5" />
//                                       </button>
//                                     </Link>
//                                     <button
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         setDeleteModal({ open: true, quiz });
//                                       }}
//                                       className="p-2 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
//                                     >
//                                       <Trash2 className="w-3.5 h-3.5" />
//                                     </button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       );
//                     })}
//                   </div>
//                 )}

//                 {filteredQuizzes.length > 0 && (
//                   <div className="p-3 border-t border-white/[0.04] text-center">
//                     <p className="text-[11px] text-white/20">{filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'zes' : ''} shown</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Results Tab */}
//             {activeTab === 'results' && (
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//                 {results.length === 0 ? (
//                   <div className="p-12 text-center">
//                     <div className="w-14 h-14 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <BarChart3 className="w-7 h-7 text-white/15" />
//                     </div>
//                     <p className="text-white/30 text-sm">No results yet</p>
//                     <p className="text-white/15 text-xs mt-1">Results appear when students complete quizzes</p>
//                   </div>
//                 ) : (
//                   <>
//                     {/* Results Header */}
//                     <div className="p-4 border-b border-white/[0.05] flex items-center justify-between">
//                       <div>
//                         <p className="text-sm text-white/70 font-medium">Student Submissions</p>
//                         <p className="text-xs text-white/25 mt-0.5">{results.length} total submissions</p>
//                       </div>
//                       <Link href="/teacher/all-results">
//                         <button className="text-xs text-white/30 hover:text-emerald-400 flex items-center gap-1 transition-colors">
//                           View all <ChevronRight className="w-3 h-3" />
//                         </button>
//                       </Link>
//                     </div>

//                     <div className="divide-y divide-white/[0.04]">
//                       {recentResults.map((result, i) => (
//                         <motion.div
//                           key={result.id}
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: i * 0.04 }}
//                           className="p-4 hover:bg-white/[0.02] transition-colors"
//                         >
//                           <div className="flex items-center justify-between gap-3">
//                             <div className="flex items-center gap-3 min-w-0">
//                               <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
//                                 result.percentage >= 70
//                                   ? 'bg-emerald-500/10 text-emerald-400'
//                                   : result.percentage >= 40
//                                   ? 'bg-amber-500/10 text-amber-400'
//                                   : 'bg-red-500/10 text-red-400'
//                               }`}>
//                                 {result.studentName?.charAt(0)?.toUpperCase() || 'S'}
//                               </div>
//                               <div className="min-w-0">
//                                 <p className="text-sm text-white/80 font-medium truncate">{result.studentName}</p>
//                                 <p className="text-xs text-white/30 truncate">{result.quizTitle}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-3 shrink-0">
//                               <div className="text-right">
//                                 <p className={`text-sm font-bold ${
//                                   result.percentage >= 70 ? 'text-emerald-400' :
//                                   result.percentage >= 40 ? 'text-amber-400' : 'text-red-400'
//                                 }`}>
//                                   {result.percentage}%
//                                 </p>
//                                 <p className="text-[10px] text-white/20">{result.score}/{result.totalMarks}</p>
//                               </div>
//                               <p className="text-[10px] text-white/20 hidden sm:block w-14 text-right">
//                                 {formatDate(result.submittedAt)}
//                               </p>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}
//           </motion.div>

//           {/* Right Sidebar */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.25 }}
//             className="space-y-4"
//           >
//             {/* Performance Overview */}
//             <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
//               <h3 className="text-sm font-semibold text-white mb-4">Performance Overview</h3>

//               {results.length === 0 ? (
//                 <div className="text-center py-6">
//                   <Award className="w-8 h-8 text-white/15 mx-auto mb-3" />
//                   <p className="text-xs text-white/25">No data yet</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {/* Avg score bar */}
//                   <div>
//                     <div className="flex justify-between text-xs mb-2">
//                       <span className="text-white/40">Class average</span>
//                       <span className={`font-bold ${avgScore >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
//                         {avgScore}%
//                       </span>
//                     </div>
//                     <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
//                       <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: `${avgScore}%` }}
//                         transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
//                         className={`h-full rounded-full ${avgScore >= 70
//                           ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
//                           : 'bg-gradient-to-r from-amber-500 to-orange-500'
//                         }`}
//                       />
//                     </div>
//                   </div>

//                   {/* Grade breakdown */}
//                   {[
//                     { label: 'Excellent (≥90%)', count: results.filter(r => r.percentage >= 90).length, color: 'bg-emerald-400' },
//                     { label: 'Good (70–89%)', count: results.filter(r => r.percentage >= 70 && r.percentage < 90).length, color: 'bg-sky-400' },
//                     { label: 'Average (40–69%)', count: results.filter(r => r.percentage >= 40 && r.percentage < 70).length, color: 'bg-amber-400' },
//                     { label: 'Below (< 40%)', count: results.filter(r => r.percentage < 40).length, color: 'bg-red-400' },
//                   ].map(g => (
//                     <div key={g.label} className="flex items-center gap-2">
//                       <div className={`w-2 h-2 rounded-full ${g.color} shrink-0`} />
//                       <div className="flex-1 flex items-center justify-between">
//                         <span className="text-xs text-white/35">{g.label}</span>
//                         <span className="text-xs font-medium text-white/60">{g.count}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Top Quizzes by attempts */}
//             {quizzes.length > 0 && (
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
//                 <h3 className="text-sm font-semibold text-white mb-4">Quiz Activity</h3>
//                 <div className="space-y-3">
//                   {quizzes
//                     .map(q => ({ ...q, cnt: results.filter(r => r.quizTitle === q.title).length }))
//                     .sort((a, b) => b.cnt - a.cnt)
//                     .slice(0, 4)
//                     .map((quiz, i) => (
//                       <div key={quiz.id} className="flex items-center gap-3">
//                         <div className="w-5 h-5 rounded-md bg-white/[0.04] flex items-center justify-center shrink-0">
//                           <span className="text-[9px] text-white/30 font-bold">{i + 1}</span>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-xs text-white/60 truncate">{quiz.title}</p>
//                           <div className="flex items-center gap-1 mt-0.5">
//                             <div className="flex-1 h-1 bg-white/[0.04] rounded-full overflow-hidden">
//                               <motion.div
//                                 initial={{ width: 0 }}
//                                 animate={{ width: `${quizzes.length > 0 ? (quiz.cnt / Math.max(...quizzes.map(q => results.filter(r => r.quizTitle === q.title).length), 1)) * 100 : 0}%` }}
//                                 transition={{ delay: 0.6 + i * 0.1 }}
//                                 className="h-full bg-emerald-500/50 rounded-full"
//                               />
//                             </div>
//                             <span className="text-[10px] text-white/25 w-8 text-right">{quiz.cnt}</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}

//             {/* Quick Actions */}
//             <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 space-y-1">
//               <p className="text-xs text-white/25 mb-3 px-1">Quick Actions</p>
//               {[
//                 { label: 'Create Quiz', href: '/teacher/create-quiz', icon: PlusCircle, color: 'text-emerald-400' },
//                 { label: 'All Results', href: '/teacher/all-results', icon: BarChart3, color: 'text-sky-400' },
//                 { label: 'Students', href: '/teacher/students', icon: Users, color: 'text-violet-400' },
//               ].map(link => (
//                 <Link key={link.href} href={link.href}>
//                   <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group cursor-pointer">
//                     <div className="flex items-center gap-3">
//                       <link.icon className={`w-4 h-4 ${link.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
//                       <span className="text-sm text-white/45 group-hover:text-white/80 transition-colors">{link.label}</span>
//                     </div>
//                     <ChevronRight className="w-3.5 h-3.5 text-white/15 group-hover:text-white/35 transition-colors" />
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {deleteModal.open && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//             onClick={() => setDeleteModal({ open: false, quiz: null })}
//           >
//             <motion.div
//               initial={{ scale: 0.92, opacity: 0, y: 10 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.92, opacity: 0 }}
//               onClick={e => e.stopPropagation()}
//               className="bg-[#0f0f12] border border-white/[0.08] rounded-2xl p-6 w-full max-w-sm shadow-2xl"
//             >
//               <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <Trash2 className="w-5 h-5 text-red-400" />
//               </div>
//               <h3 className="text-base font-semibold text-white text-center mb-2">Delete Quiz?</h3>
//               <p className="text-sm text-white/40 text-center mb-6">
//                 "<span className="text-white/60">{deleteModal.quiz?.title}</span>" will be permanently deleted.
//               </p>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setDeleteModal({ open: false, quiz: null })}
//                   className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/60 text-sm hover:bg-white/[0.08] transition-all"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={deleting}
//                   className="flex-1 px-4 py-2.5 bg-red-500/15 border border-red-500/25 rounded-xl text-red-400 text-sm hover:bg-red-500/25 transition-all disabled:opacity-50 font-medium"
//                 >
//                   {deleting ? 'Deleting...' : 'Delete'}
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }












'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import {
  PlusCircle,
  BookOpen,
  Users,
  BarChart3,
  LogOut,
  Edit3,
  Trash2,
  Clock,
  Star,
  ChevronRight,
  TrendingUp,
  Award,
  Eye,
  Search,
  Globe,
  Lock,
  GraduationCap,
  Layers,
  Target,
  Link2,
  Zap,
  ArrowUpRight,
  FileText,
  X
} from 'lucide-react';
import { showToast } from '@/lib/toast';

// ── Design tokens — consistent with homepage & student dashboard ──
const T = {
  bg: '#080810',
  card: 'rgba(255,255,255,0.025)',
  cardHover: 'rgba(255,255,255,0.04)',
  border: 'rgba(255,255,255,0.07)',
  borderHover: 'rgba(255,255,255,0.14)',
  accent: '#34d399',
  accentBg: 'rgba(52,211,153,0.07)',
  accentBorder: 'rgba(52,211,153,0.18)',
  muted: 'rgba(255,255,255,0.4)',
  dim: 'rgba(255,255,255,0.22)',
  navBg: 'rgba(8,8,16,0.85)',
};

interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  questions: any[];
  createdAt: string;
  visibility: 'public' | 'private' | 'assigned';
  assignedTo?: string[];
  attempts?: number;
}

interface Result {
  id: string;
  quizId: string;
  quizTitle: string;
  studentName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  submittedAt: string;
}

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisibility, setFilterVisibility] = useState<'all' | 'public' | 'assigned'>('all');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; quiz: Quiz | null }>({ open: false, quiz: null });
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<'quizzes' | 'results'>('quizzes');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token || !storedUser) { router.push('/login'); return; }
    const userData = JSON.parse(storedUser);
    if (userData.role !== 'teacher') { router.push('/login'); return; }
    setUser(userData);
    fetchData(userData.id);
  }, [router]);

  const fetchData = async (teacherId: string) => {
    try {
      const [quizzesRes, resultsRes] = await Promise.all([
        fetch(`/api/quizzes/teacher/${teacherId}`),
        fetch(`/api/results/teacher/${teacherId}`)
      ]);
      const quizzesData = await quizzesRes.json();
      const resultsData = await resultsRes.json();
      if (quizzesData.success) setQuizzes(quizzesData.data || []);
      if (resultsData.success) setResults(resultsData.data || []);
    } catch {
      showToast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.quiz) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/quizzes/${deleteModal.quiz.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setQuizzes(prev => prev.filter(q => q.id !== deleteModal.quiz!.id));
        showToast.success('Quiz deleted');
        setDeleteModal({ open: false, quiz: null });
      } else {
        showToast.error(data.error || 'Failed to delete');
      }
    } catch {
      showToast.error('Network error');
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    const diff = Math.floor((Date.now() - date.getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filteredQuizzes = quizzes.filter(q => {
    const matchSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = filterVisibility === 'all' ? true : q.visibility === filterVisibility;
    return matchSearch && matchFilter;
  });

  const totalStudents = new Set(results.map(r => r.studentName)).size;
  const avgScore = results.length
    ? Math.round(results.reduce((a, r) => a + r.percentage, 0) / results.length)
    : 0;
  const totalAttempts = results.length;
  const recentResults = [...results]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 8);

  // ── Loading ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: T.bg }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
            <span className="text-sm font-bold" style={{ color: T.accent }}>Q</span>
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

  const statsCards = [
    {
      label: 'Total Quizzes', value: quizzes.length,
      sub: `${quizzes.filter(q => q.visibility === 'public').length} public`,
      icon: Layers, color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)'
    },
    {
      label: 'Total Attempts', value: totalAttempts,
      sub: 'across all quizzes',
      icon: Target, color: T.accent, bg: T.accentBg, border: T.accentBorder
    },
    {
      label: 'Avg Score', value: `${avgScore}%`,
      sub: avgScore >= 70 ? 'class doing well' : 'needs attention',
      icon: TrendingUp, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)'
    },
    {
      label: 'Students', value: totalStudents,
      sub: 'have attempted',
      icon: Users, color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)'
    },
  ];

  return (
    <div className="min-h-screen text-white" style={{ background: T.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
      <Toaster position="top-right" />

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)' }} />
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ background: T.navBg, borderColor: T.border }}>
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

          {/* QuizForge logo + teacher badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
              <span className="font-bold text-xs" style={{ color: T.accent }}>Q</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-semibold text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>QuizForge</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
                Teacher
              </span>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link href="/teacher/create-quiz">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all border"
                style={{ background: T.card, borderColor: T.border, color: T.muted }}>
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:block">New Quiz</span>
              </motion.button>
            </Link>

            <Link href="/profile">
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer border"
                style={{ background: T.card, borderColor: T.border }}>
                <div className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                  style={{ background: 'rgba(52,211,153,0.2)', border: '1px solid rgba(52,211,153,0.3)' }}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'T'}
                </div>
                <span className="text-xs hidden sm:block max-w-[90px] truncate" style={{ color: T.muted }}>
                  {user?.name}
                </span>
              </div>
            </Link>

            <button onClick={handleLogout}
              className="p-2 rounded-xl transition-all hover:bg-red-500/[0.08]" style={{ color: T.muted }}>
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 pb-12 space-y-5">

        {/* Hero header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs mb-1" style={{ color: T.muted }}>Welcome back 👋</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'DM Serif Display', serif" }}>
              {user?.name?.split(' ')[0]}<span style={{ color: T.accent }}>.</span>
            </h1>
            <p className="text-xs mt-1.5" style={{ color: T.muted }}>
              {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''} · {totalAttempts} total attempts
            </p>
          </div>

          <Link href="/teacher/create-quiz">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-sm cursor-pointer w-fit transition-all"
              style={{ background: '#fff', color: '#080810' }}>
              <PlusCircle className="w-4 h-4" />
              Create New Quiz
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats grid */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {statsCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.05 }} whileHover={{ y: -2 }}
              className="rounded-2xl p-3.5 border transition-all duration-200"
              style={{ background: T.card, borderColor: s.border }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2.5" style={{ background: s.bg }}>
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white">{s.value}</p>
              <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: T.muted }}>{s.label}</p>
              <p className="text-[10px] mt-0.5" style={{ color: T.dim }}>{s.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main 2-col grid */}
        <div className="grid lg:grid-cols-3 gap-4">

          {/* ── Left: Tabs ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="lg:col-span-2 space-y-4">

            {/* Tab bar */}
            <div className="flex items-center rounded-xl p-1 w-fit border" style={{ background: T.card, borderColor: T.border }}>
              {(['quizzes', 'results'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-4 py-2 rounded-lg text-xs font-medium transition-all capitalize"
                  style={activeTab === tab
                    ? { background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accent }
                    : { color: 'rgba(255,255,255,0.3)' }}>
                  {tab === 'quizzes' ? `Quizzes (${quizzes.length})` : `Results (${results.length})`}
                </button>
              ))}
            </div>

            {/* ── Quizzes tab ── */}
            {activeTab === 'quizzes' && (
              <div className="rounded-2xl overflow-hidden border" style={{ background: T.card, borderColor: T.border }}>
                {/* Toolbar */}
                <div className="p-4 border-b flex flex-col sm:flex-row gap-3" style={{ borderColor: T.border }}>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.muted }} />
                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search quizzes..."
                      className="w-full pl-9 pr-8 py-2 rounded-xl text-sm text-white focus:outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}` }}
                      onFocus={e => e.target.style.borderColor = T.accentBorder}
                      onBlur={e => e.target.style.borderColor = T.border} />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: T.muted }}>
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-1 rounded-xl p-1 shrink-0"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                    {(['all', 'public', 'assigned'] as const).map(f => (
                      <button key={f} onClick={() => setFilterVisibility(f)}
                        className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all capitalize"
                        style={filterVisibility === f
                          ? { background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accent }
                          : { color: 'rgba(255,255,255,0.3)' }}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quiz list */}
                {filteredQuizzes.length === 0 ? (
                  <div className="p-10 text-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                      style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <BookOpen className="w-6 h-6" style={{ color: T.muted }} />
                    </div>
                    <p className="text-sm mb-3" style={{ color: T.muted }}>
                      {searchQuery ? 'No quizzes match your search' : 'No quizzes yet'}
                    </p>
                    {!searchQuery && (
                      <Link href="/teacher/create-quiz">
                        <button className="px-4 py-2 rounded-xl text-xs font-medium transition-all border"
                          style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
                          Create your first quiz
                        </button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="divide-y" style={{ borderColor: T.border }}>
                    {filteredQuizzes.map((quiz, i) => {
                      const quizResults = results.filter(r => r.quizTitle === quiz.title);
                      const quizAvg = quizResults.length
                        ? Math.round(quizResults.reduce((a, r) => a + r.percentage, 0) / quizResults.length)
                        : null;

                      return (
                        <motion.div key={quiz.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className="p-4 group transition-colors"
                          style={{ background: 'transparent' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <div onClick={() => router.push(`/teacher/quizzes/${quiz.id}`)} className="cursor-pointer">
                            <div className="flex items-start gap-3">
                              {/* Icon */}
                              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border"
                                style={quiz.visibility === 'assigned'
                                  ? { background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.2)' }
                                  : { background: T.accentBg, borderColor: T.accentBorder }}>
                                {quiz.visibility === 'assigned'
                                  ? <Lock className="w-4 h-4" style={{ color: '#f59e0b' }} />
                                  : <Globe className="w-4 h-4" style={{ color: T.accent }} />}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                      <h3 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors truncate">
                                        {quiz.title}
                                      </h3>
                                      <span className="text-[10px] px-2 py-0.5 rounded-full border shrink-0 font-medium"
                                        style={quiz.visibility === 'assigned'
                                          ? { background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.2)', color: '#f59e0b' }
                                          : { background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
                                        {quiz.visibility}
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 text-[11px]" style={{ color: T.dim }}>
                                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {quiz.duration}m</span>
                                      <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {quiz.questions?.length || 0} Qs</span>
                                      <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {quiz.totalMarks} marks</span>
                                      {quizResults.length > 0 && (
                                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {quizResults.length} attempts</span>
                                      )}
                                      {quizAvg !== null && (
                                        <span className="flex items-center gap-1 font-medium"
                                          style={{ color: quizAvg >= 70 ? T.accent : '#f59e0b' }}>
                                          <TrendingUp className="w-3 h-3" /> avg {quizAvg}%
                                        </span>
                                      )}
                                      <span style={{ color: 'rgba(255,255,255,0.15)' }}>{formatDate(quiz.createdAt)}</span>
                                    </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex items-center gap-1 shrink-0">
                                    <Link href={`/teacher/quizzes/${quiz.id}`} onClick={e => e.stopPropagation()}>
                                      <button
                                        className="p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        style={{ color: T.dim }}
                                        onMouseEnter={e => { e.currentTarget.style.background = T.accentBg; (e.currentTarget as HTMLElement).style.color = T.accent; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = T.dim; }}
                                        title="View & Generate Link">
                                        <Link2 className="w-3.5 h-3.5" />
                                      </button>
                                    </Link>
                                    <Link href={`/teacher/edit-quiz/${quiz.id}`} onClick={e => e.stopPropagation()}>
                                      <button
                                        className="p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        style={{ color: T.dim }}
                                        onMouseEnter={e => { e.currentTarget.style.background = T.accentBg; (e.currentTarget as HTMLElement).style.color = T.accent; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = T.dim; }}>
                                        <Edit3 className="w-3.5 h-3.5" />
                                      </button>
                                    </Link>
                                    <button
                                      onClick={e => { e.stopPropagation(); setDeleteModal({ open: true, quiz }); }}
                                      className="p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                      style={{ color: T.dim }}
                                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.08)'; (e.currentTarget as HTMLElement).style.color = '#f87171'; }}
                                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = T.dim; }}>
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {filteredQuizzes.length > 0 && (
                  <div className="p-3 border-t text-center" style={{ borderColor: T.border }}>
                    <p className="text-[11px]" style={{ color: T.dim }}>
                      {filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'zes' : ''} shown
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ── Results tab ── */}
            {activeTab === 'results' && (
              <div className="rounded-2xl overflow-hidden border" style={{ background: T.card, borderColor: T.border }}>
                {results.length === 0 ? (
                  <div className="p-10 text-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                      style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <BarChart3 className="w-6 h-6" style={{ color: T.muted }} />
                    </div>
                    <p className="text-sm" style={{ color: T.muted }}>No results yet</p>
                    <p className="text-xs mt-1" style={{ color: T.dim }}>Results appear when students complete quizzes</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between px-4 py-3.5 border-b" style={{ borderColor: T.border }}>
                      <div>
                        <h3 className="text-sm font-semibold text-white">Student Submissions</h3>
                        <p className="text-xs mt-0.5" style={{ color: T.muted }}>{results.length} total submissions</p>
                      </div>
                      <Link href="/teacher/all-results"
                        className="text-xs flex items-center gap-1 transition-colors"
                        style={{ color: T.muted }}
                        onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
                        onMouseLeave={e => (e.currentTarget.style.color = T.muted)}>
                        View all <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="divide-y" style={{ borderColor: T.border }}>
                      {recentResults.map((result, i) => (
                        <motion.div key={result.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className="px-4 py-3.5 transition-colors"
                          style={{ background: 'transparent' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Avatar */}
                              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                                style={result.percentage >= 70
                                  ? { background: 'rgba(52,211,153,0.1)', color: T.accent }
                                  : result.percentage >= 40
                                  ? { background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }
                                  : { background: 'rgba(248,113,113,0.1)', color: '#f87171' }}>
                                {result.studentName?.charAt(0)?.toUpperCase() || 'S'}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate" style={{ color: 'rgba(255,255,255,0.8)' }}>
                                  {result.studentName}
                                </p>
                                <p className="text-xs truncate" style={{ color: T.dim }}>{result.quizTitle}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-right">
                                <p className="text-sm font-bold"
                                  style={{ color: result.percentage >= 70 ? T.accent : result.percentage >= 40 ? '#f59e0b' : '#f87171' }}>
                                  {result.percentage}%
                                </p>
                                <p className="text-[10px]" style={{ color: T.dim }}>{result.score}/{result.totalMarks}</p>
                              </div>
                              <p className="text-[10px] hidden sm:block w-14 text-right" style={{ color: 'rgba(255,255,255,0.15)' }}>
                                {formatDate(result.submittedAt)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>

          {/* ── Right sidebar ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
            className="space-y-4">

            {/* Performance overview */}
            <div className="rounded-2xl p-4 border" style={{ background: T.card, borderColor: T.border }}>
              <h3 className="text-sm font-semibold text-white mb-4">Performance Overview</h3>
              {results.length === 0 ? (
                <div className="text-center py-6">
                  <Award className="w-7 h-7 mx-auto mb-2" style={{ color: T.muted }} />
                  <p className="text-xs" style={{ color: T.muted }}>No data yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span style={{ color: T.muted }}>Class average</span>
                      <span className="font-bold" style={{ color: avgScore >= 70 ? T.accent : '#f59e0b' }}>{avgScore}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${avgScore}%` }}
                        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: avgScore >= 70 ? T.accent : '#f59e0b', opacity: 0.8 }} />
                    </div>
                  </div>

                  {/* Grade breakdown */}
                  <div className="space-y-2.5">
                    {[
                      { label: 'Excellent (≥90%)', count: results.filter(r => r.percentage >= 90).length, color: T.accent },
                      { label: 'Good (70–89%)', count: results.filter(r => r.percentage >= 70 && r.percentage < 90).length, color: '#38bdf8' },
                      { label: 'Average (40–69%)', count: results.filter(r => r.percentage >= 40 && r.percentage < 70).length, color: '#f59e0b' },
                      { label: 'Below (< 40%)', count: results.filter(r => r.percentage < 40).length, color: '#f87171' },
                    ].map(g => (
                      <div key={g.label} className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: g.color, opacity: 0.7 }} />
                        <div className="flex-1 flex items-center justify-between">
                          <span className="text-xs" style={{ color: T.muted }}>{g.label}</span>
                          <span className="text-xs font-medium text-white">{g.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quiz activity */}
            {quizzes.length > 0 && (
              <div className="rounded-2xl p-4 border" style={{ background: T.card, borderColor: T.border }}>
                <h3 className="text-sm font-semibold text-white mb-4">Quiz Activity</h3>
                <div className="space-y-3">
                  {quizzes
                    .map(q => ({ ...q, cnt: results.filter(r => r.quizTitle === q.title).length }))
                    .sort((a, b) => b.cnt - a.cnt)
                    .slice(0, 4)
                    .map((quiz, i) => {
                      const max = Math.max(...quizzes.map(q => results.filter(r => r.quizTitle === q.title).length), 1);
                      return (
                        <div key={quiz.id} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                            style={{ background: 'rgba(255,255,255,0.04)' }}>
                            <span className="text-[9px] font-bold" style={{ color: T.dim }}>{i + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs truncate mb-1" style={{ color: T.muted }}>{quiz.title}</p>
                            <div className="flex items-center gap-1.5">
                              <div className="flex-1 h-1.5 rounded-full overflow-hidden"
                                style={{ background: 'rgba(255,255,255,0.04)' }}>
                                <motion.div initial={{ width: 0 }}
                                  animate={{ width: `${(quiz.cnt / max) * 100}%` }}
                                  transition={{ delay: 0.6 + i * 0.1 }}
                                  className="h-full rounded-full"
                                  style={{ background: T.accent, opacity: 0.6 }} />
                              </div>
                              <span className="text-[10px] w-6 text-right" style={{ color: T.dim }}>{quiz.cnt}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Quick actions */}
            <div className="rounded-2xl p-3.5 border" style={{ background: T.card, borderColor: T.border }}>
              <p className="text-xs mb-3 px-1 font-medium" style={{ color: T.muted }}>Quick Actions</p>
              {[
                { label: 'Create Quiz', href: '/teacher/create-quiz', icon: PlusCircle, color: T.accent },
                { label: 'All Results', href: '/teacher/all-results', icon: BarChart3, color: '#38bdf8' },
                { label: 'Students', href: '/teacher/students', icon: Users, color: '#a78bfa' },
              ].map(link => (
                <Link key={link.href} href={link.href}>
                  <div className="flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors group cursor-pointer"
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div className="flex items-center gap-3">
                      <link.icon className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{ color: link.color }} />
                      <span className="text-sm transition-colors" style={{ color: T.muted }}>{link.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: T.muted }} />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Delete modal ── */}
      <AnimatePresence>
        {deleteModal.open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setDeleteModal({ open: false, quiz: null })}>
            <motion.div initial={{ scale: 0.92, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl p-6 border shadow-2xl"
              style={{ background: '#0e0e1a', borderColor: T.border }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}>
                <Trash2 className="w-5 h-5" style={{ color: '#f87171' }} />
              </div>
              <h3 className="text-base font-semibold text-white text-center mb-2">Delete Quiz?</h3>
              <p className="text-sm text-center mb-6" style={{ color: T.muted }}>
                "<span className="text-white">{deleteModal.quiz?.title}</span>" will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteModal({ open: false, quiz: null })}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm transition-all border"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: T.border, color: T.muted }}>
                  Cancel
                </button>
                <button onClick={handleDelete} disabled={deleting}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border disabled:opacity-50"
                  style={{ background: 'rgba(248,113,113,0.1)', borderColor: 'rgba(248,113,113,0.25)', color: '#f87171' }}>
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}