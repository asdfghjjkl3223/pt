# Tech Spec — Ansh Soni Portfolio

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.1 | UI framework |
| react-dom | ^18.3.1 | React DOM renderer |
| three | ^0.170.0 | 3D particle background engine |
| @react-three/fiber | ^8.17.10 | React renderer for Three.js |
| @react-three/drei | ^9.114.0 | Three.js helpers (no helpers used, but standard companion) |
| gsap | ^3.12.5 | Core animation engine, timelines, ScrollTrigger |
| lucide-react | ^0.460.0 | Icon library (WhatsApp, external-link, send, menu, X, check, X-circle, chevron-down, loader, palette, zap, smartphone, brain, trending-up, layers, check-circle-2, github, linkedin, twitter, instagram) |
| tailwindcss | ^3.4.15 | Utility-first CSS |
| autoprefixer | ^10.4.20 | CSS vendor prefixes |
| postcss | ^8.4.49 | CSS processing |
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.3.4 | Vite React plugin |
| typescript | ^5.6.3 | Type safety |
| @types/react | ^18.3.12 | React type definitions |
| @types/react-dom | ^18.3.1 | React DOM type definitions |
| @types/three | ^0.170.0 | Three.js type definitions |

All animation requirements met by GSAP + ScrollTrigger. No AOS library needed — GSAP handles all scroll-triggered animations with greater control.

---

## Component Inventory

### Layout Components

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| PageLayout | Custom | Once | Wraps entire page. Manages ThreeCanvas (fixed z-0) + scrollable content |
| SectionContainer | Custom | 4× | Full-width section wrapper (120px py, 24px px, max-w-1200px centered). Used by Work, Features, Pricing |
| CenteredHeader | Custom | 4× | Badge + H2 + subheading, all centered. Used by Work, Features, Pricing, Contact |
| CardGrid | Custom | 3× | Responsive CSS grid (3/2/1 cols, gap-24px). Used by Work, Features, Pricing |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Fixed glassmorphic navbar. Scroll-aware bg transition. Mobile hamburger + overlay menu |
| Hero | Custom | Full-viewport. 3D canvas background. Load-sequence orchestration |
| WorkShowcase | Custom | Category tab filter + 6 project cards. Tab switch with GSAP card transitions |
| Features | Custom | 6 feature cards in 3×2 grid |
| Pricing | Custom | 3 pricing tiers. Middle card elevated + highlighted |
| Contact | Custom | Contact form + 5 social icon buttons |
| Footer | Custom | Copyright + back-to-top |

### Reusable Components

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| GlassCard | Custom | 6× + variants | Primary container. Backdrop-blur, semi-transparent bg, border. Hover: cyan border glow + translateY(-4px). Used by ProjectCard, FeatureCard, PricingCard, ContactForm |
| NeonButton | Custom | 3× | Primary CTA. Pill shape, cyan bg, glow shadow. Includes magnetic hover effect via ref + mousemove. Variants: default (nav CTA compact), full-width (form submit) |
| GhostButton | Custom | 4× | Secondary button. Transparent + border. Hover: cyan border/text. Used by project cards (×6 instances), pricing standard cards (×2) |
| SectionBadge | Custom | 4× | Pill label above section headings. Cyan accent |
| TagPill | Custom | ~18× | Small tech tags on project cards |
| SocialIconButton | Custom | 5× | Circular icon button with hover glow. Contact section only |
| CategoryTabs | Custom | Once | 3-filter tab bar. Active/inactive states. Animates card grid on switch |
| ScrollIndicator | Custom | Once | Bouncing chevron. Hides on scroll |
| AvailabilityDot | Custom | Once | Pulsing green dot. Pure CSS animation |

### Hooks

| Hook | Purpose |
|------|---------|
| useMagneticButton | Tracks mouse position relative to button, applies lerp-smoothed translation (max ~15px), springs back on leave via GSAP elastic |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| 3D particle background | Three.js + @react-three/fiber | Procedural Points geometry (1500 particles). Custom animate loop: upward drift + Y-wrap + mouse repulsion (30-unit radius, inverse-square) + camera parallax (lerp 0.05). Mobile: 500 particles, no mouse interaction | 🔒 High |
| Page load sequence | GSAP | Single master timeline with 7 staggered tweens (0ms–1000ms). Controls nav, hero elements, canvas opacity | Medium |
| Scroll-triggered section entrances | GSAP + ScrollTrigger | Reusable ScrollTrigger config (start: "top 80%", toggleActions: "play none none none"). Two patterns: FadeUp (opacity + translateY) and ScaleIn (opacity + scale). Applied per-section with stagger | Medium |
| Smooth scroll | GSAP | `gsap.to(window, { scrollTo, duration: 1.2, ease: "power2.inOut" })` on all anchor clicks | Low |
| Navigation scroll effect | GSAP / React state | ScrollTrigger or scroll event listener toggles className at 50px threshold. CSS handles bg/blur/border transition | Low |
| Magnetic button effect | Custom hook + GSAP | `useMagneticButton`: rAF loop tracks mouse offset from button center, applies lerp-smoothed transform. On leave: GSAP.to with elastic.out(1, 0.3), 0.6s spring-back | Medium |
| Tab switch card transitions | GSAP | On tab click: outgoing cards tween out (opacity→0, scale→0.95, 0.2s), then incoming cards tween in (opacity 0→1, scale 0.95→1, 0.3s, stagger 0.08s). Filter state drives which cards render | Medium |
| Form submission flow | GSAP / React state | 3-step state machine (idle → sending → sent → reset). Button text/icon transitions. 1.5s simulated delay via setTimeout | Low |
| Mobile menu open/close | GSAP | Overlay fade (0.3s) + menu items stagger from bottom (0.4s, stagger 0.08s, power3.out). Reverse on close | Low |
| Hamburger → X morph | CSS | Three `<span>` lines. CSS transitions: top rotate+translateY, middle opacity, bottom rotate-translateY | Low |
| Glass card hover | CSS | `transition: all 0.3s ease` on border-color, box-shadow, transform. Pure CSS :hover states | Low |
| Neon button hover | CSS | `transition: all 0.3s ease` on transform (scale 1.05), box-shadow intensification | Low |
| Ghost button hover | CSS | Border/text/bg color transitions on :hover | Low |
| Nav link underline | CSS | Pseudo-element (::after) with width 0→100% transition on :hover | Low |
| Project card image hover | CSS | `transition: transform 0.5s ease-out, opacity 0.3s`. scale(1.08) + cyan overlay opacity on parent :hover | Low |
| Social icon hover | CSS | Multi-property transition (border, bg, color, transform, shadow) on :hover | Low |
| Form input focus | CSS | Border + box-shadow transition on :focus | Low |
| Availability pulse | CSS @keyframes | Infinite scale(1→1.3→1) + opacity pulse. 2s ease-in-out | Low |
| Scroll indicator bounce | CSS @keyframes | Infinite translateY(0→8px→0). 1.5s ease-in-out. JS hides at scrollY > 100px | Low |

---

## State & Logic Plan

### State Architecture

No global state library needed. All state is local to components. Three pieces of shared/coordinated state:

1. **Active tab index** (`WorkShowcase`): Controls which 3 of 6 project cards render. Drives GSAP exit/enter animations on change. Lifted within WorkShowcase only.

2. **Form submission phase** (`Contact`): 4-state enum (`idle` | `sending` | `sent` | `resetting`). Simple state machine: idle → sending (on submit) → sent (after 1.5s) → idle (after 3s total, form cleared). Fully contained in Contact section.

3. **Mobile menu open** (`Navigation`): Boolean toggle. Controls overlay visibility + hamburger icon state. Contained in Navigation.

### Non-Obvious Logic

- **GSAP ScrollTrigger cleanup**: All ScrollTrigger instances must be killed in component cleanup (useEffect return) to prevent memory leaks and double-fires on React strict mode remounts.

- **Three.js animation loop lifecycle**: The particle animation runs via `useFrame` from @react-three/fiber (not manual rAF). Canvas component handles its own cleanup on unmount. Mouse position shared via ref (not state) to avoid re-renders.

- **Master load timeline coordination**: The page load GSAP timeline must be created in a single useEffect, with refs to all target elements. Timeline plays once on mount and is killed on unmount.

- **Tab switch animation sequencing**: Must use GSAP `onComplete` callback to sequence "out" → "filter state update" → "in" to avoid React state change mid-animation causing visual glitches.
