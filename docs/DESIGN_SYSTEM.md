# Dowajwo-Woondong Design System Documentation

## 🎨 Overview

The Dowajwo-Woondong design system is inspired by Apple Watch's fitness app aesthetic, featuring neon green accents, dark backgrounds, and modern glow effects. This system is optimized for mobile-first experiences with full dark mode support.

## 📱 Design Philosophy

### Core Principles
- **Activity-Focused**: Inspired by Apple Watch fitness rings
- **High Contrast**: Optimized for quick glancing and readability
- **Dark-First**: Default dark mode for reduced eye strain during workouts
- **Responsive**: Mobile-first design that scales to tablets

### Visual Identity
- **Primary Color**: Neon Green (#32D74B) - Activity and energy
- **Background**: Pure black (#000000) for OLED optimization
- **Typography**: SF Pro system font stack
- **Effects**: Subtle glow effects for interactive elements

## 🎨 Color Palette

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Neon Green | #32D74B | Primary actions, success states, active elements |
| Light Green | #64E35D | Hover states, secondary accents |
| Dark Green | #28A23C | Pressed states, shadows |

### Secondary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Electric Blue | #007AFF | Links, information |
| Orange | #FF9500 | Warnings, secondary actions |
| Red | #FF3B30 | Errors, destructive actions |
| Yellow | #FFD60A | Cautions, highlights |

### Dark Mode Colors
```typescript
dark: {
  background: '#000000',      // Pure black for OLED
  surface: '#1C1C1E',         // Elevated surfaces
  surfaceSecondary: '#2C2C2E', // Input fields
  surfaceTertiary: '#3A3A3C', // Borders, dividers
}
```

### Light Mode Colors
```typescript
light: {
  background: '#FFFFFF',
  surface: '#F2F2F7',
  surfaceSecondary: '#E5E5EA',
  surfaceTertiary: '#D1D1D6',
}
```

## 📐 Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
```

### Type Scale
| Size | Value | Usage |
|------|-------|-------|
| xs | 0.75rem (12px) | Captions, labels |
| sm | 0.875rem (14px) | Body small, buttons |
| base | 1rem (16px) | Body default |
| lg | 1.125rem (18px) | Emphasized text |
| xl | 1.25rem (20px) | Section headers |
| 2xl | 1.5rem (24px) | Page titles |
| 3xl | 1.875rem (30px) | Hero text |

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## 📏 Spacing System

Based on an 8px grid system for consistency:

```typescript
spacing: {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
}
```

## ✨ Effects & Shadows

### Glow Effects
```css
/* Neon Green Glow */
box-shadow: 0 0 20px rgba(50, 215, 75, 0.5),
            0 0 40px rgba(50, 215, 75, 0.3);

/* Strong Glow (Hover) */
box-shadow: 0 0 30px rgba(50, 215, 75, 0.7),
            0 0 60px rgba(50, 215, 75, 0.4);
```

### Button Shadows
```css
/* Default */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

/* Hover */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

/* Neon Button */
box-shadow: 0 0 15px rgba(50, 215, 75, 0.4),
            0 2px 8px rgba(0, 0, 0, 0.2);
```

## 🧩 Component Patterns

### Login Form
- **Container**: Centered card with elevated surface
- **Logo**: Circular with neon glow animation
- **Inputs**: Dark surface with subtle borders
- **Focus State**: Green border with glow effect
- **Submit Button**: Gradient background with neon glow
- **Auto-login**: Checkbox with green accent color

### Input Fields
```typescript
// Base styles
padding: '12px 16px'
background: dark.surfaceSecondary
border: '1px solid rgba(255, 255, 255, 0.1)'
borderRadius: '8px'

// Focus styles
borderColor: colors.primary.neonGreen
boxShadow: '0 0 0 3px rgba(50, 215, 75, 0.2)'
```

### Buttons
```typescript
// Primary Button
background: 'linear-gradient(135deg, #32D74B 0%, #28A23C 100%)'
boxShadow: '0 0 15px rgba(50, 215, 75, 0.4)'

// Secondary Button
background: 'transparent'
border: '2px solid #3A3A3C'

// Hover Effect
transform: 'translateY(-2px)'
boxShadow: '0 0 25px rgba(50, 215, 75, 0.6)'
```

## 🌗 Dark Mode Implementation

### CSS Class Toggle
```javascript
// Add 'dark' class to document root
document.documentElement.classList.add('dark');
```

### Theme Context
```typescript
const { theme, toggleTheme } = useTheme();
const isDark = theme === 'dark';
```

### Conditional Styling
```typescript
color: isDark ? colors.text.dark.primary : colors.text.light.primary
background: isDark ? colors.dark.background : colors.light.background
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First */
@media (min-width: 640px)  /* Tablet */
@media (min-width: 768px)  /* Desktop */
@media (min-width: 1024px) /* Large Desktop */
```

### Mobile Optimization
- Touch-friendly tap targets (minimum 44x44px)
- Larger fonts for readability
- Simplified navigation
- Optimized for one-handed use

## 🎯 Usage Examples

### Import Design Tokens
```typescript
import { colors, typography, spacing, shadows } from '@/lib/design-system';
```

### Apply Theme Colors
```typescript
const styles = {
  button: {
    background: colors.gradients.glowButton,
    color: colors.text.dark.primary,
    boxShadow: shadows.button.neonGreen,
  }
};
```

### Use Theme Context
```typescript
import { useTheme } from '@/contexts/ThemeContext';

function Component() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{
      background: isDark ? colors.dark.background : colors.light.background
    }}>
      {/* Content */}
    </div>
  );
}
```

## 🚀 Best Practices

### Do's
- ✅ Use the design tokens consistently
- ✅ Maintain 8px grid alignment
- ✅ Test in both light and dark modes
- ✅ Ensure touch targets are at least 44x44px
- ✅ Use semantic color names (primary, error, success)

### Don'ts
- ❌ Hard-code color values
- ❌ Mix different spacing units
- ❌ Ignore accessibility contrast ratios
- ❌ Create custom shadows without adding to the system
- ❌ Override system fonts unnecessarily

## 🔧 File Structure

```
lib/design-system/
├── colors.ts       # Color palette and schemes
├── typography.ts   # Font system and scales
├── spacing.ts      # Spacing and border radius
├── shadows.ts      # Shadow and glow effects
└── index.ts        # Main export file

contexts/
└── ThemeContext.tsx # Theme provider and hook

components/auth/
└── LoginForm.tsx   # Login component implementation

docs/
└── DESIGN_SYSTEM.md # This documentation
```

## 📝 Future Enhancements

### Planned Features
- [ ] Animation system with spring physics
- [ ] Component library (buttons, cards, modals)
- [ ] Icon system with custom workout icons
- [ ] Advanced theme customization
- [ ] Accessibility color modes (high contrast)
- [ ] RTL language support

### Design Token Extensions
- [ ] Motion tokens (duration, easing)
- [ ] Z-index scale
- [ ] Opacity scale
- [ ] Blur effects
- [ ] Grid system

## 🎓 Resources

### References
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design Dark Theme](https://material.io/design/color/dark-theme.html)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Palette Generator](https://coolors.co/)
- [Shadow Generator](https://shadows.brumm.af/)

## 📧 Contact

For questions about the design system or contributions, please refer to the main project documentation in CLAUDE.md and README.md.