# Layout Analysis — Ansh Soni Portfolio

## Global Layout System

**Container**: max-width=1200px, centered with auto margins, horizontal padding 24px (16px mobile)

**Section Spacing**: 120px vertical padding per section (80px mobile)

**Grid Patterns**:
- 3-column grid (gap: 24px): Work showcase cards, Feature cards, Pricing cards
- 2-column on tablet (768-1023px)
- 1-column on mobile (<768px)

**Breakpoints**: sm:640px, md:768px, lg:1024px, xl:1280px

**Z-Index Hierarchy**: Particle Canvas (0), Page Content (1), Navigation (50), Overlays (100)

**Page Structure**: Single-page with 8 sections (Nav + 6 content + Footer), smooth anchor scrolling

---

## Per-Section Layout Detail

### Navigation
- Fixed position, full-width, z-index 50
- Height: 72px
- Flexbox: space-between (logo left, links+CTA right)
- Mobile (<768px): hamburger menu replaces inline links

### Hero
- Full viewport (100vh), position relative, overflow hidden
- Content: centered via flexbox (align-items center, justify-content center)
- 3D canvas: fixed behind content (z-index 0)
- Bottom 30%: gradient overlay (transparent → dark)
- Content max-width: 900px, text-align center

### Work Showcase
- Full-width, 120px vertical padding
- Header block: centered (badge + heading + subheading)
- Tab bar: centered horizontal flex, 48px below header
- Card grid: 3-column (gap 24px), below tabs
- Mobile: tabs become horizontally scrollable

### Features
- Full-width, 120px vertical padding
- Header block: centered
- Card grid: 3-column (gap 24px)

### Pricing
- Full-width, 120px vertical padding
- Header block: centered
- Card grid: 3-column (gap 24px), equal-height cards
- Middle card: elevated translateY(-8px), visually distinct

### Contact
- Full-width, 120px vertical padding
- Narrow container: max-width 700px
- Header block: centered
- Form: full container width, Glass Card container (padding 48px)
- Social links: centered horizontal flex below form

### Footer
- Full-width, 40px vertical padding
- Flexbox: space-between (copyright left, back-to-top right)
- Mobile: vertical flex, centered

---

## User-Required Layout Features

### Fixed Glassmorphic Navbar
- Glassmorphic blur effect when scrolled (backdrop-filter: blur(12px))
- Transparent → rgba(9,9,11,0.8) background transition
- Logo "Ansh Soni" (ANSH wordmark) left-aligned
- Glowing interaction effects on menu items (cyan underline + color transition)
- Mobile hamburger with full-screen overlay menu

### Hero Section
- Massive futuristic typography (72px desktop, 40px mobile)
- 3D particle background (Three.js canvas, fixed position)
- Tagline + magnetic glowing WhatsApp CTA button
- Scroll indicator (animated chevron)
- Availability badge with pulsing green dot

### Work Showcase (3 Categories)
- Category tab system (3 filter tabs: Local & Business, E-Commerce, Premium Portals)
- 6 project cards with glowing hover effects
- Each card: image, category tag, title, description, tech tags, "Launch Live Preview" button
- Dynamic floating tags (Tag Pill component)
- Tab switching with animated card transitions

### Features Grid
- 6 strength cards in 3x2 grid
- Each card: icon container, title, description
- Neon border hover effect (cyan border glow)
- Glassmorphic card styling

### Pricing Section
- 3-tier pricing cards
- Middle card highlighted as "Most Popular" with cyan glow border
- Feature lists with check/cross icons
- Per-feature pricing displayed prominently
- Custom tailored solutions messaging

### Contact Footer
- Contact form with glassmorphic container
- Neon-styled inputs with glow focus states
- Social media icon buttons (GitHub, LinkedIn, Twitter, Instagram, WhatsApp)
- Micro-interactions on form fields and social buttons

---

## Responsive Strategy

### Desktop (≥1024px)
- 3-column grids for cards
- Full navigation inline
- 72px hero headline

### Tablet (768-1023px)
- 2-column grids for cards
- Full navigation inline (may compress spacing)
- 56px hero headline

### Mobile (<768px)
- 1-column stacked layouts
- Hamburger navigation with full-screen overlay
- 40px hero headline, full-width CTA
- Particle count reduced to 500
- Pricing cards stack, middle card loses translateY offset
- Tab bar becomes horizontally scrollable
