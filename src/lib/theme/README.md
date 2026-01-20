# Theme System

This theme system provides a comprehensive theming solution for the website with light and dark mode support.

## Usage

### Using the Theme Hook

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  
  // Access theme colors
  const bgColor = theme.colors.bg;
  const textColor = theme.colors.text;
  
  return (
    <div style={{ backgroundColor: bgColor, color: textColor }}>
      Current theme: {resolvedTheme}
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Using CSS Variables

Theme colors are automatically applied as CSS variables. You can use them in your styles:

```css
.my-component {
  background-color: var(--theme-bg);
  color: var(--theme-text);
  border-color: var(--theme-border);
}
```

### Using Tailwind Classes

Theme colors are also mapped to Tailwind CSS variables for compatibility:

- `bg-background` - uses `--background` (theme.bg)
- `text-foreground` - uses `--foreground` (theme.text)
- `bg-card` - uses `--card` (theme.card)
- `border-border` - uses `--border` (theme.border)
- etc.

### Theme Toggle Component

The `ThemeToggle` component is available and can be added anywhere:

```tsx
import { ThemeToggle } from '@/components/ThemeToggle';

<ThemeToggle />
```

## Theme Structure

The theme object contains:

- `scheme`: 'light' | 'dark'
- `colors`: All color definitions
- `roles`: Semantic color roles
- `radius`: Border radius values
- `spacing`: Spacing scale
- `shadow`: Shadow definitions
- `typography`: Typography settings

## Available Themes

- `lightTheme`: Light mode theme
- `darkTheme`: Dark mode theme

Both themes are exported from `@/lib/theme`.
