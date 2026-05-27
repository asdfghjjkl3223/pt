# Asset Analysis — Ansh Soni Portfolio

## Asset Summary

| Asset Type | Count | Source |
|------------|-------|--------|
| SVG (code) | 1 | Inline SVG in HTML |
| Images | 6 | AI-generated mockups |
| Icons | ~20 | Lucide icon library (CDN) |
| Fonts | 1 | Google Fonts CDN (Inter) |
| 3D Scene | 1 | Procedural Three.js (no external assets) |

---

## SVG Asset

### Brand Logo

[ASSET: SVG "brand-logo"]
A minimalist wordmark logo reading "ANSH" in a custom geometric sans-serif typeface. Letters are constructed from clean straight lines with subtle angular cuts. Color: Text Primary (#FAFAFA). Height: 32px. The "A" has a distinctive crossbar that extends slightly beyond the letterform, creating a unique identifying mark. The logo includes a small cyan dot (6px) positioned at the top-right of the "H", serving as a subtle accent.

**Implementation**: Inline SVG in HTML. Simple enough to hand-code as SVG paths.

---

## Image Assets (6 Project Mockups)

All 6 images are AI-generated mockup images showing portfolio projects on floating laptop screens.

[ASSET: Image "project-mockup-1"]
580x320px. A modern school website mockup displayed on a floating laptop screen against a dark background. The website shows a clean educational portal with a blue and white color scheme, navigation bar, hero image of students, and course cards. Soft ambient lighting, slight perspective tilt on the laptop. Professional presentation style.

**Used in**: Project Card — "EduVibe Academy" (Local & Business tab)

---

[ASSET: Image "project-mockup-2"]
580x320px. A bold fitness gym website mockup on a floating laptop. Dark theme with neon green accents, featuring a muscular athlete hero image, class schedule section, and membership pricing cards. High contrast, energetic mood. Slight perspective tilt.

**Used in**: Project Card — "IronPulse Gym" (Local & Business tab)

---

[ASSET: Image "project-mockup-3"]
580x320px. A cozy coffee shop website mockup on a floating laptop. Warm brown and cream tones with elegant typography, showing a menu page with artisan coffee photos, online ordering interface, and location map. Inviting, premium aesthetic.

**Used in**: Project Card — "BrewHaven Café" (E-Commerce tab)

---

[ASSET: Image "project-mockup-4"]
580x320px. A luxury real estate website mockup on a floating laptop. Clean white and gold design featuring a stunning property hero image, search filters, property listing cards with prices, and a virtual tour button. Sophisticated, high-end feel.

**Used in**: Project Card — "LuxeLiving Estates" (E-Commerce tab)

---

[ASSET: Image "project-mockup-5"]
580x320px. A futuristic SaaS analytics dashboard mockup on a wide monitor. Dark theme with cyan and purple data visualization charts, sidebar navigation, KPI metric cards, and a real-time graph. Professional, data-dense, cyberpunk aesthetic.

**Used in**: Project Card — "Nexus Dashboard" (Premium Portals tab)

---

[ASSET: Image "project-mockup-6"]
580x320px. An automation workflow builder interface mockup on a floating laptop. Dark theme with colorful node-based visual programming canvas, sidebar with tool panels, and a top toolbar. Technical, sophisticated, modern SaaS aesthetic.

**Used in**: Project Card — "AutoFlow Systems" (Premium Portals tab)

---

## Icon Assets (Lucide Icons)

All icons sourced from Lucide React library (loaded via CDN). Key icons needed:

| Icon | Usage | Size |
|------|-------|------|
| WhatsApp | Hero CTA | 20px |
| ExternalLink | Project cards "Launch Live Preview" | 14px |
| Send | Contact form submit | 18px |
| ChevronDown | Scroll indicator | 24px |
| Menu | Mobile hamburger | 24px |
| X | Mobile close | 24px |
| Check | Pricing feature included | 18px |
| X-circle | Pricing feature excluded | 18px |
| Palette | Feature card — Custom UI/UX | 48px |
| Zap | Feature card — Performance | 48px |
| Smartphone | Feature card — Mobile-First | 48px |
| Brain/Circuit | Feature card — AI Automation | 48px |
| TrendingUp | Feature card — Conversion | 48px |
| Layers | Feature card — Future-Proof | 48px |
| Loader2 | Form spinner | 18px |
| CheckCircle2 | Form success | 18px |
| Github | Social link | 22px |
| Linkedin | Social link | 22px |
| Twitter | Social link | 22px |
| Instagram | Social link | 22px |

---

## Font Assets

### Inter Font Family

**Source**: Google Fonts CDN
**URL**: https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap
**Weights used**: 400 (body), 500 (labels, nav), 600 (buttons, card titles), 700 (H2), 800 (H1)

---

## 3D Scene Asset

The Three.js particle background is fully procedural — no external 3D models, textures, or assets required. All geometry and materials are generated programmatically:

- Particle positions: Float32Array with random values
- Material: PointsMaterial with procedural color
- Scene: empty, no model loading needed

---

## Asset Implementation Notes

1. **Single-file constraint**: Since this is a single HTML file, all assets must be:
   - Inlined (SVG logo)
   - External URLs (images hosted on CDN, fonts from Google Fonts)
   - Generated procedurally (Three.js particles)
   - From CDN libraries (Lucide icons, GSAP, Three.js)

2. **Image hosting**: The 6 project mockup images will need to be hosted externally (e.g., Imgur, Cloudinary, or placed in an assets folder alongside the HTML file). For the single-file delivery, placeholder URLs or base64-encoded images could be used.

3. **Lucide icons**: Load via CDN script tag, then use `lucide.createIcons()` to initialize all icons by data-lucide attributes.

4. **GSAP + ScrollTrigger**: Load via CDN script tags.

5. **Three.js**: Load via CDN script tag.
