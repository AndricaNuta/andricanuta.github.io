import { base, spacing } from './base';
import type { Theme } from './types';

export const lightTheme: Theme = {
  scheme: 'light',
  colors: {
    bg: '#F3F4F6',
    surface: '#FBFAFF',
    card: '#FFFFFF',
    text: '#1E1E1E',
    subtext: '#4B5563',
    muted: '#6B7280',
    border: '#E5E7EB',
    tint: base.purple.primary,
    onTint: '#FFFFFF',
    danger: '#EF4444',
    success: '#22C55E',
    sheetHandle: '#D7D2EA',
    icon: '#1E1E1E',
    navBg: '#FFFFFF',

    iconDefault: '#1E1E1E',
    iconMuted: '#9CA3AF',
    iconActive: base.purple.primary,
    iconDanger: '#EF4444',
    iconSuccess: '#22C55E',
    iconWarning: '#EA580C',

    iconBgDefault: '#F1F2F6',
    iconBgMuted: '#EEF1F7',
    iconBgAccent: base.lightPurpleTint,
    iconBgDanger: '#FDECEC',
    iconBgSuccess: '#EAF8F0',
    iconBgWarning: '#FFF2E8',

    onIconBgDefault: '#1E1E1E',
    onIconBgMuted: '#6F6B7E',
    onIconBgAccent: base.purple.primary,
    onIconBgDanger: '#7F1D1D',
    onIconBgSuccess: '#065F46',
    onIconBgWarning: '#7C2D12',

    highlightRing: '#0B0B0B',
    highlightTint: base.purple.primary,
    highlightFill: 'rgba(72,58,160,0.12)',
    highlightBorder: 'rgba(72,58,160,0.35)',
  },
  roles: {
    settings: {
      defaultFromIcon: {
        fg: 'iconActive',
        bg: 'iconBgAccent'
      },
      defaultToIcon: {
        fg: 'iconWarning',
        bg: 'iconBgWarning'
      },
      darkModeIcon: {
        fg: 'iconDefault',
        bg: 'iconBgDefault'
      },
      notifIcon: {
        fg: 'iconDanger',
        bg: 'iconBgDanger'
      },
    },
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    pill: 999,
    sheet: 28,
  },
  spacing,
  shadow: {
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: {
        width: 0,
        height: 4
      }
    },
    android: {
      elevation: 3
    },
  },
  typography:   {
    h1: {
      size: 22,
      weight: '700',
      lineHeight: 28
    },
    title: {
      size: 16,
      weight: '700',
      lineHeight: 22
    },
    body: {
      size: 15,
      weight: '400',
      lineHeight: 22.5
    },
    caption: {
      size: 12,
      weight: '700',
      lineHeight: 16,
      letterSpacing: 0.6,
      uppercase: true
    },
    numStrong: '800',
    numStrongLarge: 40,
  }
};

export const darkTheme: Theme = {
  scheme: 'dark',
  colors: {
    bg: '#0F0F12',
    surface: '#161423',
    card: '#1C1C21',
    text: '#FFFFFF',
    subtext: '#C7C2E4',
    muted: '#9A94BD',
    border: '#3A3553',
    tint: base.purple.tonal,
    onTint: '#FFFFFF',
    danger: '#F87171',
    success: '#34D399',
    sheetHandle: '#3A3553',
    icon: '#FFFFFF',
    navBg: '#0F0F12',

    iconDefault: '#FFFFFF',
    iconMuted: '#8A84A8',
    iconActive: base.purple.tonal,
    iconDanger: '#F87171',
    iconSuccess: '#34D399',
    iconWarning: '#F59E0B',

    iconBgDefault: '#242239',
    iconBgMuted: '#26223E',
    iconBgAccent: '#2A2650',
    iconBgDanger: '#3C2130',
    iconBgSuccess: '#1F3A2E',
    iconBgWarning: '#3F2A14',

    onIconBgDefault: '#FFFFFF',
    onIconBgMuted: '#B9B3D9',
    onIconBgAccent: base.purple.primary,
    onIconBgDanger: '#FCA5A5',
    onIconBgSuccess: '#86EFAC',
    onIconBgWarning: '#FCD34D',

    highlightRing: '#FFFFFF',
    highlightTint: base.purple.tonal,
    highlightFill: 'rgba(121,101,193,0.20)',
    highlightBorder: 'rgba(121,101,193,0.65)',
  },
  roles: {
    settings: {
      defaultFromIcon: {
        fg: 'iconActive',
        bg: 'iconBgAccent'
      },
      defaultToIcon: {
        fg: 'iconWarning',
        bg: 'iconBgWarning'
      },
      darkModeIcon: {
        fg: 'iconDefault',
        bg: 'iconBgDefault'
      },
      notifIcon: {
        fg: 'iconDanger',
        bg: 'iconBgDanger'
      },
    },
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    pill: 999,
    sheet: 28,
  },
  spacing,
  shadow: {
    ios: {
      shadowColor: 'transparent',
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: {
        width: 0,
        height: 0
      }
    },
    android: {
      elevation: 0
    },
  },
  typography:   {
    h1: {
      size: 22,
      weight: '700',
      lineHeight: 28
    },
    title: {
      size: 16,
      weight: '700',
      lineHeight: 22
    },
    body: {
      size: 15,
      weight: '400',
      lineHeight: 22.5
    },
    caption: {
      size: 12,
      weight: '700',
      lineHeight: 16,
      letterSpacing: 0.6,
      uppercase: true
    },
    numStrong: '800',
    numStrongLarge: 40,
  }
};
