import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Hook to apply theme colors as CSS variables to the document root
 */
export const useThemeStyles = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    const colors = theme.colors;

    // Apply theme colors as CSS variables
    root.style.setProperty('--theme-bg', colors.bg);
    root.style.setProperty('--theme-surface', colors.surface);
    root.style.setProperty('--theme-card', colors.card);
    root.style.setProperty('--theme-text', colors.text);
    root.style.setProperty('--theme-subtext', colors.subtext);
    root.style.setProperty('--theme-muted', colors.muted);
    root.style.setProperty('--theme-border', colors.border);
    root.style.setProperty('--theme-tint', colors.tint);
    root.style.setProperty('--theme-on-tint', colors.onTint);
    root.style.setProperty('--theme-danger', colors.danger);
    root.style.setProperty('--theme-success', colors.success);
    root.style.setProperty('--theme-sheet-handle', colors.sheetHandle);
    root.style.setProperty('--theme-icon', colors.icon);
    root.style.setProperty('--theme-nav-bg', colors.navBg);

    // Icon colors
    root.style.setProperty('--theme-icon-default', colors.iconDefault);
    root.style.setProperty('--theme-icon-muted', colors.iconMuted);
    root.style.setProperty('--theme-icon-active', colors.iconActive);
    root.style.setProperty('--theme-icon-danger', colors.iconDanger);
    root.style.setProperty('--theme-icon-success', colors.iconSuccess);
    root.style.setProperty('--theme-icon-warning', colors.iconWarning);

    // Icon background colors
    root.style.setProperty('--theme-icon-bg-default', colors.iconBgDefault);
    root.style.setProperty('--theme-icon-bg-muted', colors.iconBgMuted);
    root.style.setProperty('--theme-icon-bg-accent', colors.iconBgAccent);
    root.style.setProperty('--theme-icon-bg-danger', colors.iconBgDanger);
    root.style.setProperty('--theme-icon-bg-success', colors.iconBgSuccess);
    root.style.setProperty('--theme-icon-bg-warning', colors.iconBgWarning);

    // On icon background colors
    root.style.setProperty('--theme-on-icon-bg-default', colors.onIconBgDefault);
    root.style.setProperty('--theme-on-icon-bg-muted', colors.onIconBgMuted);
    root.style.setProperty('--theme-on-icon-bg-accent', colors.onIconBgAccent);
    root.style.setProperty('--theme-on-icon-bg-danger', colors.onIconBgDanger);
    root.style.setProperty('--theme-on-icon-bg-success', colors.onIconBgSuccess);
    root.style.setProperty('--theme-on-icon-bg-warning', colors.onIconBgWarning);

    // Highlight colors
    root.style.setProperty('--theme-highlight-ring', colors.highlightRing);
    root.style.setProperty('--theme-highlight-tint', colors.highlightTint);
    root.style.setProperty('--theme-highlight-fill', colors.highlightFill);
    root.style.setProperty('--theme-highlight-border', colors.highlightBorder);

    // Apply theme colors to existing Tailwind variables for compatibility
    // Convert hex to HSL for Tailwind compatibility
    const hexToHsl = (color: string): string => {
      // Handle rgba colors - extract just the hex part
      if (color.startsWith('rgba')) {
        // For rgba, we'll use a simplified conversion
        // This is a fallback - ideally rgba should be converted properly
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const r = parseInt(match[1]) / 255;
          const g = parseInt(match[2]) / 255;
          const b = parseInt(match[3]) / 255;
          return rgbToHsl(r, g, b);
        }
        return '0 0% 50%'; // fallback
      }

      // Handle hex colors
      if (!color.startsWith('#')) {
        return '0 0% 50%'; // fallback for invalid colors
      }

      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16) / 255;
      const g = parseInt(hex.slice(2, 4), 16) / 255;
      const b = parseInt(hex.slice(4, 6), 16) / 255;

      return rgbToHsl(r, g, b);
    };

    const rgbToHsl = (r: number, g: number, b: number): string => {
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
            break;
          case g:
            h = ((b - r) / d + 2) / 6;
            break;
          case b:
            h = ((r - g) / d + 4) / 6;
            break;
        }
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    // Update Tailwind CSS variables
    root.style.setProperty('--background', hexToHsl(colors.bg));
    root.style.setProperty('--foreground', hexToHsl(colors.text));
    root.style.setProperty('--card', hexToHsl(colors.card));
    root.style.setProperty('--card-foreground', hexToHsl(colors.text));
    root.style.setProperty('--primary', hexToHsl(colors.tint));
    root.style.setProperty('--primary-foreground', hexToHsl(colors.onTint));
    root.style.setProperty('--secondary', hexToHsl(colors.surface));
    root.style.setProperty('--secondary-foreground', hexToHsl(colors.text));
    root.style.setProperty('--muted', hexToHsl(colors.surface));
    root.style.setProperty('--muted-foreground', hexToHsl(colors.subtext));
    root.style.setProperty('--accent', hexToHsl(colors.surface));
    root.style.setProperty('--accent-foreground', hexToHsl(colors.text));
    root.style.setProperty('--border', hexToHsl(colors.border));
    root.style.setProperty('--destructive', hexToHsl(colors.danger));
  }, [theme]);
};
