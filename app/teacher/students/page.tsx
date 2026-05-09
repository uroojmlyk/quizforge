// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   Search, 
//   Check, 
//   X, 
//   Users,
//   ArrowLeft
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { Toaster } from 'react-hot-toast';

// interface Student {
//   _id: string;
//   name: string;
//   email: string;
//   createdAt: string;
// }

// export default function TeacherStudentsPage() {
//   const router = useRouter();
//   const [allStudents, setAllStudents] = useState<Student[]>([]);
//   const [assignedStudents, setAssignedStudents] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [teacherId, setTeacherId] = useState<string>('');

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (!user.id) {
//       router.push('/login');
//       return;
//     }
//     setTeacherId(user.id);
//     fetchData(user.id);
//   }, []);

//   const fetchData = async (tid: string) => {
//     try {
//       // Fetch all students
//       const studentsRes = await fetch('/api/users?role=student');
//       const studentsData = await studentsRes.json();
      
//       if (studentsData.success) {
//         setAllStudents(studentsData.data || []);
//       }

//       // Fetch teacher's assigned students
//       const assignedRes = await fetch(`/api/teacher/assigned-students?teacherId=${tid}`);
//       const assignedData = await assignedRes.json();
      
//       if (assignedData.success) {
//         setAssignedStudents(assignedData.data.map((s: Student) => s._id));
//       }
//     } catch (error) {
//       showToast.error('Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleStudent = async (studentId: string, assign: boolean) => {
//     try {
//       const res = await fetch('/api/teacher/assign-student', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           teacherId,
//           studentId,
//           action: assign ? 'assign' : 'unassign'
//         })
//       });

//       const data = await res.json();

//       if (data.success) {
//         if (assign) {
//           setAssignedStudents([...assignedStudents, studentId]);
//           showToast.success('Student assigned');
//         } else {
//           setAssignedStudents(assignedStudents.filter(id => id !== studentId));
//           showToast.success('Student removed');
//         }
//       } else {
//         showToast.error(data.error || 'Operation failed');
//       }
//     } catch (error) {
//       showToast.error('Network error');
//     }
//   };

//   const filteredStudents = allStudents.filter(s => 
//     s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     s.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
//         <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#09090B]">
//       <Toaster position="top-right" />
      
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-6">
//           <button
//             onClick={() => router.back()}
//             className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-white/60"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <div>
//             <h1 className="text-2xl font-light text-white">manage students</h1>
//             <p className="text-sm text-white/30 mt-1">
//               assign students to see your private quizzes
//             </p>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
//             <div className="flex items-center gap-2 mb-2">
//               <Users className="w-4 h-4 text-indigo-400" />
//               <span className="text-xs text-white/40">total students</span>
//             </div>
//             <p className="text-xl font-light text-white">{allStudents.length}</p>
//           </div>
//           <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
//             <div className="flex items-center gap-2 mb-2">
//               <Check className="w-4 h-4 text-green-400" />
//               <span className="text-xs text-white/40">assigned</span>
//             </div>
//             <p className="text-xl font-light text-white">{assignedStudents.length}</p>
//           </div>
//           <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
//             <div className="flex items-center gap-2 mb-2">
//               <X className="w-4 h-4 text-red-400" />
//               <span className="text-xs text-white/40">available</span>
//             </div>
//             <p className="text-xl font-light text-white">{allStudents.length - assignedStudents.length}</p>
//           </div>
//         </div>

//         {/* Search */}
//         <div className="mb-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
//             <input
//               type="text"
//               placeholder="search students..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-9 pr-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 text-sm"
//             />
//           </div>
//         </div>

//         {/* Students Table */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-white/[0.05] bg-white/[0.02]">
//                   <th className="px-6 py-3 text-left text-xs font-medium text-white/40">name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-white/40">email</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-white/40">joined</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-white/40">action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-white/[0.05]">
//                 {filteredStudents.map((student) => {
//                   const isAssigned = assignedStudents.includes(student._id);
                  
//                   return (
//                     <tr key={student._id} className="hover:bg-white/[0.02]">
//                       <td className="px-6 py-4">
//                         <p className="text-sm text-white">{student.name}</p>
//                       </td>
//                       <td className="px-6 py-4">
//                         <p className="text-sm text-white/60">{student.email}</p>
//                       </td>
//                       <td className="px-6 py-4">
//                         <p className="text-sm text-white/40">
//                           {new Date(student.createdAt).toLocaleDateString()}
//                         </p>
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <button
//                           onClick={() => toggleStudent(student._id, !isAssigned)}
//                           className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
//                             isAssigned
//                               ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30'
//                               : 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30'
//                           }`}
//                         >
//                           {isAssigned ? 'remove' : 'assign'}
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {filteredStudents.length === 0 && (
//             <div className="text-center py-12">
//               <Users className="w-12 h-12 text-white/20 mx-auto mb-3" />
//               <p className="text-white/40 text-sm">no students found</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }










'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Check, X, Users, ArrowLeft, UserCheck, UserX
} from 'lucide-react';
import { showToast } from '@/lib/toast';
import { Toaster } from 'react-hot-toast';

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
  navBg: 'rgba(8,8,16,0.85)',
};

interface Student {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function TeacherStudentsPage() {
  const router = useRouter();
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [assignedStudents, setAssignedStudents] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [teacherId, setTeacherId] = useState<string>('');

  // ── Logic untouched ──────────────────────────────────────────────
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) { router.push('/login'); return; }
    setTeacherId(user.id);
    fetchData(user.id);
  }, []);

  const fetchData = async (tid: string) => {
    try {
      const studentsRes = await fetch('/api/users?role=student');
      const studentsData = await studentsRes.json();
      if (studentsData.success) setAllStudents(studentsData.data || []);

      const assignedRes = await fetch(`/api/teacher/assigned-students?teacherId=${tid}`);
      const assignedData = await assignedRes.json();
      if (assignedData.success) setAssignedStudents(assignedData.data.map((s: Student) => s._id));
    } catch {
      showToast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const toggleStudent = async (studentId: string, assign: boolean) => {
    try {
      const res = await fetch('/api/teacher/assign-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherId, studentId, action: assign ? 'assign' : 'unassign' }),
      });
      const data = await res.json();
      if (data.success) {
        if (assign) {
          setAssignedStudents([...assignedStudents, studentId]);
          showToast.success('Student assigned');
        } else {
          setAssignedStudents(assignedStudents.filter(id => id !== studentId));
          showToast.success('Student removed');
        }
      } else {
        showToast.error(data.error || 'Operation failed');
      }
    } catch {
      showToast.error('Network error');
    }
  };

  const filteredStudents = allStudents.filter(s =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // ────────────────────────────────────────────────────────────────

  const assignedCount = assignedStudents.length;
  const availableCount = allStudents.length - assignedCount;

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

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
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => router.back()}
            className="p-2 rounded-xl transition-all hover:bg-white/[0.04]" style={{ color: T.muted }}>
            <ArrowLeft className="w-4 h-4" />
          </button>
          {/* QuizForge logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
              <span className="font-bold text-[11px]" style={{ color: T.accent }}>Q</span>
            </div>
            <span className="font-semibold text-sm hidden sm:block" style={{ color: 'rgba(255,255,255,0.8)' }}>QuizForge</span>
          </div>
          <div className="w-px h-4 mx-1" style={{ background: T.border }} />
          <div>
            <h1 className="text-sm font-semibold text-white leading-none">Manage Students</h1>
            <p className="text-[10px] mt-0.5" style={{ color: T.dim }}>Assign students to your private quizzes</p>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 space-y-4">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Students', value: allStudents.length, icon: Users, color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)' },
            { label: 'Assigned', value: assignedCount, icon: UserCheck, color: T.accent, bg: T.accentBg, border: T.accentBorder },
            { label: 'Unassigned', value: availableCount, icon: UserX, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-3.5 border transition-all"
              style={{ background: T.card, borderColor: s.border }}>
              <div className="flex items-start justify-between mb-2.5">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                  <s.icon style={{ width: 14, height: 14, color: s.color }} />
                </div>
              </div>
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: T.muted }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="rounded-2xl overflow-hidden border" style={{ background: T.card, borderColor: T.border }}>
          {/* Toolbar */}
          <div className="p-4 border-b" style={{ borderColor: T.border }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-white">Student Roster</h2>
                <p className="text-xs mt-0.5" style={{ color: T.muted }}>
                  {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
                  {searchTerm ? ' found' : ' total'}
                </p>
              </div>
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.muted }} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-sm text-white focus:outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}` }}
                  onFocus={e => e.target.style.borderColor = T.accentBorder}
                  onBlur={e => e.target.style.borderColor = T.border}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          {filteredStudents.length === 0 ? (
            <div className="py-14 text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <Users className="w-6 h-6" style={{ color: T.muted }} />
              </div>
              <p className="text-sm" style={{ color: T.muted }}>
                {searchTerm ? 'No students match your search' : 'No students found'}
              </p>
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="mt-2 text-xs" style={{ color: T.accent }}>
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: T.border, background: 'rgba(255,255,255,0.01)' }}>
                    {['Student', 'Email', 'Joined', 'Status', 'Action'].map((h, i) => (
                      <th key={h} className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-wider ${i === 4 ? 'text-right' : 'text-left'}`}
                        style={{ color: T.dim }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, i) => {
                    const isAssigned = assignedStudents.includes(student._id);
                    return (
                      <tr key={student._id}
                        className="border-b transition-colors"
                        style={{ borderColor: T.border, background: 'transparent' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>

                        {/* Name */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                              style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accent }}>
                              {student.name?.charAt(0)?.toUpperCase() || 'S'}
                            </div>
                            <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                              {student.name}
                            </span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-4 py-3.5">
                          <span className="text-sm" style={{ color: T.muted }}>{student.email}</span>
                        </td>

                        {/* Joined */}
                        <td className="px-4 py-3.5">
                          <span className="text-xs" style={{ color: T.dim }}>{formatDate(student.createdAt)}</span>
                        </td>

                        {/* Status badge */}
                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-1 rounded-full border"
                            style={isAssigned
                              ? { background: T.accentBg, borderColor: T.accentBorder, color: T.accent }
                              : { background: 'rgba(255,255,255,0.03)', borderColor: T.border, color: T.dim }}>
                            <span className="w-1 h-1 rounded-full" style={{ background: isAssigned ? T.accent : T.dim }} />
                            {isAssigned ? 'Assigned' : 'Unassigned'}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-4 py-3.5 text-right">
                          <button
                            onClick={() => toggleStudent(student._id, !isAssigned)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border"
                            style={isAssigned
                              ? { background: 'rgba(248,113,113,0.08)', borderColor: 'rgba(248,113,113,0.2)', color: '#f87171' }
                              : { background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}
                            onMouseEnter={e => {
                              const el = e.currentTarget as HTMLElement;
                              el.style.opacity = '0.8';
                            }}
                            onMouseLeave={e => {
                              const el = e.currentTarget as HTMLElement;
                              el.style.opacity = '1';
                            }}>
                            {isAssigned
                              ? <><X className="w-3 h-3" /> Remove</>
                              : <><Check className="w-3 h-3" /> Assign</>}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer count */}
          {filteredStudents.length > 0 && (
            <div className="px-4 py-3 border-t" style={{ borderColor: T.border }}>
              <p className="text-[11px] text-center" style={{ color: T.dim }}>
                {assignedCount} of {allStudents.length} students assigned
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}