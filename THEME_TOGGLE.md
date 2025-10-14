# Theme Toggle Feature

## Overview
Added a theme toggle button that switches between Solarized Light (default) and Atom Material Dark theme.

## Features

### 🌓 Theme Toggle Button
- **Location**: Top right of header, next to search box
- **Icon**: 🌙 Moon for light theme, ☀️ Sun for dark theme
- **Tooltip**: "Switch to dark/light theme"
- **Animation**: Smooth rotation on click

### 🎨 Color Schemes

#### Solarized Light (Default)
- Background: #fdf6e3 (cream)
- Text: #657b83 (gray)
- Accent: #268bd2 (blue)
- Code blocks: Light cream background
- Perfect for daytime use

#### Atom Material Dark
- Background: #263238 (dark blue-gray)
- Text: #b0bec5 (light gray)  
- Accent: #82aaff (bright blue)
- Code blocks: Dark background with vibrant syntax colors
- Easy on the eyes for night coding

### 💾 Theme Persistence
- Selected theme is saved to `localStorage`
- Automatically restored on app restart
- Key: `'theme'` with values: `'light'` or `'dark'`

### 🎯 Syntax Highlighting

**Light Theme:**
- Shiki: `solarized-light`
- Highlight.js fallback: `solarized-light`

**Dark Theme:**
- Shiki: `material-theme-darker`
- Highlight.js fallback: `atom-one-dark`

## Implementation Details

### Color Variables
Uses CSS custom properties for easy theme switching:
```css
:root {
  /* Solarized Light colors */
}

[data-theme="dark"] {
  /* Atom Material Dark colors */
}
```

### Theme Application
```javascript
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Updates icon, highlight.js theme
    // Re-renders preview if open
}
```

### Smooth Transitions
- Background, text colors: 0.3s ease
- Button hover effects
- Icon rotation on click

## Files Modified

1. **index.html**
   - Added dark theme CSS variables
   - Added theme toggle button in header
   - Added second highlight.js theme link
   - Added theme transition styles

2. **main.js**
   - Added theme management functions
   - Added theme toggle event listener
   - Theme auto-applied on init
   - Preview re-rendered on theme change

3. **markdown-renderer.js**
   - Detects current theme
   - Uses appropriate Shiki theme
   - `material-theme-darker` for dark
   - `solarized-light` for light

## Usage

### Toggle Theme
Click the moon/sun icon in the top right to switch themes.

### Programmatic Access
```javascript
// Get current theme
let theme = localStorage.getItem('theme'); // 'light' or 'dark'

// Set theme
setTheme('dark');
setTheme('light');

// Toggle
toggleTheme();
```

## Benefits

1. **Reduced Eye Strain**: Dark theme for night coding
2. **Better Focus**: Choose theme that suits environment
3. **Consistent Experience**: All UI elements adapt
4. **Code Readability**: Optimized syntax highlighting for each theme
5. **User Preference**: Saved and restored automatically

## Testing

1. Click moon icon → Should switch to dark theme
2. All colors should update smoothly
3. Code blocks should use dark syntax highlighting
4. Click sun icon → Back to light theme
5. Refresh app → Theme should persist

## Future Enhancements

Possible additions:
- Auto theme based on system preference
- More theme options (Dracula, Nord, etc.)
- Custom theme creator
- Per-snippet theme override
- Theme preview before switching
