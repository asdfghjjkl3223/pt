# Component Analysis — Ansh Soni Portfolio

## User-Required Components

### 1. Fixed Glassmorphic Navbar
- Fixed position, full-width, 72px height
- Left: "ANSH" wordmark SVG logo (links to #home)
- Right: nav links ("Work", "Services", "Pricing", "Contact") + "Let's Talk" CTA
- Default: transparent background
- Scrolled (scrollY > 50px): bg rgba(9,9,11,0.8), backdrop-filter blur(12px), border-bottom
- Nav link hover: color → cyan, underline animation (width 0→100%)
- Mobile: hamburger icon → full-screen overlay menu
- Smooth scroll to sections on click

### 2. Neon Button (Primary CTA)
- Background: Cyan Neon (#22D3EE)
- Text: dark (#09090B), font 16px weight 600
- Pill shape (border-radius: 9999px), padding 16px 32px
- Box shadow: cyan glow layers
- Hover: scale(1.05), intensified glow
- **Magnetic hover effect**: button translates toward cursor (up to 20% distance), springs back on leave
- Variants: compact (12px 24px, 14px font) for navbar

### 3. Ghost Button (Secondary)
- Transparent bg, border 1px solid white/20
- Text: Text Primary
- Pill shape, same padding
- Hover: border → cyan, text → cyan, bg cyan/5

### 4. Glass Card (Primary Container)
- Background: rgba(24,24,27,0.6), backdrop-filter blur(12px)
- Border: 1px solid rgba(255,255,255,0.08), border-radius 16px
- Box shadow: 0 4px 24px rgba(0,0,0,0.4)
- Padding: 32px
- Hover: border → cyan/30, add cyan glow shadow, translateY(-4px)

### 5. Section Badge
- Pill label above section headings
- Background: cyan/10, border: cyan/20
- Font: 12px weight 500, color: cyan
- Used in: Work, Features, Pricing, Contact sections

### 6. Tag Pill
- Small inline tags for portfolio cards
- Background: white/5, border: white/10, border-radius 6px
- Font: 12px, color: Text Muted
- Used on: project cards for tech stack tags

### 7. Project Card
- Glass Card base with overflow hidden
- Top: image area (220px), object-fit cover
- Image hover: scale 1→1.08, cyan overlay
- Category tag: floating pill on image (top-left)
- Content: title (24px bold), description (2-line clamp), tech tags (Tag Pills)
- Bottom: "Launch Live Preview" Ghost Button
- Total: 6 cards across 3 category tabs

### 8. Feature Card
- Background: zinc-900/40, border: white/6, backdrop-filter blur(8px)
- Border-radius 16px, padding 32px
- Top: icon container (56px circle, cyan/10 bg, 48px icon)
- Title: 20px weight 600
- Description: 14px, Text Secondary
- Hover: border → cyan/20, cyan glow shadow, translateY(-4px)

### 9. Pricing Card
- Glass Card variant with padding 40px
- Plan name, price (40px bold), description
- Feature list: check/cross icons + text, border-bottom separators
- CTA button: Ghost Button (standard) or Neon Button (highlighted)
- Highlighted variant: cyan border, cyan glow shadow, translateY(-8px), "Most Popular" badge
- 3 tiers: Starter ($999), Professional ($2,499 popular), Enterprise ($5,999)

### 10. Contact Form
- Glass Card container (padding 48px)
- Fields: Name, Email, Project Type (select), Message (textarea)
- Input styling: dark bg, white/10 border, 12px radius
- Focus: border → cyan, cyan glow ring
- Submit: Neon Button full-width with send icon
- Submission: "Sending..." → "Message Sent!" → reset flow

### 11. Social Icon Button
- 48px circle, bg white/5, border white/10
- 22px icon, Text Muted
- Hover: border → cyan, bg → cyan/10, icon → cyan, translateY(-3px), cyan glow
- 5 icons: GitHub, LinkedIn, Twitter, Instagram, WhatsApp

### 12. Category Tab Bar
- Horizontal flex, centered, gap 8px
- Inactive: transparent bg, white/10 border, pill shape
- Active: cyan bg, dark text
- Hover (inactive): white/20 border, white/3 bg
- Labels: "Local & Business", "E-Commerce", "Premium Portals"
- Switching: cards animate out then in with stagger

---

## Layout Components (Structural)

### PageLayout
- Wraps entire page
- Manages 3D canvas (fixed, z-0)
- Contains Navigation + main content sections + Footer

### SectionContainer
- Full-width section wrapper
- 120px vertical padding, 24px horizontal
- Max-width 1200px centered content
- Used by: Work, Features, Pricing

### CenteredHeader
- Section Badge + Heading (H2) + Subheading
- All centered, max-width 600px for subheading
- Reusable across: Work, Features, Pricing, Contact

### CardGrid
- CSS Grid with responsive columns
- Gap: 24px
- 3 cols (lg), 2 cols (md), 1 col (sm)
- Used by: Work cards, Feature cards, Pricing cards

---

## Component Hierarchy

```
PageLayout
├── ThreeCanvas (fixed 3D background)
├── Navigation
│   ├── Logo
│   ├── NavLinks
│   └── CTAButton (compact Neon)
├── Hero
│   ├── AvailabilityBadge
│   ├── Headline
│   ├── Tagline
│   ├── CTAButton (Neon with magnetic + WhatsApp icon)
│   └── ScrollIndicator
├── WorkShowcase
│   ├── CenteredHeader
│   ├── CategoryTabs
│   └── CardGrid
│       └── ProjectCard × 6
├── Features
│   ├── CenteredHeader
│   └── CardGrid
│       └── FeatureCard × 6
├── Pricing
│   ├── CenteredHeader
│   └── CardGrid
│       ├── PricingCard (Starter)
│       ├── PricingCard (Professional, highlighted)
│       └── PricingCard (Enterprise)
├── Contact
│   ├── CenteredHeader
│   ├── ContactForm (Glass Card)
│   └── SocialLinks
│       └── SocialIconButton × 5
└── Footer
    ├── Copyright
    └── BackToTop
```
