---
name: Premium Tech Dark Mode
colors:
  surface: '#121317'
  surface-dim: '#121317'
  surface-bright: '#38393d'
  surface-container-lowest: '#0d0e12'
  surface-container-low: '#1a1b1f'
  surface-container: '#1e1f23'
  surface-container-high: '#292a2e'
  surface-container-highest: '#343539'
  on-surface: '#e3e2e7'
  on-surface-variant: '#c4c5d9'
  inverse-surface: '#e3e2e7'
  inverse-on-surface: '#2f3034'
  outline: '#8e90a2'
  outline-variant: '#434656'
  surface-tint: '#b8c3ff'
  primary: '#b8c3ff'
  on-primary: '#002388'
  primary-container: '#2e5bff'
  on-primary-container: '#efefff'
  inverse-primary: '#124af0'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#c9c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#6e6d6d'
  on-tertiary-container: '#f3f0ef'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c3ff'
  on-primary-fixed: '#001356'
  on-primary-fixed-variant: '#0035be'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121317'
  on-background: '#e3e2e7'
  surface-variant: '#343539'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

This design system is built for a high-end mobile commerce experience, focusing on a sense of "Tech-Forward Luxury." It targets tech enthusiasts and premium buyers who value precision and sophistication. 

The aesthetic blends **Minimalism** with **Corporate Modern** sensibilities. It prioritizes content—the devices—by using a deep, recessive background palette that allows product imagery to pop. The emotional response should be one of trust, innovation, and exclusivity. Visual interest is maintained through subtle light-play on borders and high-precision typography rather than heavy decorative elements.

## Colors

The palette is rooted in deep blacks and charcoal greys to create a true-dark environment that reduces eye strain and emphasizes premium hardware.

- **Primary (Electric Blue):** Used sparingly for calls to action, active states, and critical highlights. It provides the "energy" within the dark environment.
- **Surface Tiers:** We use a stepped-up grey approach for depth. The base background is nearly black, while interactive cards and containers use slightly lighter charcoal shades to create a perceptible hierarchy without relying on heavy shadows.
- **Accents:** Borders use low-opacity whites (8-12%) to create "hairline" definitions that catch the light, mimicking the edges of high-end smartphone hardware.

## Typography

This design system utilizes **Inter** for its entire scale to maintain a clean, systematic feel. The typeface’s high x-height and neutral character are ideal for technical specs and price points.

- **Scale:** High contrast between display sizes and body text creates a clear information hierarchy. 
- **Tight Tracking:** Headlines use slightly negative letter-spacing to appear more "locked-in" and editorial.
- **Weight:** We rely on font weight (Regular vs SemiBold) to differentiate between labels and values in product specification tables.

## Layout & Spacing

The layout follows a **fluid grid** model tailored for mobile-first consumption but scalable to desktop. 

- **8pt Grid System:** All spacing and component heights are multiples of 8px to ensure mathematical harmony.
- **Content Density:** In the mobile selling context, we use generous vertical padding (`40px` to `64px`) between product sections to allow the eye to rest and emphasize individual items.
- **Safe Areas:** A standard 20px margin is maintained on the horizontal edges of the viewport to prevent content from crowding the screen edges.

## Elevation & Depth

Hierarchy is achieved primarily through **Tonal Layers** and **Subtle Outlines** rather than traditional drop shadows.

- **Stacking:** The further an element is "forward," the lighter its surface color becomes. (e.g., Background: #050505 -> Card: #121212 -> Modal: #1C1C1E).
- **Subtle Borders:** Every elevated container features a 1px solid border at 8% white opacity. This creates a "glass-edge" effect that is essential for the premium feel.
- **Soft Ambient Shadows:** For critical floating elements (like a "Buy Now" sticky bar), use a large-radius (24px), low-opacity (40%) black shadow to lift it off the background without creating muddy "dirt" on the dark UI.

## Shapes

The design system uses a **Rounded** shape language to soften the "tech" aesthetic and make it more approachable.

- **Base Radius:** 0.5rem (8px) is the standard for cards and input fields.
- **Large Radius:** 1.5rem (24px) is used for parent containers and major promotional banners to create a modern, "contained" look.
- **Pill Shapes:** Used exclusively for tags, badges, and the primary CTA buttons to make them instantly recognizable as interactive elements.

## Components

### Buttons
- **Primary:** Solid Electric Blue with white text. Pill-shaped. Subtle inner glow (top border 1px, white, 20% opacity) to add a 3D tactile feel.
- **Secondary:** Ghost style with a 1px white (15% opacity) border. White text.

### Cards
- Surfaces use the `#121212` charcoal grey.
- Imagery should have no background or a perfectly matched dark background to blend into the card.
- 1px hairline borders are mandatory to separate cards from the background.

### Input Fields
- Filled style using `#1C1C1E`. 
- Bottom-only border or full subtle border that glows Electric Blue upon focus.
- Placeholder text in `#71717A`.

### Chips & Badges
- Used for "In Stock" or "New Release" indicators. 
- Small, pill-shaped, with low-opacity background tints of the status color (e.g., 10% green for "In Stock").

### Product Lists
- Use horizontal scrolling "Carousels" for product categories to maintain a clean vertical scan.
- List items feature a 1px divider line at 5% white opacity to create separation without clutter.