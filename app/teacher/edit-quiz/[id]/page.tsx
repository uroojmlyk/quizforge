



// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import {
//   Save, Trash2, ArrowLeft, PlusCircle, HelpCircle,
//   Clock, FileText, CheckCircle, AlertCircle,
//   ChevronDown, ChevronUp, Copy, GraduationCap
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// interface Question {
//   id: string;
//   text: string;
//   options: string[];
//   correctOption: number;
//   marks: number;
// }

// interface Quiz {
//   _id: string;
//   title: string;
//   description: string;
//   duration: number;
//   totalMarks: number;
//   questions: Question[];
//   createdBy: string;
//   createdByName: string;
//   createdAt: string;
// }

// export default function EditQuizPage() {
//   const router = useRouter();
//   const params = useParams();

//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [duration, setDuration] = useState(30);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [error, setError] = useState('');
//   const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
//   const [hasChanges, setHasChanges] = useState(false);

//   // ── Load quiz ──────────────────────────────────────────────────
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
//     if (!token || !storedUser) { router.push('/login'); return; }
//     const id = params?.id as string;
//     if (!id) { setError('Invalid quiz ID'); setLoading(false); return; }
//     fetchQuiz(id);
//   }, [params?.id, router]);

//   const fetchQuiz = async (id: string) => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/quizzes/${id}`);
//       const data = await res.json();
//       if (!res.ok || !data.success) { setError(data.error || 'Quiz not found!'); setLoading(false); return; }
//       const quizData = data.data;
//       setQuiz(quizData);
//       setTitle(quizData.title || '');
//       setDescription(quizData.description || '');
//       setDuration(quizData.duration || 30);
//       const formatted = (quizData.questions || []).map((q: any, i: number) => ({
//         id: q.id || `q_${Date.now()}_${i}_${Math.random()}`,
//         text: q.text || '',
//         options: q.options || ['', '', '', ''],
//         correctOption: q.correctOption ?? q.correctAnswer ?? 0,
//         marks: q.marks || 10,
//       }));
//       setQuestions(formatted);
//       setExpandedQuestions(new Set(formatted.map((_: any, i: number) => i)));
//       setHasChanges(false);
//       setLoading(false);
//     } catch {
//       setError('Error loading quiz');
//       setLoading(false);
//     }
//   };

//   // ── Question helpers (logic untouched) ────────────────────────
//   const toggleQuestion = (i: number) => {
//     setExpandedQuestions(prev => {
//       const s = new Set(prev);
//       s.has(i) ? s.delete(i) : s.add(i);
//       return s;
//     });
//   };

//   const toggleAllQuestions = () => {
//     setExpandedQuestions(
//       expandedQuestions.size === questions.length
//         ? new Set()
//         : new Set(questions.map((_, i) => i))
//     );
//   };

//   const addQuestion = () => {
//     const q: Question = {
//       id: `q_${Date.now()}_${questions.length}_${Math.random()}`,
//       text: '', options: ['', '', '', ''], correctOption: 0, marks: 10,
//     };
//     setQuestions([...questions, q]);
//     setExpandedQuestions(prev => new Set([...prev, questions.length]));
//     setHasChanges(true);
//     showToast.success('New question added');
//   };

//   const duplicateQuestion = (index: number) => {
//     const q = { ...questions[index], id: `q_${Date.now()}_${questions.length}_${Math.random()}` };
//     const updated = [...questions];
//     updated.splice(index + 1, 0, q);
//     setQuestions(updated);
//     setExpandedQuestions(prev => new Set([...prev, index + 1]));
//     setHasChanges(true);
//     showToast.success('Question duplicated');
//   };

//   const removeQuestion = (index: number) => {
//     if (questions.length <= 1) { showToast.error('Quiz must have at least one question'); return; }
//     if (confirm('Delete this question?')) {
//       setQuestions(questions.filter((_, i) => i !== index));
//       setExpandedQuestions(prev => { const s = new Set(prev); s.delete(index); return s; });
//       setHasChanges(true);
//       showToast.success('Question removed');
//     }
//   };

//   const updateQuestion = (index: number, field: keyof Question, value: any) => {
//     setQuestions(prev => { const u = [...prev]; u[index] = { ...u[index], [field]: value }; return u; });
//     setHasChanges(true);
//   };

//   const updateOption = (qIndex: number, oIndex: number, value: string) => {
//     setQuestions(prev => {
//       const u = [...prev];
//       if (!u[qIndex].options) u[qIndex].options = ['', '', '', ''];
//       u[qIndex].options[oIndex] = value;
//       return u;
//     });
//     setHasChanges(true);
//   };

//   const moveQuestionUp = (index: number) => {
//     if (index === 0) return;
//     setQuestions(prev => { const u = [...prev]; [u[index-1], u[index]] = [u[index], u[index-1]]; return u; });
//     setExpandedQuestions(prev => {
//       const s = new Set(prev);
//       if (s.has(index)) { s.delete(index); s.add(index-1); }
//       return s;
//     });
//     setHasChanges(true);
//   };

//   const moveQuestionDown = (index: number) => {
//     if (index === questions.length - 1) return;
//     setQuestions(prev => { const u = [...prev]; [u[index], u[index+1]] = [u[index+1], u[index]]; return u; });
//     setExpandedQuestions(prev => {
//       const s = new Set(prev);
//       if (s.has(index)) { s.delete(index); s.add(index+1); }
//       return s;
//     });
//     setHasChanges(true);
//   };

//   // ── Save ──────────────────────────────────────────────────────
//   const handleSave = async () => {
//     const id = params?.id as string;
//     if (!id) { showToast.error('Quiz ID not found'); return; }
//     if (!title.trim()) { showToast.error('Please enter a quiz title'); return; }
//     for (let i = 0; i < questions.length; i++) {
//       if (!questions[i].text?.trim()) { showToast.error(`Question ${i+1} is empty`); return; }
//       for (let j = 0; j < (questions[i].options || []).length; j++) {
//         if (!questions[i].options[j]?.trim()) { showToast.error(`Option ${j+1} of Question ${i+1} is empty`); return; }
//       }
//     }
//     setSaving(true);
//     try {
//       const formattedQuestions = questions.map(q => ({
//         text: q.text, options: q.options,
//         correctAnswer: q.correctOption, marks: q.marks,
//       }));
//       const totalMarks = formattedQuestions.reduce((s, q) => s + (q.marks || 0), 0);
//       const res = await fetch(`/api/quizzes/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title: title.trim(), description: description.trim(), duration: Number(duration), totalMarks, questions: formattedQuestions }),
//       });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         showToast.success('Quiz updated successfully! 🎉');
//         setHasChanges(false);
//         setTimeout(() => router.push('/teacher/dashboard'), 1500);
//       } else {
//         showToast.error(data.error || 'Failed to update quiz');
//         setSaving(false);
//       }
//     } catch {
//       showToast.error('Network error. Please try again.');
//       setSaving(false);
//     }
//   };

//   // ── Delete ────────────────────────────────────────────────────
//   const handleDelete = async () => {
//     const id = params?.id as string;
//     if (!id) { showToast.error('Quiz ID not found'); return; }
//     setDeleting(true);
//     try {
//       const res = await fetch(`/api/quizzes/${id}`, { method: 'DELETE' });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         showToast.success('Quiz deleted successfully!');
//         setTimeout(() => router.push('/teacher/dashboard'), 1500);
//       } else {
//         showToast.error(data.error || 'Failed to delete quiz');
//         setDeleting(false);
//         setShowDeleteConfirm(false);
//       }
//     } catch {
//       showToast.error('Network error. Please try again.');
//       setDeleting(false);
//       setShowDeleteConfirm(false);
//     }
//   };

//   const totalMarks = questions.reduce((s, q) => s + (Number(q.marks) || 0), 0);

//   // ── Loading state ─────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#070709] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
//             <GraduationCap className="w-6 h-6 text-white animate-pulse" />
//           </div>
//           <div className="flex gap-1.5">
//             {[0,1,2].map(i => (
//               <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-bounce"
//                 style={{ animationDelay: `${i * 0.15}s` }} />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── Error state ───────────────────────────────────────────────
//   if (error || !quiz) {
//     return (
//       <div className="min-h-screen bg-[#070709] flex items-center justify-center p-4">
//         <div className="text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 max-w-sm w-full">
//           <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//             <AlertCircle className="w-6 h-6 text-red-400" />
//           </div>
//           <p className="text-white/70 mb-5 text-sm">{error || 'Quiz not found!'}</p>
//           <button
//             onClick={() => router.push('/teacher/dashboard')}
//             className="px-5 py-2.5 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 rounded-xl text-sm font-medium hover:bg-emerald-500/25 transition-all"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ── Main UI ───────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#070709] text-white" style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}>
//       <Toaster position="top-right" />

//       {/* Ambient glow */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 right-1/3 w-[500px] h-[400px] bg-emerald-600/5 rounded-full blur-[130px]" />
//         <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-teal-600/4 rounded-full blur-[100px]" />
//       </div>

//       {/* ── Navbar ── */}
//       <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070709]/85 backdrop-blur-xl">
//         <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
//           <div className="flex items-center gap-2.5">
//             <button
//               onClick={() => router.back()}
//               className="p-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all"
//             >
//               <ArrowLeft className="w-4 h-4" />
//             </button>
//             <div className="flex items-center gap-2">
//               <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
//                 <GraduationCap className="w-3 h-3 text-white" />
//               </div>
//               <div className="hidden sm:block">
//                 <span className="text-sm font-semibold text-white/80">Edit Quiz</span>
//                 {hasChanges && (
//                   <span className="ml-2 text-[9px] px-1.5 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/20 rounded-full">
//                     unsaved
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setShowDeleteConfirm(true)}
//               className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/35 rounded-xl text-red-400 text-xs font-medium transition-all"
//             >
//               <Trash2 className="w-3.5 h-3.5 shrink-0" />
//               <span className="hidden sm:inline">Delete</span>
//             </button>
//             <button
//               onClick={handleSave}
//               disabled={saving || !hasChanges}
//               className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 rounded-xl text-emerald-400 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
//             >
//               <Save className="w-3.5 h-3.5 shrink-0" />
//               {saving ? 'Saving…' : 'Save Changes'}
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 pb-20 space-y-4">

//         {/* ── Quiz title + stats bar ── */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
//           <div>
//             <h1 className="text-lg sm:text-xl font-bold text-white">{quiz.title}</h1>
//             <p className="text-xs text-white/30 mt-0.5">
//               {questions.length} question{questions.length !== 1 ? 's' : ''} · {totalMarks} total marks · {duration} min
//             </p>
//           </div>
//           {hasChanges && (
//             <div className="flex items-center gap-1.5 text-xs text-amber-400/80">
//               <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
//               Unsaved changes
//             </div>
//           )}
//         </div>

//         {/* ── Quiz Details Card ── */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//           <div className="px-4 py-3 border-b border-white/[0.05] flex items-center gap-2">
//             <FileText className="w-3.5 h-3.5 text-emerald-400" />
//             <h2 className="text-sm font-semibold text-white">Quiz Details</h2>
//           </div>
//           <div className="p-4 space-y-3">
//             {/* Title */}
//             <div>
//               <label className="text-xs text-white/40 mb-1.5 block">Quiz Title *</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={e => { setTitle(e.target.value); setHasChanges(true); }}
//                 placeholder="Enter quiz title..."
//                 className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors"
//               />
//             </div>
//             {/* Description */}
//             <div>
//               <label className="text-xs text-white/40 mb-1.5 block">Description</label>
//               <textarea
//                 value={description}
//                 onChange={e => { setDescription(e.target.value); setHasChanges(true); }}
//                 placeholder="Brief description of the quiz..."
//                 rows={3}
//                 className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors resize-none"
//               />
//             </div>
//             {/* Duration */}
//             <div className="flex items-center gap-3">
//               <div>
//                 <label className="text-xs text-white/40 mb-1.5 block">Duration (minutes)</label>
//                 <div className="flex items-center gap-2">
//                   <div className="relative">
//                     <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
//                     <input
//                       type="number"
//                       value={duration}
//                       onChange={e => { setDuration(Number(e.target.value)); setHasChanges(true); }}
//                       min="1"
//                       className="w-28 pl-9 pr-3 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white focus:outline-none transition-colors"
//                     />
//                   </div>
//                   <span className="text-xs text-white/25">minutes</span>
//                 </div>
//               </div>
//               {/* Total marks badge */}
//               <div className="ml-auto text-right">
//                 <p className="text-xs text-white/30 mb-1">Total Marks</p>
//                 <p className="text-lg font-bold text-emerald-400">{totalMarks}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Questions Section ── */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//           {/* Header */}
//           <div className="px-4 py-3 border-b border-white/[0.05] flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
//               <h2 className="text-sm font-semibold text-white">
//                 Questions <span className="text-white/30 font-normal">({questions.length})</span>
//               </h2>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={toggleAllQuestions}
//                 className="text-xs text-white/35 hover:text-white/60 transition-colors px-2 py-1 rounded-lg hover:bg-white/[0.04]"
//               >
//                 {expandedQuestions.size === questions.length ? 'Collapse all' : 'Expand all'}
//               </button>
//               <button
//                 onClick={addQuestion}
//                 className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-medium transition-all"
//               >
//                 <PlusCircle className="w-3.5 h-3.5" />
//                 Add
//               </button>
//             </div>
//           </div>

//           {/* Questions list */}
//           <div className="divide-y divide-white/[0.04]">
//             {questions.map((q, index) => (
//               <div key={q.id}>
//                 {/* Question header row */}
//                 <div
//                   className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors select-none"
//                   onClick={() => toggleQuestion(index)}
//                 >
//                   {/* Number badge */}
//                   <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
//                     <span className="text-[10px] font-bold text-emerald-400">{index + 1}</span>
//                   </div>

//                   {/* Question text preview */}
//                   <p className="flex-1 text-sm text-white/70 truncate min-w-0">
//                     {q.text || <span className="text-white/25 italic">Empty question</span>}
//                   </p>

//                   {/* Marks badge */}
//                   <span className="text-[10px] px-2 py-0.5 bg-white/[0.04] text-white/35 rounded-full shrink-0 hidden sm:block">
//                     {q.marks}pts
//                   </span>

//                   {/* Move + expand controls */}
//                   <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
//                     <button
//                       onClick={() => moveQuestionUp(index)}
//                       disabled={index === 0}
//                       className="p-1 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/[0.06] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
//                     >
//                       <ChevronUp className="w-3.5 h-3.5" />
//                     </button>
//                     <button
//                       onClick={() => moveQuestionDown(index)}
//                       disabled={index === questions.length - 1}
//                       className="p-1 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/[0.06] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
//                     >
//                       <ChevronDown className="w-3.5 h-3.5" />
//                     </button>
//                   </div>

//                   {/* Expand icon */}
//                   <div className="text-white/20 shrink-0">
//                     {expandedQuestions.has(index)
//                       ? <ChevronUp className="w-4 h-4" />
//                       : <ChevronDown className="w-4 h-4" />}
//                   </div>
//                 </div>

//                 {/* Expanded question body */}
//                 {expandedQuestions.has(index) && (
//                   <div className="px-4 pb-4 space-y-4 bg-white/[0.01]">
//                     {/* Question text */}
//                     <div>
//                       <label className="text-xs text-white/35 mb-1.5 block">Question Text *</label>
//                       <textarea
//                         value={q.text}
//                         onChange={e => updateQuestion(index, 'text', e.target.value)}
//                         onClick={e => e.stopPropagation()}
//                         placeholder="Type your question here..."
//                         rows={2}
//                         className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors resize-none"
//                       />
//                     </div>

//                     {/* Options grid — 1 col on mobile, 2 on sm+ */}
//                     <div>
//                       <label className="text-xs text-white/35 mb-2 block">Answer Options</label>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//                         {q.options.map((opt, optIndex) => (
//                           <div
//                             key={optIndex}
//                             className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-colors ${
//                               q.correctOption === optIndex
//                                 ? 'bg-emerald-500/8 border-emerald-500/30'
//                                 : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]'
//                             }`}
//                           >
//                             {/* Option letter */}
//                             <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
//                               q.correctOption === optIndex
//                                 ? 'bg-emerald-500/20 text-emerald-400'
//                                 : 'bg-white/[0.04] text-white/30'
//                             }`}>
//                               {String.fromCharCode(65 + optIndex)}
//                             </div>
//                             <input
//                               type="text"
//                               value={opt}
//                               onChange={e => updateOption(index, optIndex, e.target.value)}
//                               onClick={e => e.stopPropagation()}
//                               placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
//                               className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none min-w-0"
//                             />
//                             {q.correctOption === optIndex && (
//                               <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Correct answer + marks */}
//                     <div className="flex flex-col sm:flex-row gap-3">
//                       <div className="flex-1">
//                         <label className="text-xs text-white/35 mb-1.5 block">Correct Answer</label>
//                         <select
//                           value={q.correctOption}
//                           onChange={e => updateQuestion(index, 'correctOption', Number(e.target.value))}
//                           onClick={e => e.stopPropagation()}
//                           className="w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
//                         >
//                           {q.options.map((_, i) => (
//                             <option key={i} value={i} className="bg-[#0f1012]">
//                               Option {String.fromCharCode(65 + i)}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="text-xs text-white/35 mb-1.5 block">Marks</label>
//                         <input
//                           type="number"
//                           value={q.marks}
//                           onChange={e => updateQuestion(index, 'marks', Number(e.target.value))}
//                           onClick={e => e.stopPropagation()}
//                           min="1"
//                           className="w-full sm:w-24 px-3 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white focus:outline-none transition-colors"
//                         />
//                       </div>
//                     </div>

//                     {/* Question actions */}
//                     <div className="flex items-center justify-end gap-2 pt-1">
//                       <button
//                         onClick={() => duplicateQuestion(index)}
//                         className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-white/40 hover:text-white/70 text-xs transition-all"
//                       >
//                         <Copy className="w-3.5 h-3.5" />
//                         Duplicate
//                       </button>
//                       <button
//                         onClick={() => removeQuestion(index)}
//                         className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/8 hover:bg-red-500/15 border border-red-500/15 hover:border-red-500/25 text-red-400/70 hover:text-red-400 text-xs transition-all"
//                       >
//                         <Trash2 className="w-3.5 h-3.5" />
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Add question footer button */}
//           <div className="p-4 border-t border-white/[0.04]">
//             <button
//               onClick={addQuestion}
//               className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-white/[0.1] hover:border-emerald-500/30 text-white/30 hover:text-emerald-400 text-sm transition-all hover:bg-emerald-500/5"
//             >
//               <PlusCircle className="w-4 h-4" />
//               Add another question
//             </button>
//           </div>
//         </div>

//         {/* ── Floating save bar (mobile) ── */}
//         {hasChanges && (
//           <div className="fixed bottom-4 left-4 right-4 z-50 sm:hidden">
//             <div className="flex items-center gap-3 bg-[#0f1012]/95 border border-emerald-500/20 rounded-2xl px-4 py-3 backdrop-blur-xl shadow-2xl shadow-black/50">
//               <div className="flex items-center gap-1.5 flex-1">
//                 <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
//                 <span className="text-xs text-white/50">Unsaved changes</span>
//               </div>
//               <button
//                 onClick={handleSave}
//                 disabled={saving}
//                 className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/20 border border-emerald-500/35 text-emerald-400 rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
//               >
//                 <Save className="w-3.5 h-3.5" />
//                 {saving ? 'Saving…' : 'Save'}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── Delete Confirmation Modal ── */}
//       {showDeleteConfirm && (
//         <div
//           className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
//           onClick={() => setShowDeleteConfirm(false)}
//         >
//           <div
//             className="bg-[#0f0f12] border border-white/[0.08] rounded-t-3xl sm:rounded-2xl p-6 w-full sm:max-w-sm shadow-2xl"
//             onClick={e => e.stopPropagation()}
//           >
//             {/* Mobile drag handle */}
//             <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mb-5 sm:hidden" />
//             <div className="w-11 h-11 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//               <Trash2 className="w-5 h-5 text-red-400" />
//             </div>
//             <h3 className="text-base font-semibold text-white text-center mb-2">Delete Quiz?</h3>
//             <p className="text-sm text-white/40 text-center mb-6">
//               "<span className="text-white/60">{quiz?.title}</span>" will be permanently deleted along with all results.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/60 text-sm hover:bg-white/[0.08] transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={deleting}
//                 className="flex-1 px-4 py-3 bg-red-500/15 border border-red-500/25 rounded-xl text-red-400 text-sm hover:bg-red-500/25 transition-all disabled:opacity-50 font-medium"
//               >
//                 {deleting ? 'Deleting…' : 'Delete'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import {
  Save, Trash2, ArrowLeft, PlusCircle, HelpCircle,
  Clock, FileText, CheckCircle, AlertCircle,
  ChevronDown, ChevronUp, Copy, GraduationCap
} from 'lucide-react';
import { showToast } from '@/lib/toast';

// ── Design tokens ─────────────────────────────────────────────────
const T = {
  bg: '#080810',
  card: 'rgba(255,255,255,0.025)',
  border: 'rgba(255,255,255,0.07)',
  borderFocus: 'rgba(52,211,153,0.4)',
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
  _id: string; title: string; description: string;
  duration: number; totalMarks: number; questions: Question[];
  createdBy: string; createdByName: string; createdAt: string;
}

// ── Reusable styled input ─────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-medium uppercase tracking-wider mb-1.5" style={{ color: T.dim }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls = `w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none transition-all`;
const inputStyle = { background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}` };

export default function EditQuizPage() {
  const router = useRouter();
  const params = useParams();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const [hasChanges, setHasChanges] = useState(false);

  // ── Logic untouched ──────────────────────────────────────────────
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token || !storedUser) { router.push('/login'); return; }
    const id = params?.id as string;
    if (!id) { setError('Invalid quiz ID'); setLoading(false); return; }
    fetchQuiz(id);
  }, [params?.id, router]);

  const fetchQuiz = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/quizzes/${id}`);
      const data = await res.json();
      if (!res.ok || !data.success) { setError(data.error || 'Quiz not found!'); setLoading(false); return; }
      const quizData = data.data;
      setQuiz(quizData);
      setTitle(quizData.title || '');
      setDescription(quizData.description || '');
      setDuration(quizData.duration || 30);
      const formatted = (quizData.questions || []).map((q: any, i: number) => ({
        id: q.id || `q_${Date.now()}_${i}_${Math.random()}`,
        text: q.text || '', options: q.options || ['', '', '', ''],
        correctOption: q.correctOption ?? q.correctAnswer ?? 0,
        marks: q.marks || 10,
      }));
      setQuestions(formatted);
      setExpandedQuestions(new Set(formatted.map((_: any, i: number) => i)));
      setHasChanges(false);
      setLoading(false);
    } catch { setError('Error loading quiz'); setLoading(false); }
  };

  const toggleQuestion = (i: number) => {
    setExpandedQuestions(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; });
  };
  const toggleAllQuestions = () => {
    setExpandedQuestions(expandedQuestions.size === questions.length ? new Set() : new Set(questions.map((_, i) => i)));
  };
  const addQuestion = () => {
    const q: Question = { id: `q_${Date.now()}_${questions.length}_${Math.random()}`, text: '', options: ['', '', '', ''], correctOption: 0, marks: 10 };
    setQuestions([...questions, q]);
    setExpandedQuestions(prev => new Set([...prev, questions.length]));
    setHasChanges(true);
    showToast.success('New question added');
  };
  const duplicateQuestion = (index: number) => {
    const q = { ...questions[index], id: `q_${Date.now()}_${questions.length}_${Math.random()}` };
    const updated = [...questions]; updated.splice(index + 1, 0, q);
    setQuestions(updated);
    setExpandedQuestions(prev => new Set([...prev, index + 1]));
    setHasChanges(true); showToast.success('Question duplicated');
  };
  const removeQuestion = (index: number) => {
    if (questions.length <= 1) { showToast.error('Quiz must have at least one question'); return; }
    if (confirm('Delete this question?')) {
      setQuestions(questions.filter((_, i) => i !== index));
      setExpandedQuestions(prev => { const s = new Set(prev); s.delete(index); return s; });
      setHasChanges(true); showToast.success('Question removed');
    }
  };
  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    setQuestions(prev => { const u = [...prev]; u[index] = { ...u[index], [field]: value }; return u; });
    setHasChanges(true);
  };
  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    setQuestions(prev => {
      const u = [...prev];
      if (!u[qIndex].options) u[qIndex].options = ['', '', '', ''];
      u[qIndex].options[oIndex] = value; return u;
    });
    setHasChanges(true);
  };
  const moveQuestionUp = (index: number) => {
    if (index === 0) return;
    setQuestions(prev => { const u = [...prev]; [u[index-1], u[index]] = [u[index], u[index-1]]; return u; });
    setExpandedQuestions(prev => { const s = new Set(prev); if (s.has(index)) { s.delete(index); s.add(index-1); } return s; });
    setHasChanges(true);
  };
  const moveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return;
    setQuestions(prev => { const u = [...prev]; [u[index], u[index+1]] = [u[index+1], u[index]]; return u; });
    setExpandedQuestions(prev => { const s = new Set(prev); if (s.has(index)) { s.delete(index); s.add(index+1); } return s; });
    setHasChanges(true);
  };

  const handleSave = async () => {
    const id = params?.id as string;
    if (!id) { showToast.error('Quiz ID not found'); return; }
    if (!title.trim()) { showToast.error('Please enter a quiz title'); return; }
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].text?.trim()) { showToast.error(`Question ${i+1} is empty`); return; }
      for (let j = 0; j < (questions[i].options || []).length; j++) {
        if (!questions[i].options[j]?.trim()) { showToast.error(`Option ${j+1} of Question ${i+1} is empty`); return; }
      }
    }
    setSaving(true);
    try {
      const formattedQuestions = questions.map(q => ({
        text: q.text, options: q.options, correctAnswer: q.correctOption, marks: q.marks,
      }));
      const totalMarks = formattedQuestions.reduce((s, q) => s + (q.marks || 0), 0);
      const res = await fetch(`/api/quizzes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), description: description.trim(), duration: Number(duration), totalMarks, questions: formattedQuestions }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast.success('Quiz updated successfully! 🎉');
        setHasChanges(false);
        setTimeout(() => router.push('/teacher/dashboard'), 1500);
      } else { showToast.error(data.error || 'Failed to update quiz'); setSaving(false); }
    } catch { showToast.error('Network error. Please try again.'); setSaving(false); }
  };

  const handleDelete = async () => {
    const id = params?.id as string;
    if (!id) { showToast.error('Quiz ID not found'); return; }
    setDeleting(true);
    try {
      const res = await fetch(`/api/quizzes/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast.success('Quiz deleted successfully!');
        setTimeout(() => router.push('/teacher/dashboard'), 1500);
      } else { showToast.error(data.error || 'Failed to delete quiz'); setDeleting(false); setShowDeleteConfirm(false); }
    } catch { showToast.error('Network error. Please try again.'); setDeleting(false); setShowDeleteConfirm(false); }
  };

  const totalMarks = questions.reduce((s, q) => s + (Number(q.marks) || 0), 0);
  // ────────────────────────────────────────────────────────────────

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: T.bg }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
            <GraduationCap className="w-5 h-5 animate-pulse" style={{ color: T.accent }} />
          </div>
          <div className="flex gap-1.5">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                style={{ background: T.accent, animationDelay: `${i * 0.15}s`, opacity: 0.6 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (error || !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: T.bg }}>
        <div className="text-center rounded-2xl p-8 border max-w-sm w-full" style={{ background: T.card, borderColor: T.border }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <AlertCircle className="w-6 h-6" style={{ color: '#f87171' }} />
          </div>
          <p className="text-sm mb-5" style={{ color: T.muted }}>{error || 'Quiz not found!'}</p>
          <button onClick={() => router.push('/teacher/dashboard')}
            className="px-5 py-2.5 rounded-xl text-sm font-medium border transition-all"
            style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ background: T.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
      <Toaster position="top-right" />

      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)' }} />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ background: T.navBg, borderColor: T.border }}>
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
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
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-white leading-none truncate">Edit Quiz</p>
                {hasChanges && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full border font-medium shrink-0"
                    style={{ background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.25)', color: '#f59e0b' }}>
                    unsaved
                  </span>
                )}
              </div>
              <p className="text-[10px] mt-0.5 truncate" style={{ color: T.dim }}>{quiz.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all"
              style={{ background: 'rgba(248,113,113,0.08)', borderColor: 'rgba(248,113,113,0.2)', color: '#f87171' }}>
              <Trash2 className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Delete</span>
            </button>
            <button onClick={handleSave} disabled={saving || !hasChanges}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
              <Save className="w-3.5 h-3.5 shrink-0" />
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 pb-24 space-y-4">

        {/* Summary bar */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs" style={{ color: T.muted }}>
              {questions.length} question{questions.length !== 1 ? 's' : ''} · {totalMarks} total marks · {duration} min
            </p>
          </div>
          {hasChanges && (
            <div className="flex items-center gap-1.5 text-xs" style={{ color: '#f59e0b' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Unsaved changes
            </div>
          )}
        </div>

        {/* Quiz details */}
        <div className="rounded-2xl overflow-hidden border" style={{ background: T.card, borderColor: T.border }}>
          <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: T.border }}>
            <FileText className="w-3.5 h-3.5" style={{ color: T.accent }} />
            <h2 className="text-sm font-semibold text-white">Quiz Details</h2>
          </div>
          <div className="p-4 space-y-3.5">
            <Field label="Quiz Title *">
              <input type="text" value={title} placeholder="Enter quiz title..."
                onChange={e => { setTitle(e.target.value); setHasChanges(true); }}
                className={inputCls} style={inputStyle}
                onFocus={e => e.target.style.borderColor = T.borderFocus}
                onBlur={e => e.target.style.borderColor = T.border} />
            </Field>
            <Field label="Description">
              <textarea value={description} placeholder="Brief description of the quiz..." rows={3}
                onChange={e => { setDescription(e.target.value); setHasChanges(true); }}
                className={`${inputCls} resize-none`} style={inputStyle}
                onFocus={e => e.target.style.borderColor = T.borderFocus}
                onBlur={e => e.target.style.borderColor = T.border} />
            </Field>
            <div className="flex items-end gap-4">
              <div>
                <Field label="Duration (minutes)">
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.dim }} />
                    <input type="number" value={duration} min="1"
                      onChange={e => { setDuration(Number(e.target.value)); setHasChanges(true); }}
                      className="w-32 pl-9 pr-3 py-2.5 rounded-xl text-sm text-white focus:outline-none transition-all"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = T.borderFocus}
                      onBlur={e => e.target.style.borderColor = T.border} />
                  </div>
                </Field>
              </div>
              <div className="ml-auto text-right pb-0.5">
                <p className="text-[11px] mb-1" style={{ color: T.dim }}>Total Marks</p>
                <p className="text-2xl font-bold" style={{ color: T.accent }}>{totalMarks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="rounded-2xl overflow-hidden border" style={{ background: T.card, borderColor: T.border }}>
          <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: T.border }}>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5" style={{ color: T.accent }} />
              <h2 className="text-sm font-semibold text-white">
                Questions <span className="font-normal" style={{ color: T.dim }}>({questions.length})</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={toggleAllQuestions}
                className="text-xs px-2 py-1 rounded-lg transition-all hover:bg-white/[0.04]" style={{ color: T.dim }}>
                {expandedQuestions.size === questions.length ? 'Collapse all' : 'Expand all'}
              </button>
              <button onClick={addQuestion}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all"
                style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
                <PlusCircle className="w-3.5 h-3.5" />
                Add
              </button>
            </div>
          </div>

          <div className="divide-y" style={{ borderColor: T.border }}>
            {questions.map((q, index) => (
              <div key={q.id}>
                {/* Question header */}
                <div className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none transition-colors"
                  style={{ background: 'transparent' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  onClick={() => toggleQuestion(index)}>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                    <span className="text-[10px] font-bold" style={{ color: T.accent }}>{index + 1}</span>
                  </div>
                  <p className="flex-1 text-sm truncate min-w-0" style={{ color: q.text ? 'rgba(255,255,255,0.7)' : T.dim }}>
                    {q.text || <span style={{ fontStyle: 'italic' }}>Empty question</span>}
                  </p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full shrink-0 hidden sm:block"
                    style={{ background: 'rgba(255,255,255,0.04)', color: T.dim }}>{q.marks}pts</span>
                  {/* Move controls */}
                  <div className="flex items-center gap-0.5 shrink-0" onClick={e => e.stopPropagation()}>
                    <button onClick={() => moveQuestionUp(index)} disabled={index === 0}
                      className="p-1.5 rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/[0.06]"
                      style={{ color: T.dim }}>
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => moveQuestionDown(index)} disabled={index === questions.length - 1}
                      className="p-1.5 rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/[0.06]"
                      style={{ color: T.dim }}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div style={{ color: T.dim }}>
                    {expandedQuestions.has(index) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded body */}
                {expandedQuestions.has(index) && (
                  <div className="px-4 pb-4 space-y-3.5" style={{ background: 'rgba(255,255,255,0.01)' }}>
                    <Field label="Question Text *">
                      <textarea value={q.text} rows={2} placeholder="Type your question here..."
                        onChange={e => updateQuestion(index, 'text', e.target.value)}
                        onClick={e => e.stopPropagation()}
                        className={`${inputCls} resize-none`} style={inputStyle}
                        onFocus={e => e.target.style.borderColor = T.borderFocus}
                        onBlur={e => e.target.style.borderColor = T.border} />
                    </Field>

                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider mb-2" style={{ color: T.dim }}>
                        Answer Options
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, optIndex) => {
                          const isCorrect = q.correctOption === optIndex;
                          return (
                            <div key={optIndex}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all"
                              style={isCorrect
                                ? { background: T.accentBg, borderColor: T.accentBorder }
                                : { background: 'rgba(255,255,255,0.02)', borderColor: T.border }}>
                              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                                style={isCorrect
                                  ? { background: 'rgba(52,211,153,0.2)', color: T.accent }
                                  : { background: 'rgba(255,255,255,0.04)', color: T.dim }}>
                                {String.fromCharCode(65 + optIndex)}
                              </div>
                              <input type="text" value={opt}
                                placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                                onChange={e => updateOption(index, optIndex, e.target.value)}
                                onClick={e => e.stopPropagation()}
                                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none min-w-0" />
                              {isCorrect && <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: T.accent }} />}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <Field label="Correct Answer">
                          <select value={q.correctOption}
                            onChange={e => updateQuestion(index, 'correctOption', Number(e.target.value))}
                            onClick={e => e.stopPropagation()}
                            className="w-full px-3 py-2.5 rounded-xl text-sm text-white focus:outline-none transition-all appearance-none cursor-pointer"
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = T.borderFocus}
                            onBlur={e => e.target.style.borderColor = T.border}>
                            {q.options.map((_, i) => (
                              <option key={i} value={i} style={{ background: '#0f1012' }}>
                                Option {String.fromCharCode(65 + i)}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                      <div>
                        <Field label="Marks">
                          <input type="number" value={q.marks} min="1"
                            onChange={e => updateQuestion(index, 'marks', Number(e.target.value))}
                            onClick={e => e.stopPropagation()}
                            className="w-full sm:w-24 px-3 py-2.5 rounded-xl text-sm text-white focus:outline-none transition-all"
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = T.borderFocus}
                            onBlur={e => e.target.style.borderColor = T.border} />
                        </Field>
                      </div>
                    </div>

                    {/* Question actions */}
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button onClick={() => duplicateQuestion(index)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs border transition-all"
                        style={{ background: 'rgba(255,255,255,0.03)', borderColor: T.border, color: T.muted }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = T.muted; (e.currentTarget as HTMLElement).style.borderColor = T.border; }}>
                        <Copy className="w-3.5 h-3.5" /> Duplicate
                      </button>
                      <button onClick={() => removeQuestion(index)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs border transition-all"
                        style={{ background: 'rgba(248,113,113,0.06)', borderColor: 'rgba(248,113,113,0.15)', color: 'rgba(248,113,113,0.7)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f87171'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(248,113,113,0.3)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(248,113,113,0.7)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(248,113,113,0.15)'; }}>
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add question button */}
          <div className="p-4 border-t" style={{ borderColor: T.border }}>
            <button onClick={addQuestion}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed text-sm transition-all"
              style={{ borderColor: T.border, color: T.dim }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.accentBorder; (e.currentTarget as HTMLElement).style.color = T.accent; (e.currentTarget as HTMLElement).style.background = T.accentBg; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.dim; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
              <PlusCircle className="w-4 h-4" />
              Add another question
            </button>
          </div>
        </div>
      </div>

      {/* Floating save bar — mobile only */}
      {hasChanges && (
        <div className="fixed bottom-4 left-4 right-4 z-50 sm:hidden">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl"
            style={{ background: 'rgba(15,15,26,0.95)', borderColor: T.accentBorder }}>
            <div className="flex items-center gap-1.5 flex-1">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-amber-400" />
              <span className="text-xs" style={{ color: T.muted }}>Unsaved changes</span>
            </div>
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all disabled:opacity-50"
              style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
              <Save className="w-3.5 h-3.5" />
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowDeleteConfirm(false)}>
          <div className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl p-6 border shadow-2xl"
            onClick={e => e.stopPropagation()}
            style={{ background: '#0e0e1a', borderColor: T.border }}>
            <div className="w-8 h-1 bg-white/10 rounded-full mx-auto mb-5 sm:hidden" />
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}>
              <Trash2 className="w-5 h-5" style={{ color: '#f87171' }} />
            </div>
            <h3 className="text-base font-semibold text-white text-center mb-2">Delete Quiz?</h3>
            <p className="text-sm text-center mb-6" style={{ color: T.muted }}>
              "<span className="text-white">{quiz?.title}</span>" will be permanently deleted along with all results.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 rounded-xl text-sm border transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: T.border, color: T.muted }}>
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-medium border transition-all disabled:opacity-50"
                style={{ background: 'rgba(248,113,113,0.1)', borderColor: 'rgba(248,113,113,0.25)', color: '#f87171' }}>
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}