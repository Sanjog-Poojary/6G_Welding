# Frontend Visual Documentation
## Project Antigravity — 6G Welder Hiring Landing Page

**Version:** 1.0.0
**Author:** Design & Frontend Platform
**Status:** Approved
**Last Updated:** June 7, 2026

---

## 1. Design Philosophy

### Concept Direction: **Industrial Minimal**

Project Antigravity is built around a single visual principle: *the authority of precision*. Just as 6G welding demands mastery, control, and zero tolerance for error — the interface must communicate exactly the same. No noise. No decoration without purpose. Every element earns its place.

**Aesthetic Keywords:** Structural. Weighted. Trustworthy. Quiet confidence.

This is not a flashy tech startup landing page. It is a serious recruiting instrument for a demanding trade. The visual language must signal:
- Credibility and professionalism
- Respect for the skilled tradesperson
- Clarity above all else

**What to avoid:**
- Rounded, friendly, consumer-app visual patterns
- Purple, magenta, or saturated gradient palettes
- Playful iconography or cartoon illustrations
- Cluttered layouts with too many visual elements competing

---

## 2. Color System

All colors are defined as CSS custom properties and mapped to Tailwind via `tailwind.config.js`.

### Primary Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-ground` | `#F4F5F6` | 244, 245, 246 | Page background |
| `--color-surface` | `#FFFFFF` | 255, 255, 255 | Card / form surfaces |
| `--color-surface-alt` | `#ECEEF0` | 236, 238, 240 | Subtle section background |
| `--color-ink` | `#111418` | 17, 20, 24 | Primary text |
| `--color-ink-secondary` | `#4A5568` | 74, 85, 104 | Secondary/body text |
| `--color-ink-muted` | `#8A9BB0` | 138, 155, 176 | Labels, captions |
| `--color-border` | `#D4DBE3` | 212, 219, 227 | Borders, dividers |

### Steel Blue Accent Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent-900` | `#1B2B3A` | Hero background, section darks |
| `--color-accent-700` | `#2D4A63` | Primary buttons, strong accents |
| `--color-accent-500` | `#4A7A9B` | Secondary accents, icon tints |
| `--color-accent-300` | `#8BAFC7` | Hover states, subtle highlights |
| `--color-accent-100` | `#D6E8F2` | Light tints, badge backgrounds |

### Metallic / Utility

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-metal-dark` | `#3D4F5C` | Dark icon fills |
| `--color-metal-mid` | `#708090` | Metallic accents, rule lines |
| `--color-metal-light` | `#B0BEC5` | Subtle decorative elements |
| `--color-success` | `#2D6A4F` | Form success states |
| `--color-error` | `#9B2335` | Form error states |

### ⛔ Forbidden Colors
The following colors are **explicitly prohibited** in any form:

```
Purple:     #800080, #9B59B6, #6C3483, and all HSL hue 270–310 variants
Magenta:    #FF00FF and variants
Lavender:   Any hue 250–290 above 40% saturation
```

---

## 3. Typography

### Font Stack

| Role | Family | Weight | Usage |
|------|--------|--------|-------|
| **Display** | `Barlow Condensed` | 700, 800 | Hero headline, section numbers |
| **Heading** | `Barlow` | 600, 700 | Section titles, card headings |
| **Body** | `DM Sans` | 400, 500 | Body text, form labels, bullets |
| **Mono** | `JetBrains Mono` | 400 | Code snippets (internal docs only) |

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@400;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
```

### Type Scale (rem, base 16px)

| Name | Size | Line Height | Tracking | Usage |
|------|------|------------|---------|-------|
| `display-xl` | 5.0rem (80px) | 1.0 | -0.04em | Hero primary headline |
| `display-lg` | 3.5rem (56px) | 1.05 | -0.03em | Section mega-titles |
| `heading-xl` | 2.25rem (36px) | 1.15 | -0.02em | Section titles |
| `heading-lg` | 1.5rem (24px) | 1.3 | -0.01em | Card titles, sub-sections |
| `body-lg` | 1.125rem (18px) | 1.65 | 0 | Lead text, form labels |
| `body-md` | 1rem (16px) | 1.7 | 0 | Standard body |
| `body-sm` | 0.875rem (14px) | 1.6 | 0.01em | Captions, helper text |
| `label-sm` | 0.75rem (12px) | 1.4 | 0.08em | Uppercase labels, badges |

### Typography Rules
- **Never** mix more than 2 font families on a single page
- **Labels** (form inputs, badges) use `label-sm` at `uppercase` + `letter-spacing: 0.08em`
- **Headlines** are always set in `Barlow Condensed`, left-aligned or centered — never justified
- **Body text** max line length: `70ch` on desktop, `100%` on mobile

---

## 4. Spacing & Layout

### Base Grid
- **Layout width:** Max `1200px`, centered, `padding-inline: 1.5rem` (mobile) → `2rem` (desktop)
- **Grid system:** 12-column CSS Grid for complex sections; Flexbox for single-axis layouts
- **Section vertical rhythm:** `padding-block: 5rem` (80px) on desktop, `3.5rem` (56px) on mobile

### Spacing Scale (Tailwind tokens)
```
4px  → spacing-1  (micro: icon gaps, input padding-inline)
8px  → spacing-2  (small: label-to-input gaps)
12px → spacing-3  (element internal padding)
16px → spacing-4  (standard component gap)
24px → spacing-6  (section element spacing)
32px → spacing-8  (component block spacing)
48px → spacing-12 (section sub-element gap)
64px → spacing-16 (large section rhythm)
80px → spacing-20 (section vertical padding)
```

### Section Layout Map

```
┌─────────────────────────────────────────────────┐
│  HEADER / NAV (optional, minimal)               │  h: 64px
├─────────────────────────────────────────────────┤
│  HERO SECTION                                   │  min-h: 85vh
│  ┌──────────────────┐   ┌──────────────────┐    │
│  │ Headline (2/3)   │   │ Hero Media (1/3) │    │
│  │ + CTA            │   │ or ambient bg    │    │
│  └──────────────────┘   └──────────────────┘    │
├─────────────────────────────────────────────────┤
│  REQUIREMENTS SECTION                           │  pt: 80px
│  Section label + title                          │
│  ┌──────────────┬──────────────┬────────────┐   │
│  │ Req item     │ Req item     │ Req item   │   │
│  └──────────────┴──────────────┴────────────┘   │
├─────────────────────────────────────────────────┤
│  BENEFITS SECTION (dark bg: accent-900)         │  pt: 80px
│  ┌──────────────┬──────────────┬────────────┐   │
│  │ Benefit card │ Benefit card │ Benefit    │   │
│  └──────────────┴──────────────┴────────────┘   │
├─────────────────────────────────────────────────┤
│  APPLICATION FORM SECTION                       │  pt: 80px
│  Centered, max-w: 640px                         │
│  [ Form fields stack vertically ]               │
│  [ Submit CTA ]                                 │
├─────────────────────────────────────────────────┤
│  FOOTER (minimal)                               │  h: 80px
└─────────────────────────────────────────────────┘
```

---

## 5. Component Specifications

### 5.1 Hero Section

**Layout:** Full-width, dark background (`accent-900`), 85vh minimum height
**Background treatment:** Subtle noise texture overlay at 4% opacity + diagonal rule lines at 6% opacity in steel blue. Creates a physical, structural feeling.
**Text color:** `#FFFFFF` primary, `accent-300` for the subheadline

```
┌──────────────────────────────────────────────────┐
│  [LOGO / BRAND]                                  │  ← top-left, 40px from edges
│                                                  │
│                                                  │
│  HIRING EXPERT          ← Barlow Condensed 800,  │
│  6G WELDERS               80px, uppercase        │
│                                                  │
│  We're seeking certified 6G welders for...       │  ← DM Sans 18px, accent-300
│                                                  │
│  [ APPLY NOW → ]                                 │  ← Button spec below
│                                                  │
│  ─────────────────────────────                   │  ← 1px rule, metal-mid
│  ✓ Competitive pay  ✓ Safety-first  ✓ Long-term  │  ← trust bar, label-sm
└──────────────────────────────────────────────────┘
```

### 5.2 Primary Button (CTA)

```
Background:    accent-700 (#2D4A63)
Text:          #FFFFFF, Barlow 600, 16px, letter-spacing: 0.04em, uppercase
Padding:       14px 32px
Border-radius: 2px  ← deliberately sharp, not pill-shaped
Border:        none
Hover:         background → accent-500, transform: translateY(-1px)
Active:        transform: translateY(0), background → accent-900
Transition:    all 200ms ease
Arrow icon:    → rendered after text, 16px, moves 4px right on hover
```

### 5.3 Requirement Item Card

```
Layout:        Flexbox, row, gap: 16px
Border:        1px solid border (#D4DBE3), left-border: 3px solid accent-500
Padding:       20px 24px
Background:    surface (#FFFFFF)
Border-radius: 0px (sharp corners — industrial)
Icon:          24px × 24px, metal-dark fill, Phosphor Icons (Wrench, Shield, etc.)
Title:         Barlow 600, 16px, ink
Description:   DM Sans 400, 14px, ink-secondary
```

### 5.4 Benefits Card (dark section)

```
Background:    rgba(255,255,255,0.06)
Border:        1px solid rgba(255,255,255,0.12)
Padding:       32px
Border-radius: 0px
Number/Stat:   Barlow Condensed 800, 48px, accent-300
Label:         DM Sans 500, 14px, uppercase, letter-spacing 0.1em, metal-light
Description:   DM Sans 400, 14px, rgba(255,255,255,0.65)
```

### 5.5 Form Fields

```
Label:
  Font:        DM Sans 500, 13px, uppercase, letter-spacing: 0.07em
  Color:       ink-secondary (#4A5568)
  Margin-btm: 6px

Input (text, email, tel):
  Height:      52px
  Padding:     0 16px
  Background:  #FFFFFF
  Border:      1.5px solid border (#D4DBE3)
  Border-radius: 0px (sharp)
  Font:        DM Sans 400, 16px, ink
  Focus:       border-color: accent-700, outline: 3px solid accent-100, offset: 0
  Error:       border-color: #9B2335, bg: #FEF2F2
  Placeholder: ink-muted

Select:
  Same as input, custom chevron icon (no system default)

File Upload Zone:
  Layout:      Border dashed 2px border, full-width
  Height:      min 100px
  Padding:     24px
  Text:        "Drop file here or click to browse" — DM Sans 14px, ink-muted
  Accepted:    PDF, JPG, PNG — shown as small label-sm text
  Max size:    5MB — shown inline
  Drag-over:   border-color: accent-500, bg: accent-100
  Uploaded:    Show filename + filesize + red ✕ button to remove
```

### 5.6 Submit Button (Form Context)

```
Full-width of form container
Background:    accent-900 (#1B2B3A)
Text:          #FFFFFF, Barlow 700, 17px, letter-spacing: 0.05em, uppercase
Height:        56px
Border-radius: 0px
Disabled:      opacity: 40%, cursor: not-allowed
Loading:       Replace text with spinner (12px, white), text: "Submitting..."
Success:       background: success-green, text: "Application Received ✓"
```

---

## 6. Animation & Motion

### Principles
- **Purposeful only** — every animation must aid comprehension or delight without distracting
- **Subtle by default** — max 300ms, ease-out timing, no bouncy spring physics
- **Scroll-triggered reveals** — elements animate in as they enter the viewport

### Motion Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `duration-fast` | `150ms` | Hover state transitions |
| `duration-base` | `220ms` | Button press, focus ring |
| `duration-slow` | `380ms` | Page element reveals |
| `easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | General transitions |
| `easing-decelerate` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering screen |

### Scroll-Reveal Pattern (Intersection Observer)
```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 380ms ease-out, transform 380ms cubic-bezier(0.2, 0, 0, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```
Apply staggered delay (`animation-delay: calc(var(--index) * 80ms)`) to sibling lists.

---

## 7. Iconography

**Library:** Phosphor Icons (React package: `@phosphor-icons/react`)
**Weight used:** `Regular` for UI icons, `Bold` for emphasis icons
**Size:** 
- Navigation / inline: 20px
- Card icons: 24px
- Hero decorative: 32–48px

### Icon Usage Guide

| Icon | Usage |
|------|-------|
| `Wrench` | SMAW/welding skills |
| `Certificate` | 6G Certification |
| `Blueprint` | Drawing interpretation |
| `ShieldCheck` | Safety compliance |
| `CurrencyDollar` | Pay/compensation |
| `HardHat` | Site safety |
| `Timer` | Project duration |
| `ArrowRight` | CTA button arrow |
| `UploadSimple` | File upload zone |
| `CheckCircle` | Success state |
| `WarningCircle` | Error state |

---

## 8. Responsive Breakpoints

| Name | Min-width | Max-width | Columns |
|------|-----------|-----------|---------|
| `xs` | 0px | 479px | 1 |
| `sm` | 480px | 767px | 1-2 |
| `md` | 768px | 1023px | 2 |
| `lg` | 1024px | 1279px | 3 |
| `xl` | 1280px | — | 3 |

### Mobile-First Rules
- Hero headline: `display-xl` (80px) → `3rem` (48px) on mobile
- Requirements grid: 3-col desktop → 1-col mobile (stacked)
- Benefits grid: 3-col desktop → 1-col mobile
- Form: max-width `640px` centered on desktop → full-width mobile
- Section padding: `80px` desktop → `48px` mobile

---

## 9. Accessibility Standards

| Requirement | Implementation |
|-------------|----------------|
| Color contrast (text) | All body text ≥ 7:1 against bg (AAA) |
| Color contrast (UI) | All interactive elements ≥ 4.5:1 (AA) |
| Focus indicators | 3px solid `accent-300`, offset 2px, on ALL interactive elements |
| Form labels | Every input has an explicit `<label>` with `htmlFor` |
| Error announcements | ARIA `role="alert"` on error messages |
| File upload | Keyboard-accessible, labelled with `aria-label` |
| Motion | Respects `prefers-reduced-motion`: disables all transforms & transitions |
| Screen reader | Semantic HTML5: `<main>`, `<section>`, `<nav>`, `<form>`, headings in order |

---

## 10. File & Asset Conventions

### Directory Structure
```
/public
  /fonts      ← Self-hosted fallback fonts if needed
  /images
    hero-bg.webp     ← Dark industrial texture/photo
    logo.svg
  /icons        ← Any custom SVG icons not in Phosphor

/styles
  globals.css   ← CSS custom properties (design tokens)
```

### CSS Variables (globals.css)
```css
:root {
  /* Colors */
  --color-ground:       #F4F5F6;
  --color-surface:      #FFFFFF;
  --color-surface-alt:  #ECEEF0;
  --color-ink:          #111418;
  --color-ink-secondary:#4A5568;
  --color-ink-muted:    #8A9BB0;
  --color-border:       #D4DBE3;

  --color-accent-900:   #1B2B3A;
  --color-accent-700:   #2D4A63;
  --color-accent-500:   #4A7A9B;
  --color-accent-300:   #8BAFC7;
  --color-accent-100:   #D6E8F2;

  --color-metal-dark:   #3D4F5C;
  --color-metal-mid:    #708090;
  --color-metal-light:  #B0BEC5;

  --color-success:      #2D6A4F;
  --color-error:        #9B2335;

  /* Typography */
  --font-display:       'Barlow Condensed', sans-serif;
  --font-heading:       'Barlow', sans-serif;
  --font-body:          'DM Sans', sans-serif;

  /* Spacing */
  --section-padding-y:  5rem;

  /* Radii */
  --radius-sm:          0px;
  --radius-md:          0px;
  --radius-lg:          2px;

  /* Motion */
  --duration-fast:      150ms;
  --duration-base:      220ms;
  --duration-slow:      380ms;
  --easing-standard:    cubic-bezier(0.2, 0, 0, 1);
}
```

---

## 11. Do / Don't Reference

### ✅ DO
- Use sharp corners (border-radius: 0px or max 2px) on cards and buttons
- Use left-border accents (3px solid) instead of full borders for visual weight
- Let white space breathe — resist filling every section
- Use `Barlow Condensed` at large sizes only — it is a display font
- Keep form interactions immediate and responsive (real-time validation)
- Use uppercase sparingly and intentionally (labels, badges, CTA buttons only)

### ❌ DON'T
- Round everything into pill buttons or full-radius cards
- Use shadows as a primary design element — use borders instead
- Mix warm and cool tones (this design is purely cool — no warm yellows or oranges)
- Use purple in any accent, hover, or highlight state
- Add decorative gradients across headline text
- Use system fonts (Arial, Helvetica, -apple-system) for any displayed text

---

## 12. Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | Jun 7, 2026 | Initial visual doc — approved |
