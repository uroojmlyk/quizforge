


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Users, BookOpen, CheckCircle, Clock, TrendingUp, UserPlus,
//   Award, ChevronRight, Calendar, Activity, Target, Zap, BarChart3,
//   ArrowUpRight, ArrowDownRight, MoreHorizontal,
// } from 'lucide-react';

// const T = {
//   accent: '#34d399',
//   accentHover: '#34d399',
//   accentBg: 'rgba(52,211,153,0.07)',
//   accentBorder: 'rgba(52,211,153,0.18)',
//   card: 'rgba(255,255,255,0.025)',
//   border: 'rgba(255,255,255,0.07)',
//   muted: 'rgba(255,255,255,0.4)',
//   dim: 'rgba(255,255,255,0.22)',
// };

// interface Stats {
//   totalUsers: number; totalQuizzes: number; activeUsers: number;
//   completionRate: number; newUsersToday: number; quizzesToday: number;
//   totalAttempts: number; avgScore: number;
// }
// interface RecentActivity {
//   id: string; type: 'user' | 'quiz' | 'result';
//   message: string; time: string; userId?: string; quizId?: string;
// }

// // ── Stat card ──────────────────────────────────────────────────────
// function StatCard({ icon: Icon, value, label, badge, trend }: {
//   icon: any; value: string | number; label: string;
//   badge: string; trend?: string;
// }) {
//   return (
//     <div className="rounded-2xl p-3.5 sm:p-5 transition-all duration-200"
//       style={{ background: T.card, border: `1px solid ${T.border}` }}
//       onMouseEnter={e => (e.currentTarget.style.borderColor = T.accentBorder)}
//       onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}>
//       <div className="flex items-start justify-between mb-4">
//         <div className="w-9 h-9 rounded-xl flex items-center justify-center"
//           style={{ background: T.accentBg }}>
//           <Icon className="w-4.5 h-4.5" style={{ width: 18, height: 18, color: T.accent }} />
//         </div>
//         <span className="text-[11px] font-medium px-2 py-1 rounded-full"
//           style={{ background: T.accentBg, color: T.accentHover }}>
//           {badge}
//         </span>
//       </div>
//       <p className="text-2xl font-bold text-white">{value}</p>
//       <p className="text-sm mt-0.5" style={{ color: T.muted }}>{label}</p>
//       {trend && (
//         <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: T.accent }}>
//           <ArrowUpRight className="w-3.5 h-3.5" />
//           <span>{trend}</span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [stats] = useState<Stats>({
//     totalUsers: 12456, totalQuizzes: 342, activeUsers: 5678,
//     completionRate: 78, newUsersToday: 124, quizzesToday: 23,
//     totalAttempts: 45678, avgScore: 72,
//   });
//   const [recentActivity] = useState<RecentActivity[]>([
//     { id: '1', type: 'user',   message: 'New user registered',          time: '2 min ago'  },
//     { id: '2', type: 'quiz',   message: 'JavaScript Quiz created',       time: '15 min ago' },
//     { id: '3', type: 'result', message: 'Quiz completed by 45 students', time: '1 hr ago'   },
//     { id: '4', type: 'user',   message: 'Teacher account approved',      time: '2 hrs ago'  },
//     { id: '5', type: 'quiz',   message: 'React Quiz attempted 50 times', time: '3 hrs ago'  },
//   ]);

//   const activityIcon = (type: string) => {
//     const map: any = {
//       user:   <UserPlus  style={{ width: 14, height: 14, color: T.accent }} />,
//       quiz:   <BookOpen  style={{ width: 14, height: 14, color: T.accent }} />,
//       result: <CheckCircle style={{ width: 14, height: 14, color: T.accent }} />,
//     };
//     return map[type] || <Clock style={{ width: 14, height: 14, color: T.muted }} />;
//   };

//   return (
//     <div className="space-y-4 sm:space-y-6 w-full overflow-x-hidden">

//       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//         <div>
//           <div className="flex items-center gap-2 mb-1.5">
//             <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} />
//             <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: `${T.accent}cc` }}>
//               Admin Dashboard
//             </p>
//           </div>
//           <h1 className="text-xl font-bold text-white">Welcome back, Admin</h1>
//           <p className="text-xs mt-1" style={{ color: T.muted }}>Platform overview for today.</p>
//         </div>
//         <div className="flex items-center gap-2 shrink-0">
//           <button onClick={() => router.push('/admin/reports')}
//             className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
//             style={{ background: T.card, border: `1px solid ${T.border}`, color: T.muted }}>
//             <BarChart3 className="w-3.5 h-3.5 shrink-0" />
//             Reports
//           </button>
//           <button onClick={() => router.push('/admin/admin-users')}
//             className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all"
//             style={{ background: '#fff', color: '#080810' }}>
//             <Users className="w-3.5 h-3.5 shrink-0" />
//             Manage Users
//           </button>
//         </div>
//       </div>

//       {/* ── Primary stat cards ── */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//         <StatCard icon={Users}    value={stats.totalUsers.toLocaleString()} label="Total Users"    badge={`+${stats.newUsersToday} today`} trend="12% increase" />
//         <StatCard icon={BookOpen} value={stats.totalQuizzes}                label="Total Quizzes"  badge={`+${stats.quizzesToday} today`}  trend="8% increase"  />
//         <StatCard icon={Activity} value={stats.activeUsers.toLocaleString()} label="Active Users"  badge="Last 7 days"                      trend="5% increase"  />
//         <StatCard icon={Target}   value={`${stats.completionRate}%`}         label="Completion"    badge="All-time avg"                     trend="3% increase"  />
//       </div>

//       {/* ── Secondary stat cards ── */}
//       <div className="grid grid-cols-2 gap-3 sm:gap-4">
//         <div className="rounded-2xl p-3.5 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-xs sm:text-sm mb-1.5" style={{ color: T.muted }}>Total Attempts</p>
//               <p className="text-2xl sm:text-3xl font-bold text-white">{stats.totalAttempts.toLocaleString()}</p>
//               <p className="text-xs mt-1.5" style={{ color: T.dim }}>Across all quizzes</p>
//             </div>
//             <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: T.accentBg }}>
//               <Award style={{ width: 18, height: 18, color: T.accent }} />
//             </div>
//           </div>
//         </div>
//         <div className="rounded-2xl p-3.5 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-xs sm:text-sm mb-1.5" style={{ color: T.muted }}>Average Score</p>
//               <p className="text-2xl sm:text-3xl font-bold text-white">{stats.avgScore}%</p>
//               <p className="text-xs mt-1.5" style={{ color: T.accent }}>↑ 4% from last month</p>
//             </div>
//             <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: T.accentBg }}>
//               <TrendingUp style={{ width: 18, height: 18, color: T.accent }} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Bottom: Activity + Quick Actions ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

//         {/* Activity feed */}
//         <div className="lg:col-span-2 rounded-2xl overflow-hidden"
//           style={{ background: T.card, border: `1px solid ${T.border}` }}>
//           <div className="flex items-center justify-between px-4 py-3.5"
//             style={{ borderBottom: `1px solid ${T.border}` }}>
//             <div className="flex items-center gap-2.5">
//               <Activity className="w-4 h-4" style={{ color: T.accent }} />
//               <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
//             </div>
//             <Link href="/admin/reports" className="text-xs font-medium transition-colors"
//               style={{ color: T.muted }}
//               onMouseEnter={e => e.currentTarget.style.color = T.accentHover}
//               onMouseLeave={e => e.currentTarget.style.color = T.muted}>
//               View all →
//             </Link>
//           </div>

//           <div className="divide-y" style={{ borderColor: T.border }}>
//             {recentActivity.map((a) => (
//               <div key={a.id}
//                 className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
//                 style={{ background: 'transparent' }}
//                 onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
//                 onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
//                 onClick={() => {
//                   if (a.type === 'user' && a.userId) router.push(`/admin/admin-users/${a.userId}`);
//                   else if (a.type === 'quiz' && a.quizId) router.push(`/admin/admin-quizzes/${a.quizId}`);
//                 }}>
//                 <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
//                   style={{ background: T.accentBg }}>
//                   {activityIcon(a.type)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm text-white truncate">{a.message}</p>
//                   <div className="flex items-center gap-1.5 mt-0.5">
//                     <Calendar className="w-3 h-3" style={{ color: T.dim }} />
//                     <p className="text-[11px]" style={{ color: T.dim }}>{a.time}</p>
//                   </div>
//                 </div>
//                 <ChevronRight className="w-4 h-4 shrink-0" style={{ color: T.dim }} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quick actions */}
//         <div className="space-y-3">
//           <p className="text-[11px] font-semibold uppercase tracking-wider px-1" style={{ color: T.dim }}>
//             Quick Actions
//           </p>

//           {[
//             { href: '/admin/admin-users',   icon: Users,    title: 'User Management',  sub: 'View & manage all users'  },
//             { href: '/admin/admin-quizzes', icon: BookOpen, title: 'Quiz Management',  sub: 'Monitor all quizzes'       },
//             { href: '/admin/reports',       icon: BarChart3,title: 'Analytics',        sub: 'Reports & insights'        },
//           ].map((item) => (
//             <Link key={item.href} href={item.href}
//               className="flex items-center gap-3.5 p-4 rounded-2xl transition-all block"
//               style={{ background: T.card, border: `1px solid ${T.border}` }}
//               onMouseEnter={e => { e.currentTarget.style.borderColor = T.accentBorder; e.currentTarget.style.background = 'rgba(52,211,153,0.04)'; }}
//               onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.card; }}>
//               <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
//                 style={{ background: T.accentBg }}>
//                 <item.icon style={{ width: 18, height: 18, color: T.accent }} />
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-white">{item.title}</p>
//                 <p className="text-xs mt-0.5" style={{ color: T.muted }}>{item.sub}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }












'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Users, BookOpen, CheckCircle, Clock, TrendingUp, UserPlus,
  Award, ChevronRight, Calendar, Activity, Target, Zap, BarChart3,
  ArrowUpRight, ArrowDownRight, MoreHorizontal,
} from 'lucide-react';

const T = {
  bg: '#080810',
  accent: '#34d399',
  accentBg: 'rgba(52,211,153,0.07)',
  accentBorder: 'rgba(52,211,153,0.18)',
  card: 'rgba(255,255,255,0.025)',
  cardHover: 'rgba(255,255,255,0.04)',
  border: 'rgba(255,255,255,0.07)',
  borderHover: 'rgba(255,255,255,0.14)',
  muted: 'rgba(255,255,255,0.4)',
  dim: 'rgba(255,255,255,0.22)',
  navBg: 'rgba(8,8,16,0.85)',
};

interface Stats {
  totalUsers: number; totalQuizzes: number; activeUsers: number;
  completionRate: number; newUsersToday: number; quizzesToday: number;
  totalAttempts: number; avgScore: number;
}
interface RecentActivity {
  id: string; type: 'user' | 'quiz' | 'result';
  message: string; time: string; userId?: string; quizId?: string;
}

// ── Stat card ─────────────────────────────────────────────────────
function StatCard({ icon: Icon, value, label, badge, trend, color, bg, border }: {
  icon: any; value: string | number; label: string;
  badge: string; trend?: string;
  color?: string; bg?: string; border?: string;
}) {
  const c = color || T.accent;
  const b = bg || T.accentBg;
  const br = border || T.accentBorder;

  return (
    <div
      className="rounded-2xl p-4 sm:p-5 transition-all duration-200 cursor-default"
      style={{ background: T.card, border: `1px solid ${br}` }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.cardHover; (e.currentTarget as HTMLElement).style.borderColor = br; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.card; (e.currentTarget as HTMLElement).style.borderColor = br; }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: b }}>
          <Icon style={{ width: 17, height: 17, color: c }} />
        </div>
        <span className="text-[10px] font-medium px-2 py-1 rounded-full shrink-0 ml-2"
          style={{ background: b, color: c }}>
          {badge}
        </span>
      </div>
      <p className="text-2xl font-bold text-white mb-0.5">{value}</p>
      <p className="text-xs" style={{ color: T.muted }}>{label}</p>
      {trend && (
        <div className="flex items-center gap-1 mt-3 text-[11px]" style={{ color: c }}>
          <ArrowUpRight style={{ width: 13, height: 13 }} />
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();

  // ── Logic untouched ──────────────────────────────────────────────
  const [stats] = useState<Stats>({
    totalUsers: 12456, totalQuizzes: 342, activeUsers: 5678,
    completionRate: 78, newUsersToday: 124, quizzesToday: 23,
    totalAttempts: 45678, avgScore: 72,
  });
  const [recentActivity] = useState<RecentActivity[]>([
    { id: '1', type: 'user',   message: 'New user registered',          time: '2 min ago'  },
    { id: '2', type: 'quiz',   message: 'JavaScript Quiz created',       time: '15 min ago' },
    { id: '3', type: 'result', message: 'Quiz completed by 45 students', time: '1 hr ago'   },
    { id: '4', type: 'user',   message: 'Teacher account approved',      time: '2 hrs ago'  },
    { id: '5', type: 'quiz',   message: 'React Quiz attempted 50 times', time: '3 hrs ago'  },
  ]);

  const activityIcon = (type: string) => {
    const map: any = {
      user:   <UserPlus   style={{ width: 14, height: 14, color: T.accent }} />,
      quiz:   <BookOpen   style={{ width: 14, height: 14, color: T.accent }} />,
      result: <CheckCircle style={{ width: 14, height: 14, color: T.accent }} />,
    };
    return map[type] || <Clock style={{ width: 14, height: 14, color: T.muted }} />;
  };
  // ────────────────────────────────────────────────────────────────

  const statCards = [
    {
      icon: Users,    value: stats.totalUsers.toLocaleString(),  label: 'Total Users',
      badge: `+${stats.newUsersToday} today`, trend: '12% increase',
      color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)',
    },
    {
      icon: BookOpen, value: stats.totalQuizzes,                 label: 'Total Quizzes',
      badge: `+${stats.quizzesToday} today`, trend: '8% increase',
      color: T.accent, bg: T.accentBg, border: T.accentBorder,
    },
    {
      icon: Activity, value: stats.activeUsers.toLocaleString(), label: 'Active Users',
      badge: 'Last 7 days', trend: '5% increase',
      color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)',
    },
    {
      icon: Target,   value: `${stats.completionRate}%`,         label: 'Completion Rate',
      badge: 'All-time avg', trend: '3% increase',
      color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)',
    },
  ];

  return (
    <div className="space-y-5 w-full overflow-x-hidden" style={{ fontFamily: "'DM Sans','Inter',sans-serif" }}>

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: T.accent }} />
            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: `${T.accent}bb` }}>
              Admin Dashboard
            </p>
          </div>
          <h1 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Welcome back, Admin<span style={{ color: T.accent }}>.</span>
          </h1>
          <p className="text-xs" style={{ color: T.muted }}>Platform overview · live data</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => router.push('/admin/reports')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all border"
            style={{ background: T.card, borderColor: T.border, color: T.muted }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.accentBorder; (e.currentTarget as HTMLElement).style.color = T.accent; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.muted; }}>
            <BarChart3 style={{ width: 14, height: 14 }} className="shrink-0" />
            Reports
          </button>
          <button onClick={() => router.push('/admin/admin-users')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: '#fff', color: '#080810' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.9)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}>
            <Users style={{ width: 14, height: 14 }} className="shrink-0" />
            Manage Users
          </button>
        </div>
      </div>

      {/* ── Primary stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* ── Secondary cards ── */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total attempts */}
        <div className="rounded-2xl p-4 sm:p-5 border transition-all"
          style={{ background: T.card, borderColor: T.border }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.cardHover}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.card}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs mb-1.5" style={{ color: T.muted }}>Total Attempts</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{stats.totalAttempts.toLocaleString()}</p>
              <p className="text-[11px] mt-1.5 flex items-center gap-1" style={{ color: T.dim }}>
                <Award style={{ width: 12, height: 12, color: T.accent }} />
                Across all quizzes
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: T.accentBg }}>
              <Award style={{ width: 17, height: 17, color: T.accent }} />
            </div>
          </div>
        </div>

        {/* Average score */}
        <div className="rounded-2xl p-4 sm:p-5 border transition-all"
          style={{ background: T.card, borderColor: T.border }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.cardHover}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.card}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs mb-1.5" style={{ color: T.muted }}>Average Score</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{stats.avgScore}%</p>
              {/* Mini progress bar */}
              <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full" style={{ width: `${stats.avgScore}%`, background: T.accent, opacity: 0.7 }} />
              </div>
              <p className="text-[11px] mt-1.5" style={{ color: T.accent }}>↑ 4% from last month</p>
            </div>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ml-3" style={{ background: T.accentBg }}>
              <TrendingUp style={{ width: 17, height: 17, color: T.accent }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom: Activity + Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Activity feed */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden border" style={{ background: T.card, borderColor: T.border }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b" style={{ borderColor: T.border }}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: T.accentBg }}>
                <Activity style={{ width: 14, height: 14, color: T.accent }} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white leading-none">Recent Activity</h2>
                <p className="text-[10px] mt-0.5" style={{ color: T.dim }}>Live updates</p>
              </div>
            </div>
            <Link href="/admin/reports"
              className="text-[11px] font-medium flex items-center gap-1 transition-colors"
              style={{ color: T.muted }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.accent}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.muted}>
              View all <ChevronRight style={{ width: 12, height: 12 }} />
            </Link>
          </div>

          {/* Items */}
          <div className="divide-y" style={{ borderColor: T.border }}>
            {recentActivity.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors"
                style={{ background: 'transparent' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                onClick={() => {
                  if (a.type === 'user' && a.userId) router.push(`/admin/admin-users/${a.userId}`);
                  else if (a.type === 'quiz' && a.quizId) router.push(`/admin/admin-quizzes/${a.quizId}`);
                }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: T.accentBg }}>
                  {activityIcon(a.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate" style={{ color: 'rgba(255,255,255,0.8)' }}>{a.message}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Calendar style={{ width: 10, height: 10, color: T.dim }} />
                    <p className="text-[10px]" style={{ color: T.dim }}>{a.time}</p>
                  </div>
                </div>
                <ChevronRight style={{ width: 14, height: 14, flexShrink: 0, color: T.dim, opacity: 0.5 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest px-1" style={{ color: T.dim }}>
            Quick Actions
          </p>

          {[
            {
              href: '/admin/admin-users',
              icon: Users, title: 'User Management',
              sub: 'View & manage all users',
              color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)',
            },
            {
              href: '/admin/admin-quizzes',
              icon: BookOpen, title: 'Quiz Management',
              sub: 'Monitor all quizzes',
              color: T.accent, bg: T.accentBg, border: T.accentBorder,
            },
            {
              href: '/admin/reports',
              icon: BarChart3, title: 'Analytics',
              sub: 'Reports & insights',
              color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)',
            },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className="flex items-center gap-3.5 p-4 rounded-2xl transition-all border cursor-pointer"
                style={{ background: T.card, borderColor: item.border }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = item.bg; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.card; }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: item.bg }}>
                  <item.icon style={{ width: 17, height: 17, color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: T.muted }}>{item.sub}</p>
                </div>
                <ChevronRight style={{ width: 14, height: 14, flexShrink: 0, color: T.dim }} />
              </div>
            </Link>
          ))}

          {/* Mini platform snapshot */}
          <div className="rounded-2xl p-4 border mt-1" style={{ background: T.accentBg, borderColor: T.accentBorder }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: `${T.accent}99` }}>
              Platform Health
            </p>
            {[
              { label: 'Server', status: 'Operational', ok: true },
              { label: 'API', status: 'Operational', ok: true },
              { label: 'Database', status: 'Operational', ok: true },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between mb-2 last:mb-0">
                <span className="text-xs" style={{ color: T.muted }}>{s.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.ok ? T.accent : '#f87171' }} />
                  <span className="text-[11px] font-medium" style={{ color: s.ok ? T.accent : '#f87171' }}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}