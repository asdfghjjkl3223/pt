# Animation Analysis — Ansh Soni Portfolio

## User Animation Requirements

The user explicitly requested these animation features:
1. ✅ Three.js 3D floating particles/mesh background
2. ✅ GSAP scroll animations (fade up, slide in, scale)
3. ✅ Smooth scrolling across entire page
4. ✅ 3D elements that move with mouse or auto-rotate
5. ✅ Every element/section/card dynamically animates on scroll
6. ✅ Premium glowing hover effects on cards
7. ✅ Magnetic CTA button

---

## Animation Inventory

### 1. 3D Particle Background (Three.js)

**Type**: Continuous 3D animation
**Library**: Three.js (WebGL)
**Scope**: Global (hero background, fixed canvas)

**Details**:
- 1500 particles (500 mobile), cyan color (#22D3EE), 2px size
- Random spherical distribution (radius 80)
- Continuous upward drift (Y += 0.02/frame), wrap at Y=40→Y=-40
- Mouse repulsion: particles within 30-unit radius pushed outward (inverse-square, max 5 units)
- Camera parallax: shifts up to 3 units based on mouse (lerp 0.05)
- Renderer: alpha true, antialias true, fixed position behind content

**Entrance**: Fades in at 800ms after page load (opacity 0→1 over 2s)

---

### 2. Page Load Sequence

**Type**: Choreographed entrance timeline
**Library**: GSAP
**Scope**: Global

**Timeline**:
| Delay | Element | Animation |
|-------|---------|-----------|
| 0ms | Navigation | opacity 0→1, 0.5s |
| 200ms | Hero badge | opacity 0→1, translateY 20→0, 0.6s |
| 300ms | Hero headline | opacity 0→1, translateY 30→0, 0.8s, power3.out |
| 450ms | Hero tagline | opacity 0→1, translateY 20→0, 0.6s, power3.out |
| 600ms | Hero CTA | opacity 0→1, translateY 20→0, 0.6s, power3.out |
| 800ms | 3D canvas | opacity 0→1, 2.0s |
| 1000ms | Scroll indicator | opacity 0→0.5, 0.5s |

---

### 3. Scroll-Triggered Section Animations (GSAP ScrollTrigger)

**Type**: Scroll-triggered entrance
**Library**: GSAP + ScrollTrigger
**Scope**: All content sections
**Trigger**: element enters viewport at 80% from top

**Patterns**:

**Fade Up** (headers, form elements):
- Initial: opacity 0, translateY 40px
- Final: opacity 1, translateY 0
- Duration: 0.8s, easing: power3.out
- Stagger: 0.15s between siblings

**Scale In** (cards):
- Initial: opacity 0, scale 0.95
- Final: opacity 1, scale 1
- Duration: 0.6s, easing: power2.out
- Stagger: 0.1s (cards), 0.08s (social icons)

**Per-section stagger**:
- Work: header → tabs (0.2s delay) → cards
- Features: header → cards (reading order)
- Pricing: header → cards (left→right, highlighted card 0.8s)
- Contact: header → form (0.2s) → social links (0.3s, stagger 0.08s)

---

### 4. Smooth Scroll

**Type**: Scroll behavior
**Library**: GSAP
**Scope**: All anchor links
**Duration**: 1.2s
**Easing**: power2.inOut

Applied to: nav links, CTA buttons, back-to-top, any in-page anchor

---

### 5. Navigation Scroll Effect

**Type**: Scroll-driven state change
**Scope**: Navigation bar
**Trigger**: scrollY > 50px

**Transition**:
- Background: transparent → rgba(9,9,11,0.8)
- Backdrop-filter: none → blur(12px)
- Border-bottom: none → 1px solid white/5
- Duration: 0.3s ease

---

### 6. Glass Card Hover

**Type**: Hover state transition
**Scope**: All Glass Card components

**Effects**:
- Border: white/8 → cyan/30 (0.3s)
- Box shadow: base → base + cyan glow (0.3s)
- Transform: translateY(0) → translateY(-4px) (0.3s, ease-out)

---

### 7. Neon Button Hover + Magnetic Effect

**Type**: Hover + mouse-tracking
**Scope**: Primary CTA buttons

**Hover**:
- Scale: 1 → 1.05 (0.3s)
- Box shadow: intensified cyan glow (0.3s)

**Magnetic** (JavaScript mousemove):
- Button translates toward cursor (max 20% of distance, ~15px max)
- Smoothed with lerp 0.2 per frame
- On mouseleave: springs back with elastic.out(1, 0.3), 0.6s

---

### 8. Nav Link Hover Underline

**Type**: Hover animation
**Scope**: Navigation links

**Effect**:
- Text color: Text Secondary → Cyan Neon (0.2s)
- Underline (1px cyan): width 0→100% from left (0.3s, ease-out)

---

### 9. Project Card Image Hover

**Type**: Hover transition
**Scope**: Project card images

**Effect**:
- Image scale: 1.0 → 1.08 (0.5s, ease-out)
- Cyan overlay: opacity 0 → 0.05 (0.3s)

---

### 10. Social Icon Hover

**Type**: Hover transition
**Scope**: Social media icon buttons

**Effect**:
- Border: white/10 → cyan (0.3s)
- Background: white/5 → cyan/10 (0.3s)
- Icon color: Text Muted → cyan (0.3s)
- Transform: translateY(0) → translateY(-3px) (0.3s)
- Box shadow: none → cyan glow (0.3s)

---

### 11. Form Input Focus

**Type**: Focus transition
**Scope**: All form inputs

**Effect**:
- Border: white/10 → cyan (0.2s)
- Box shadow: none → cyan ring (0 0 0 3px cyan/10) (0.2s)
- Outline: none

---

### 12. Availability Pulse

**Type**: Continuous CSS animation
**Scope**: Hero availability dot

```
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
}
```
- Duration: 2s, ease-in-out, infinite
- 8px circle, Emerald Neon

---

### 13. Scroll Indicator Bounce

**Type**: Continuous CSS animation
**Scope**: Hero scroll chevron

```
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}
```
- Duration: 1.5s, ease-in-out, infinite
- Hides when scrollY > 100px (opacity→0, 0.3s)

---

### 14. Tab Switch Animation

**Type**: State transition
**Scope**: Work showcase tab filter

**Out animation**: Current cards → opacity 0, scale 0.95, 0.2s
**In animation**: New cards → opacity 0→1, scale 0.95→1, 0.3s, stagger 0.08s

---

### 15. Form Submission Flow

**Type**: Multi-step state animation
**Scope**: Contact form

**Step 1 (Submit)**:
- Button text: "Send Message" → "Sending..."
- Icon: send → spinning spinner (360°/1s linear infinite)
- Inputs: disabled, opacity 0.5

**Step 2 (Success, 1.5s delay)**:
- Button text: "Sending..." → "Message Sent!"
- Icon: spinner → checkmark
- Background: cyan → Emerald Neon
- Glow: cyan → emerald

**Step 3 (Reset, 3s total)**:
- Button returns to original state
- Inputs re-enabled, form cleared

---

### 16. Mobile Menu

**Type**: Open/close animation
**Scope**: Mobile navigation

**Open**:
- Overlay: opacity 0→1 (0.3s)
- Menu items: stagger from bottom (opacity 0→1, translateY 30→0, 0.4s, stagger 0.08s, power3.out)

**Close**:
- Items: opacity 1→0 (0.2s)
- Overlay: opacity 1→0 (0.3s)

**Hamburger → X**:
- Top line: rotate 45°, translateY 8px (0.3s)
- Middle: opacity→0 (0.2s)
- Bottom: rotate -45°, translateY -8px (0.3s)

---

## Animation Library Choices

| Library | Purpose | Justification |
|---------|---------|---------------|
| Three.js | 3D particle background | User requirement, best WebGL performance |
| GSAP | Scroll animations, timelines, magnetic button | Industry standard, ScrollTrigger, elastic easings |
| CSS Animations | Simple loops (pulse, bounce) | Lightweight for continuous animations |
| CSS Transitions | Hover states | Native, performant, no JS overhead |

All libraries are used via CDN as user requested (Three.js, GSAP, AOS implied). Note: GSAP covers all scroll animation needs — AOS is not strictly required but can supplement simpler fade effects.
