# Code Block Toolbar Feature

## Overview
Added an interactive toolbar to code blocks, similar to Prism.js, displaying the language name and a copy button.

## Features

### 1. **Language Label**
- Displays the programming language in uppercase
- Positioned on the left side of the toolbar
- Styled with monospace font (Fira Code)
- Automatically detected from markdown code fence language identifier

### 2. **Copy Button**
- One-click copying of code to clipboard
- Visual feedback with icon changes:
  - Default: 📋 Copy
  - Success: ✅ Copied! (2 seconds)
  - Error: ❌ Failed (2 seconds)
- Hover effect with blue color
- Uses Navigator Clipboard API

## Visual Design

### Toolbar Styling
- Background: Solarized Light `--base2` (#eee8d5)
- Border: Matches code block border color
- Rounded top corners (bottom corners on code block)
- Clean, minimal design matching app theme

### Layout
```
┌─────────────────────────────────────┐
│ JAVASCRIPT              [📋 Copy]   │  ← Toolbar
├─────────────────────────────────────┤
│ const x = 10;                       │
│ console.log(x);                     │  ← Code Block
└─────────────────────────────────────┘
```

## Implementation Details

### Enhanced Function (`markdown-renderer.js`)
```javascript
enhanceCodeBlocks(container)
```
- Scans for all `<pre>` elements
- Extracts language from `language-*` class
- Creates toolbar with language label and copy button
- Wraps code block in container for proper positioning
- Prevents duplicate enhancement

### Integration Points
1. **View Snippet Modal**: Enhanced after markdown rendering
2. **Live Preview**: Enhanced after each update
3. **Debounced**: Works seamlessly with live preview debouncing

## Usage

The enhancement happens automatically when markdown is rendered:

```javascript
renderMarkdown(content).then(html => {
    container.innerHTML = html;
    enhanceCodeBlocks(container);  // Add toolbar
});
```

## Supported Languages

All languages supported by Shiki (100+), including:
- JavaScript/TypeScript
- Python
- Rust
- Java
- C/C++
- Go
- Ruby
- PHP
- Shell/Bash
- HTML/CSS
- SQL
- And many more...

## Browser Compatibility

- **Copy Function**: Requires modern browsers with Clipboard API
- **Fallback**: Shows error message if clipboard access fails
- **Font Awesome Icons**: Already included in the app

## Styling Customization

All styles use Solarized Light variables for consistency:
- `--base2`: Toolbar background
- `--base1`: Borders
- `--base01`: Language text
- `--blue`: Hover states
- `--base00`: Button text

## Testing

Try creating a snippet with:

\`\`\`javascript
const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};
greet('World');
\`\`\`

You should see:
1. "JAVASCRIPT" label on the left
2. "Copy" button on the right
3. Clicking copy shows "Copied!" feedback
4. Code is copied to clipboard

## Future Enhancements

Possible additions:
- Line numbers toggle button
- Expand/collapse for long code blocks
- Direct link to code block
- Download code as file
- Syntax theme switcher
