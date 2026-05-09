



// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   ArrowLeft,
//   Edit,
//   Trash2,
//   Clock,
//   Users,
//   BarChart3,
//   Copy,
//   Check,
//   Link2,
//   Settings,
//   Eye,
//   Calendar,
//   Sparkles,
//   ChevronRight,
//   AlertCircle,
//   Award,
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { showToast } from '@/lib/toast';

// interface Question {
//   id: string;
//   text: string;
//   options: string[];
//   correctOption: number;
//   marks: number;
// }

// interface Quiz {
//   id: string;
//   title: string;
//   description: string;
//   duration: number;
//   totalMarks: number;
//   questions: Question[];
//   createdBy: string;
//   createdByName: string;
//   createdAt: string;
//   visibility?: string;
//   assignedTo?: string[];
//   shareableLinks?: {
//     publicId: string;
//     isPublic: boolean;
//     allowAnonymous: boolean;
//     expiresAt?: string;
//     maxAttempts?: number;
//     currentAttempts?: number;
//     createdAt: string;
//   };
// }

// export default function TeacherQuizDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);

//   const [showShareSettings, setShowShareSettings] = useState(false);
//   const [shareUrl, setShareUrl] = useState('');
//   const [copied, setCopied] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [linkSettings, setLinkSettings] = useState({
//     isPublic: false,
//     allowAnonymous: true,
//     expiresAt: '',
//     maxAttempts: '',
//   });

//   useEffect(() => {
//     fetchQuiz();
//   }, [params.id]);

//   const fetchQuiz = async () => {
//     try {
//       const res = await fetch(`/api/quizzes/${params.id}`);
//       const data = await res.json();
//       if (data.success) {
//         setQuiz(data.data);
//         if (data.data.shareableLinks?.publicId) {
//           setShareUrl(`${window.location.origin}/quiz/shared/${data.data.shareableLinks.publicId}`);
//           setLinkSettings({
//             isPublic: data.data.shareableLinks.isPublic || false,
//             allowAnonymous: data.data.shareableLinks.allowAnonymous ?? true,
//             expiresAt: data.data.shareableLinks.expiresAt?.split('T')[0] || '',
//             maxAttempts: data.data.shareableLinks.maxAttempts?.toString() || '',
//           });
//         }
//       } else {
//         showToast.error('Failed to load quiz');
//       }
//     } catch {
//       showToast.error('Error loading quiz');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     setDeleting(true);
//     try {
//       const res = await fetch(`/api/quizzes/${params.id}`, { method: 'DELETE' });
//       if (res.ok) {
//         showToast.success('Quiz deleted successfully');
//         router.push('/teacher/dashboard');
//       } else {
//         showToast.error('Failed to delete quiz');
//       }
//     } catch {
//       showToast.error('Error deleting quiz');
//     } finally {
//       setDeleting(false);
//       setDeleteModal(false);
//     }
//   };

//   const generateShareLink = async () => {
//     setGenerating(true);
//     const toastId = showToast.loading('Generating link...');
//     try {
//       const res = await fetch('/api/quiz/share', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ quizId: params.id, settings: linkSettings }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setShareUrl(`${window.location.origin}/quiz/shared/${data.publicId}`);
//         toast.dismiss(toastId);
//         showToast.success('Link generated!');
//         fetchQuiz();
//       } else {
//         toast.dismiss(toastId);
//         showToast.error(data.error || 'Failed to generate link');
//       }
//     } catch {
//       toast.dismiss(toastId);
//       showToast.error('Network error');
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(shareUrl);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//     showToast.success('Copied to clipboard!');
//   };

//   const formatDate = (dateString: string) =>
//     new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#070709] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-12 h-12 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-5 h-5 text-emerald-400/60 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!quiz) {
//     return (
//       <div className="min-h-screen bg-[#070709] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/[0.05]">
//             <AlertCircle className="w-8 h-8 text-white/20" />
//           </div>
//           <p className="text-white/40 text-sm">Quiz not found</p>
//           <button onClick={() => router.back()} className="mt-4 text-sm text-emerald-400 hover:text-emerald-300">
//             Go back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#070709] text-white" style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}>

//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 right-1/4 w-[700px] h-[500px] bg-emerald-600/6 rounded-full blur-[130px]" />
//         <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-teal-600/5 rounded-full blur-[100px]" />
//         <div
//           className="absolute inset-0 opacity-[0.025]"
//           style={{
//             backgroundImage:
//               'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
//             backgroundSize: '60px 60px',
//           }}
//         />
//       </div>

//       <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
//         >
//           <div className="flex items-center gap-3">
//             <motion.button
//               whileHover={{ scale: 1.05, x: -2 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => router.back()}
//               className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white/40 hover:text-white/60 transition-all"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </motion.button>
//             <div>
//               <h1 className="text-xl sm:text-2xl font-light text-white">Quiz Details</h1>
//               <p className="text-xs text-white/30 mt-0.5">Manage and share this quiz</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 ml-10 sm:ml-0">
//             <Link href={`/teacher/edit-quiz/${quiz.id}`}>
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="flex items-center gap-2 px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 rounded-xl text-emerald-400 text-sm font-medium transition-all cursor-pointer"
//               >
//                 <Edit className="w-4 h-4" />
//                 Edit
//               </motion.div>
//             </Link>
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setDeleteModal(true)}
//               className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium transition-all"
//             >
//               <Trash2 className="w-4 h-4" />
//               Delete
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Quiz Info */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 mb-6"
//         >
//           <div className="flex flex-col sm:flex-row items-start gap-4">
//             <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-white/[0.05]">
//               <Sparkles className="w-5 h-5 text-emerald-400" />
//             </div>
//             <div className="flex-1">
//               <h2 className="text-xl font-light text-white mb-2">{quiz.title}</h2>
//               <p className="text-white/40 text-sm mb-4">{quiz.description}</p>
//               <div className="flex flex-wrap gap-4 text-xs text-white/30">
//                 <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {quiz.duration} min</span>
//                 <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5" /> {quiz.questions.length} questions</span>
//                 <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> {quiz.totalMarks} marks</span>
//                 <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(quiz.createdAt)}</span>
//               </div>
//               {quiz.visibility === 'assigned' && quiz.assignedTo && quiz.assignedTo.length > 0 && (
//                 <div className="mt-4 pt-4 border-t border-white/[0.05]">
//                   <p className="text-xs text-white/40 mb-2 flex items-center gap-1">
//                     <Users className="w-3 h-3" /> Assigned to {quiz.assignedTo.length} student(s)
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* Shareable Link Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.15 }}
//           className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 mb-6"
//         >
//           <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
//             <Link2 className="w-4 h-4 text-emerald-400" />
//             Shareable Link
//           </h3>

//           <div className="space-y-4">
//             <button
//               onClick={() => setShowShareSettings(!showShareSettings)}
//               className="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"
//             >
//               <Settings className="w-4 h-4" />
//               Link Settings
//               <ChevronRight className={`w-3 h-3 transition-transform ${showShareSettings ? 'rotate-90' : ''}`} />
//             </button>

//             <AnimatePresence>
//               {showShareSettings && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="p-4 bg-white/[0.02] rounded-xl space-y-3 border border-white/[0.05] overflow-hidden"
//                 >
//                   <label className="flex items-center justify-between cursor-pointer group">
//                     <span className="text-xs text-white/40 group-hover:text-white/60">Public link (no login required)</span>
//                     <input
//                       type="checkbox"
//                       checked={linkSettings.isPublic}
//                       onChange={(e) => setLinkSettings({ ...linkSettings, isPublic: e.target.checked })}
//                       className="w-4 h-4 accent-emerald-500"
//                     />
//                   </label>
//                   <label className="flex items-center justify-between cursor-pointer group">
//                     <span className="text-xs text-white/40 group-hover:text-white/60">Allow anonymous submissions</span>
//                     <input
//                       type="checkbox"
//                       checked={linkSettings.allowAnonymous}
//                       onChange={(e) => setLinkSettings({ ...linkSettings, allowAnonymous: e.target.checked })}
//                       className="w-4 h-4 accent-emerald-500"
//                     />
//                   </label>
//                   <div>
//                     <label className="block text-xs text-white/40 mb-1">Expiry date (optional)</label>
//                     <input
//                       type="date"
//                       value={linkSettings.expiresAt}
//                       onChange={(e) => setLinkSettings({ ...linkSettings, expiresAt: e.target.value })}
//                       className="w-full px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500/50"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs text-white/40 mb-1">Max attempts (optional)</label>
//                     <input
//                       type="number"
//                       value={linkSettings.maxAttempts}
//                       onChange={(e) => setLinkSettings({ ...linkSettings, maxAttempts: e.target.value })}
//                       placeholder="Unlimited"
//                       className="w-full px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500/50"
//                     />
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={generateShareLink}
//               disabled={generating}
//               className="w-full sm:w-auto px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 hover:border-emerald-500/40 rounded-xl text-emerald-400 text-sm font-medium transition-all disabled:opacity-50"
//             >
//               {generating ? 'Generating...' : quiz.shareableLinks?.publicId ? 'Regenerate Link' : 'Generate Link'}
//             </motion.button>

//             <AnimatePresence>
//               {shareUrl && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.05]"
//                 >
//                   <p className="text-xs text-white/40 mb-2">Share this link with students:</p>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={shareUrl}
//                       readOnly
//                       className="flex-1 min-w-0 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-sm text-white/60 focus:outline-none truncate"
//                     />
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={copyToClipboard}
//                       className="px-3 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 rounded-lg text-emerald-400 transition-all"
//                     >
//                       {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
//                     </motion.button>
//                   </div>
//                   {quiz.shareableLinks && (
//                     <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/30">
//                       <span className="flex items-center gap-1">
//                         <Eye className="w-3 h-3" /> {quiz.shareableLinks.currentAttempts || 0} attempts
//                       </span>
//                       {quiz.shareableLinks.expiresAt && (
//                         <span className="flex items-center gap-1">
//                           <Clock className="w-3 h-3" /> Expires {formatDate(quiz.shareableLinks.expiresAt)}
//                         </span>
//                       )}
//                     </div>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </motion.div>

//         {/* Questions Preview */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6"
//         >
//           <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
//             <BarChart3 className="w-4 h-4 text-emerald-400" />
//             Questions ({quiz.questions.length})
//           </h3>
//           <div className="space-y-4">
//             {quiz.questions.map((q, idx) => (
//               <motion.div
//                 key={q.id || idx}
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.05 }}
//                 className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.05] hover:border-white/10 transition-all"
//               >
//                 <div className="flex items-start justify-between mb-3">
//                   <div className="flex items-center gap-2">
//                     <span className="w-5 h-5 bg-emerald-500/10 rounded-lg flex items-center justify-center text-[10px] text-emerald-400">
//                       {idx + 1}
//                     </span>
//                     <span className="text-xs text-white/40">Question</span>
//                   </div>
//                   <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
//                     {q.marks} marks
//                   </span>
//                 </div>
//                 <p className="text-sm text-white/80 mb-4">{q.text}</p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   {q.options.map((opt, optIdx) => (
//                     <div
//                       key={optIdx}
//                       className={`text-xs p-2.5 rounded-lg border ${
//                         q.correctOption === optIdx
//                           ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
//                           : 'bg-white/[0.02] text-white/40 border-white/[0.05]'
//                       }`}
//                     >
//                       <span className="font-medium mr-2">{String.fromCharCode(65 + optIdx)}.</span>
//                       {opt}
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Delete Modal */}
//       <AnimatePresence>
//         {deleteModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//             onClick={() => setDeleteModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-[#0f0f12] border border-white/[0.08] rounded-2xl p-6 w-full max-w-sm shadow-2xl"
//             >
//               <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <Trash2 className="w-5 h-5 text-red-400" />
//               </div>
//               <h3 className="text-base font-semibold text-white text-center mb-2">Delete Quiz?</h3>
//               <p className="text-sm text-white/40 text-center mb-6">
//                 "<span className="text-white/60">{quiz.title}</span>" will be permanently deleted.
//               </p>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setDeleteModal(false)}
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
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Edit, Trash2, Clock, Users, BarChart3, Copy, Check,
  Link2, Settings, Eye, Calendar, Sparkles, ChevronRight, AlertCircle, Award,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { showToast } from '@/lib/toast';

// ── Design tokens ─────────────────────────────────────────────────
const T = {
  bg: '#080810',
  card: 'rgba(255,255,255,0.025)',
  cardHover: 'rgba(255,255,255,0.04)',
  border: 'rgba(255,255,255,0.07)',
  accent: '#34d399',
  accentBg: 'rgba(52,211,153,0.07)',
  accentBorder: 'rgba(52,211,153,0.18)',
  muted: 'rgba(255,255,255,0.4)',
  dim: 'rgba(255,255,255,0.22)',
  navBg: 'rgba(8,8,16,0.85)',
};

interface Question {
  id: string; text: string; options: string[];
  correctOption: number; marks: number;
}

interface Quiz {
  id: string; title: string; description: string;
  duration: number; totalMarks: number; questions: Question[];
  createdBy: string; createdByName: string; createdAt: string;
  visibility?: string; assignedTo?: string[];
  shareableLinks?: {
    publicId: string; isPublic: boolean; allowAnonymous: boolean;
    expiresAt?: string; maxAttempts?: number; currentAttempts?: number; createdAt: string;
  };
}

export default function TeacherQuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showShareSettings, setShowShareSettings] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [linkSettings, setLinkSettings] = useState({
    isPublic: false, allowAnonymous: true, expiresAt: '', maxAttempts: '',
  });

  // ── Logic untouched ──────────────────────────────────────────────
  useEffect(() => { fetchQuiz(); }, [params.id]);

  const fetchQuiz = async () => {
    try {
      const res = await fetch(`/api/quizzes/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setQuiz(data.data);
        if (data.data.shareableLinks?.publicId) {
          setShareUrl(`${window.location.origin}/quiz/shared/${data.data.shareableLinks.publicId}`);
          setLinkSettings({
            isPublic: data.data.shareableLinks.isPublic || false,
            allowAnonymous: data.data.shareableLinks.allowAnonymous ?? true,
            expiresAt: data.data.shareableLinks.expiresAt?.split('T')[0] || '',
            maxAttempts: data.data.shareableLinks.maxAttempts?.toString() || '',
          });
        }
      } else { showToast.error('Failed to load quiz'); }
    } catch { showToast.error('Error loading quiz'); }
    finally { setLoading(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/quizzes/${params.id}`, { method: 'DELETE' });
      if (res.ok) { showToast.success('Quiz deleted successfully'); router.push('/teacher/dashboard'); }
      else { showToast.error('Failed to delete quiz'); }
    } catch { showToast.error('Error deleting quiz'); }
    finally { setDeleting(false); setDeleteModal(false); }
  };

  const generateShareLink = async () => {
    setGenerating(true);
    const toastId = showToast.loading('Generating link...');
    try {
      const res = await fetch('/api/quiz/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId: params.id, settings: linkSettings }),
      });
      const data = await res.json();
      if (data.success) {
        setShareUrl(`${window.location.origin}/quiz/shared/${data.publicId}`);
        toast.dismiss(toastId);
        showToast.success('Link generated!');
        fetchQuiz();
      } else { toast.dismiss(toastId); showToast.error(data.error || 'Failed to generate link'); }
    } catch { toast.dismiss(toastId); showToast.error('Network error'); }
    finally { setGenerating(false); }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast.success('Copied to clipboard!');
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  // ────────────────────────────────────────────────────────────────

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

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: T.bg }}>
        <div className="text-center p-8 rounded-2xl border max-w-sm w-full"
          style={{ background: T.card, borderColor: T.border }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <AlertCircle className="w-6 h-6" style={{ color: '#f87171' }} />
          </div>
          <p className="text-sm mb-5" style={{ color: T.muted }}>Quiz not found</p>
          <button onClick={() => router.back()}
            className="px-4 py-2 rounded-xl text-sm font-medium border transition-all"
            style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ background: T.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)' }} />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ background: T.navBg, borderColor: T.border }}>
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()}
              className="p-2 rounded-xl transition-all hover:bg-white/[0.04]" style={{ color: T.muted }}>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                <span className="font-bold text-[11px]" style={{ color: T.accent }}>Q</span>
              </div>
              <span className="font-semibold text-sm hidden sm:block" style={{ color: 'rgba(255,255,255,0.8)' }}>QuizForge</span>
            </div>
            <div className="w-px h-4" style={{ background: T.border }} />
            <div>
              <p className="text-sm font-semibold text-white leading-none">Quiz Details</p>
              <p className="text-[10px] mt-0.5" style={{ color: T.dim }}>Manage and share</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href={`/teacher/edit-quiz/${quiz.id}`}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border"
                style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
                <Edit className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit</span>
              </motion.div>
            </Link>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setDeleteModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all border"
              style={{ background: 'rgba(248,113,113,0.08)', borderColor: 'rgba(248,113,113,0.2)', color: '#f87171' }}>
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Delete</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 space-y-4">

        {/* Quiz info card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 border" style={{ background: T.card, borderColor: T.border }}>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
              <Sparkles className="w-5 h-5" style={{ color: T.accent }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h2 className="text-lg font-bold text-white">{quiz.title}</h2>
                {quiz.visibility && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                    style={quiz.visibility === 'assigned'
                      ? { background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.2)', color: '#f59e0b' }
                      : { background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
                    {quiz.visibility}
                  </span>
                )}
              </div>
              {quiz.description && (
                <p className="text-sm mb-4 leading-relaxed" style={{ color: T.muted }}>{quiz.description}</p>
              )}
              <div className="flex flex-wrap gap-4 text-xs" style={{ color: T.dim }}>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" style={{ color: T.accent }} />{quiz.duration} min</span>
                <span className="flex items-center gap-1.5"><BarChart3 className="w-3.5 h-3.5" style={{ color: T.accent }} />{quiz.questions.length} questions</span>
                <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5" style={{ color: T.accent }} />{quiz.totalMarks} marks</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" style={{ color: T.accent }} />{formatDate(quiz.createdAt)}</span>
                {quiz.visibility === 'assigned' && quiz.assignedTo && quiz.assignedTo.length > 0 && (
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" style={{ color: T.accent }} />{quiz.assignedTo.length} assigned</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Shareable link card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="rounded-2xl p-5 border" style={{ background: T.card, borderColor: T.border }}>
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="w-4 h-4" style={{ color: T.accent }} />
            <h3 className="text-sm font-semibold text-white">Shareable Link</h3>
          </div>

          <div className="space-y-4">
            {/* Settings toggle */}
            <button onClick={() => setShowShareSettings(!showShareSettings)}
              className="flex items-center gap-2 text-xs transition-colors"
              style={{ color: T.muted }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.accent}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.muted}>
              <Settings className="w-3.5 h-3.5" />
              Link Settings
              <ChevronRight className={`w-3 h-3 transition-transform ${showShareSettings ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {showShareSettings && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="rounded-xl p-4 space-y-3.5 border"
                    style={{ background: 'rgba(255,255,255,0.02)', borderColor: T.border }}>
                    {[
                      { label: 'Public link (no login required)', key: 'isPublic' as const },
                      { label: 'Allow anonymous submissions', key: 'allowAnonymous' as const },
                    ].map(opt => (
                      <label key={opt.key} className="flex items-center justify-between cursor-pointer group">
                        <span className="text-xs transition-colors group-hover:text-white"
                          style={{ color: T.muted }}>{opt.label}</span>
                        <div className="relative">
                          <input type="checkbox"
                            checked={linkSettings[opt.key] as boolean}
                            onChange={(e) => setLinkSettings({ ...linkSettings, [opt.key]: e.target.checked })}
                            className="sr-only peer" />
                          <div className="w-8 h-4 rounded-full border transition-all peer-checked:border-transparent cursor-pointer"
                            style={{ background: (linkSettings[opt.key] as boolean) ? T.accent : 'rgba(255,255,255,0.06)', borderColor: T.border }}
                            onClick={() => setLinkSettings(prev => ({ ...prev, [opt.key]: !prev[opt.key] }))}>
                            <div className="w-3 h-3 rounded-full bg-white transition-all m-0.5"
                              style={{ transform: (linkSettings[opt.key] as boolean) ? 'translateX(16px)' : 'translateX(0)' }} />
                          </div>
                        </div>
                      </label>
                    ))}

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] mb-1.5" style={{ color: T.dim }}>Expiry date (optional)</label>
                        <input type="date" value={linkSettings.expiresAt}
                          onChange={(e) => setLinkSettings({ ...linkSettings, expiresAt: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs text-white focus:outline-none transition-all"
                          style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}` }}
                          onFocus={e => e.target.style.borderColor = T.accentBorder}
                          onBlur={e => e.target.style.borderColor = T.border} />
                      </div>
                      <div>
                        <label className="block text-[11px] mb-1.5" style={{ color: T.dim }}>Max attempts (optional)</label>
                        <input type="number" value={linkSettings.maxAttempts} placeholder="Unlimited"
                          onChange={(e) => setLinkSettings({ ...linkSettings, maxAttempts: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs text-white focus:outline-none transition-all"
                          style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}` }}
                          onFocus={e => e.target.style.borderColor = T.accentBorder}
                          onBlur={e => e.target.style.borderColor = T.border} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Generate button */}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={generateShareLink} disabled={generating}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border disabled:opacity-50"
              style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
              <Link2 className="w-3.5 h-3.5" />
              {generating ? 'Generating...' : quiz.shareableLinks?.publicId ? 'Regenerate Link' : 'Generate Link'}
            </motion.button>

            {/* Share URL */}
            <AnimatePresence>
              {shareUrl && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="rounded-xl p-4 border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: T.border }}>
                  <p className="text-[11px] mb-2.5" style={{ color: T.dim }}>Share this link with students:</p>
                  <div className="flex gap-2">
                    <input type="text" value={shareUrl} readOnly
                      className="flex-1 min-w-0 px-3 py-2 rounded-xl text-xs text-white focus:outline-none truncate"
                      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}` }} />
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={copyToClipboard}
                      className="px-3 py-2 rounded-xl transition-all border shrink-0"
                      style={{ background: copied ? T.accentBg : 'rgba(255,255,255,0.04)', borderColor: copied ? T.accentBorder : T.border, color: copied ? T.accent : T.muted }}>
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </motion.button>
                  </div>
                  {quiz.shareableLinks && (
                    <div className="mt-3 flex flex-wrap gap-4 text-[11px]" style={{ color: T.dim }}>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {quiz.shareableLinks.currentAttempts || 0} attempts
                      </span>
                      {quiz.shareableLinks.expiresAt && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Expires {formatDate(quiz.shareableLinks.expiresAt)}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Questions preview */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
          className="rounded-2xl overflow-hidden border" style={{ background: T.card, borderColor: T.border }}>
          <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: T.border }}>
            <BarChart3 className="w-4 h-4" style={{ color: T.accent }} />
            <h3 className="text-sm font-semibold text-white">Questions</h3>
            <span className="text-xs ml-auto px-2 py-0.5 rounded-full"
              style={{ background: T.accentBg, color: T.accent }}>{quiz.questions.length}</span>
          </div>
          <div className="divide-y" style={{ borderColor: T.border }}>
            {quiz.questions.map((q, idx) => (
              <motion.div key={q.id || idx}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.04 }}
                className="p-4 transition-colors"
                style={{ background: 'transparent' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                <div className="flex items-start justify-between mb-3 gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                      <span className="text-[10px] font-bold" style={{ color: T.accent }}>{idx + 1}</span>
                    </div>
                    <p className="text-sm text-white leading-relaxed">{q.text}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border shrink-0 font-medium"
                    style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
                    {q.marks} marks
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-8">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx}
                      className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl border"
                      style={q.correctOption === optIdx
                        ? { background: T.accentBg, borderColor: T.accentBorder, color: T.accent }
                        : { background: 'rgba(255,255,255,0.02)', borderColor: T.border, color: T.dim }}>
                      <span className="font-bold w-4 shrink-0">{String.fromCharCode(65 + optIdx)}.</span>
                      <span className="truncate">{opt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Delete modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setDeleteModal(false)}>
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
                "<span className="text-white">{quiz.title}</span>" will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteModal(false)}
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