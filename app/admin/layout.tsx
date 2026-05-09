

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Users, BookOpen, BarChart3,
  LogOut, Settings, Menu, X, Sparkles, ChevronRight, Bell,
} from 'lucide-react';
import { showToast } from '@/lib/toast';

const T = {
  bg: '#080810',
  sidebar: '#0a0a14',
  accent: '#34d399',
  accentHover: '#34d399',
  accentBg: 'rgba(52,211,153,0.07)',
  accentBorder: 'rgba(52,211,153,0.18)',
  border: 'rgba(255,255,255,0.07)',
  muted: 'rgba(255,255,255,0.38)',
};

const NAV = [
  { name: 'Dashboard', href: '/admin',              icon: LayoutDashboard },
  { name: 'Users',     href: '/admin/admin-users',   icon: Users           },
  { name: 'Quizzes',   href: '/admin/admin-quizzes', icon: BookOpen        },
  { name: 'Reports',   href: '/admin/reports',       icon: BarChart3       },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [open,    setOpen]    = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user,    setUser]    = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token      = localStorage.getItem('token');
    if (!token || !storedUser) { router.push('/login'); return; }
    const userData = JSON.parse(storedUser);
    if (userData.role?.toLowerCase().trim() !== 'admin') { router.push('/dashboard'); return; }
    setUser(userData);
    setIsAdmin(true);
  }, [router]);

  const handleLogout = () => {
    const toastId = showToast.loading('Logging out...');
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      import('react-hot-toast').then(({ default: toast }) => toast.dismiss(toastId));
      showToast.success('Logged out');
      router.push('/login');
    }, 600);
  };

  const crumb = pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'dashboard';

  if (!isAdmin) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: T.bg }}>
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-2 animate-spin"
          style={{ borderColor: `${T.accent}25`, borderTopColor: T.accent }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-4 h-4 animate-pulse" style={{ color: `${T.accent}70` }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: T.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');`}</style>

      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          style={{ background: 'rgba(0,0,0,0.75)' }}
          onClick={() => setOpen(false)} />
      )}

      {/* ─── Sidebar ─── */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 flex flex-col
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: T.sidebar, borderRight: `1px solid ${T.border}` }}
      >
        {/* Logo row */}
        <div className="h-14 flex items-center justify-between px-4 shrink-0"
          style={{ borderBottom: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <span className="text-white/80 font-bold text-sm">Q</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">QuizForge</p>
              <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>admin panel</p>
            </div>
          </div>
          <button className="lg:hidden p-1.5 rounded-lg" style={{ color: T.muted }}
            onClick={() => setOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={active
                  ? { background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentHover }
                  : { border: '1px solid transparent', color: T.muted }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = T.muted; }}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </div>
                {active && <div className="w-1.5 h-1.5 rounded-full" style={{ background: T.accentHover }} />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 space-y-0.5 shrink-0" style={{ borderTop: `1px solid ${T.border}` }}>
          {/* Settings */}
          <Link href="/admin/settings" onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
            style={pathname === '/admin/settings'
              ? { background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentHover }
              : { border: '1px solid transparent', color: T.muted }}
            onMouseEnter={e => { if (pathname !== '/admin/settings') e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
            onMouseLeave={e => { if (pathname !== '/admin/settings') e.currentTarget.style.color = T.muted; }}
          >
            <Settings className="w-4 h-4 shrink-0" />
            Settings
          </Link>
          {/* Logout */}
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
            style={{ border: '1px solid transparent', color: T.muted }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.background = 'transparent'; }}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Logout
          </button>
          {/* User card */}
          <div className="mt-2 px-3 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}` }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Admin'}</p>
                <p className="text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.2)' }}>{user?.email || ''}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-5 backdrop-blur-xl"
          style={{ background: `${T.bg}dd`, borderBottom: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-xl transition-all"
              style={{ color: T.muted, border: `1px solid ${T.border}` }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => e.currentTarget.style.color = T.muted}>
              <Menu className="w-4 h-4" />
            </button>
            {/* Page name on mobile */}
            <span className="lg:hidden text-xs font-semibold capitalize text-white/60">{crumb}</span>
            <div className="hidden lg:flex items-center gap-2 text-xs">
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>admin</span>
              <ChevronRight className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.12)' }} />
              <span className="font-semibold capitalize" style={{ color: 'rgba(255,255,255,0.55)' }}>{crumb}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl transition-all"
              style={{ color: T.muted, border: `1px solid ${T.border}` }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => e.currentTarget.style.color = T.muted}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: T.accent }} />
            </button>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}` }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})` }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <span className="hidden sm:block text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {user?.name || 'Admin'}
              </span>
            </div>
          </div>
        </header>

        <main className="p-3 sm:p-5 lg:p-6 pb-20 lg:pb-6 overflow-x-hidden">{children}</main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center h-14 border-t"
        style={{ background: `${T.sidebar}f2`, borderColor: T.border, backdropFilter: 'blur(20px)' }}>
        {[...NAV, { name: 'Settings', href: '/admin/settings', icon: Settings }].map(item => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link key={item.name} href={item.href}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1"
              style={{ color: active ? T.accentHover : T.muted }}>
              <div className="w-7 h-7 flex items-center justify-center rounded-xl"
                style={{ background: active ? T.accentBg : 'transparent' }}>
                <item.icon style={{ width: 16, height: 16 }} />
              </div>
              <span style={{ fontSize: 9, fontWeight: 500 }}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}