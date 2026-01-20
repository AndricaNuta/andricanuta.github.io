import { base, spacing } from './base';

export type ThemeScheme = 'light' | 'dark';

export interface ThemeColors {
  bg: string;
  surface: string;
  card: string;
  text: string;
  subtext: string;
  muted: string;
  border: string;
  tint: string;
  onTint: string;
  danger: string;
  success: string;
  sheetHandle: string;
  icon: string;
  navBg: string;

  iconDefault: string;
  iconMuted: string;
  iconActive: string;
  iconDanger: string;
  iconSuccess: string;
  iconWarning: string;

  iconBgDefault: string;
  iconBgMuted: string;
  iconBgAccent: string;
  iconBgDanger: string;
  iconBgSuccess: string;
  iconBgWarning: string;

  onIconBgDefault: string;
  onIconBgMuted: string;
  onIconBgAccent: string;
  onIconBgDanger: string;
  onIconBgSuccess: string;
  onIconBgWarning: string;

  highlightRing: string;
  highlightTint: string;
  highlightFill: string;
  highlightBorder: string;
}

export interface ThemeRoles {
  settings: {
    defaultFromIcon: {
      fg: keyof ThemeColors;
      bg: keyof ThemeColors;
    };
    defaultToIcon: {
      fg: keyof ThemeColors;
      bg: keyof ThemeColors;
    };
    darkModeIcon: {
      fg: keyof ThemeColors;
      bg: keyof ThemeColors;
    };
    notifIcon: {
      fg: keyof ThemeColors;
      bg: keyof ThemeColors;
    };
  };
}

export interface ThemeRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  pill: number;
  sheet: number;
}

export interface ThemeShadow {
  ios: {
    shadowColor: string;
    shadowOpacity: number;
    shadowRadius: number;
    shadowOffset: {
      width: number;
      height: number;
    };
  };
  android: {
    elevation: number;
  };
}

export interface ThemeTypography {
  h1: {
    size: number;
    weight: string;
    lineHeight: number;
  };
  title: {
    size: number;
    weight: string;
    lineHeight: number;
  };
  body: {
    size: number;
    weight: string;
    lineHeight: number;
  };
  caption: {
    size: number;
    weight: string;
    lineHeight: number;
    letterSpacing: number;
    uppercase: boolean;
  };
  numStrong: string;
  numStrongLarge: number;
}

export interface Theme {
  scheme: ThemeScheme;
  colors: ThemeColors;
  roles: ThemeRoles;
  radius: ThemeRadius;
  spacing: typeof spacing;
  shadow: ThemeShadow;
  typography: ThemeTypography;
}
