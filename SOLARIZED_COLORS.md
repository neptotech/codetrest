# Solarized Light Theme Colors for Codetrest

## Overview
Codetrest uses the **Solarized Light** color palette throughout the application, including the new markdown preview and syntax highlighting features.

## Color Palette

### Base Colors (Background/Foreground)
- `--base03: #002b36` - Darkest (not used in light theme)
- `--base02: #073642` - Dark emphasis (used for headings)
- `--base01: #586e75` - Dark comments/secondary
- `--base00: #657b83` - Body text
- `--base0: #839496` - Comments (light theme)
- `--base1: #93a1a1` - Light emphasis
- `--base2: #eee8d5` - Background highlights (inline code)
- `--base3: #fdf6e3` - **Main background** (code blocks, tables)

### Accent Colors
- `--yellow: #b58900` - Highlighted lines
- `--orange: #cb4b16`
- `--red: #dc322f`
- `--magenta: #d33682`
- `--violet: #6c71c4`
- `--blue: #268bd2` - Links, active elements
- `--cyan: #2aa198` - Inline code text, tags
- `--green: #859900`

## Markdown Preview Styling

### Text
- **Body text**: `--base00` (#657b83)
- **Headings**: `--base02` (#073642) - darker for emphasis
- **Links**: `--blue` (#268bd2)
- **Link hover**: `--cyan` (#2aa198)
- **Blockquotes**: `--base01` (#586e75)

### Code
- **Inline code background**: `--base2` (#eee8d5) - subtle highlight
- **Inline code text**: `--cyan` (#2aa198)
- **Code block background**: `--base3` (#fdf6e3) - cream/off-white
- **Code block text**: `--base00` (#657b83)
- **Code block border**: `--base1` (#93a1a1)

### Tables
- **Table borders**: `--base01` (#586e75)
- **Header background**: `--base2` (#eee8d5)
- **Header text**: `--base02` (#073642)
- **Even rows**: `--base3` (#fdf6e3)
- **Odd rows**: white (default)

### Special Elements
- **Highlighted lines**: 15% opacity yellow with left border
- **Highlighted words**: 20% opacity blue background
- **Strikethrough**: `--base01` (#586e75)
- **Task list checkboxes**: Default browser styling

## Syntax Highlighting

The markdown renderer uses **two** syntax highlighters:

1. **Primary: Shiki with Solarized Light theme**
   - Rich, accurate syntax highlighting
   - Matches VSCode's Solarized Light theme
   - Used by `rehype-pretty-code`

2. **Fallback: highlight.js with Solarized Light**
   - Loaded via CDN CSS
   - Provides compatibility when Shiki fails
   - Same color scheme

## Consistency Notes

- All backgrounds use light shades (base2, base3)
- Text uses darker shades (base00, base02) for readability
- Code blocks match the app's overall light aesthetic
- Accent colors (cyan, blue, yellow) provide visual interest
- Border colors (base1, base01) provide subtle separation

## Testing

When testing, verify:
1. ✅ Code blocks have cream background (#fdf6e3)
2. ✅ Inline code has subtle gray background (#eee8d5)
3. ✅ Tables alternate between white and cream
4. ✅ Syntax highlighting uses appropriate colors
5. ✅ Text is easily readable (dark on light)
6. ✅ No dark theme remnants (no dark backgrounds)
