// lib/theme.ts
export const theme = {
  colors: {
    bg: '#080810',
    bgSecondary: '#0f1019',
    accent: '#34d399',
    accentDark: '#059669',
    accentBg: 'rgba(52,211,153,0.07)',
    accentBorder: 'rgba(52,211,153,0.18)',
    accentGlow: 'rgba(52,211,153,0.15)',
    focusShadow: '0 0 0 3px rgba(52,211,153,0.08)',
    cardBg: 'rgba(255,255,255,0.025)',
    cardBorder: 'rgba(255,255,255,0.07)',
    inputBg: 'rgba(255,255,255,0.03)',
    textPrimary: 'rgba(255,255,255,0.88)',
    textSecondary: 'rgba(255,255,255,0.6)',
    textMuted: 'rgba(255,255,255,0.4)',
    textDim: 'rgba(255,255,255,0.2)',
    error: '#ef4444',
    errorBg: 'rgba(239,68,68,0.07)',
    errorBorder: 'rgba(239,68,68,0.18)',
    success: '#34d399',
    successBg: 'rgba(52,211,153,0.07)',
    successBorder: 'rgba(52,211,153,0.18)',
    warning: '#f59e0b',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  fonts: {
    primary: "'DM Sans', 'Inter', system-ui, sans-serif",
    display: "'DM Serif Display', serif",
  },
  animation: {
    transition: 'all 0.2s ease',
    transitionSlow: 'all 0.3s ease',
  },
} as const;

export type Theme = typeof theme;