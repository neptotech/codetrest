# Meet Codetrest — Your Ultimate Markdown-Powered Notes Hub
Experience a sleek, modern UI designed for developers and thinkers. Quickly save code snippets, ideas, or anything else — all with full Markdown support. Easily search, tag, and organize your content by date.  

Fast. Clean. Smart.  
Try Codetrest today — and level up how you save and find what matters.  

---
## Download
Currently prebuilt portable and installer(32bit and 64bit) are provided for windows. Though this application is built for cross platform support. It can be easily built with github actions and soon mac and linux binaries will be released.  

Being a student I would like if you could buy this supporting me via Gumroad: [download here](https://neptotech.gumroad.com/l/onbsd) Small prices still matter to me.  
But that doesn't mean the software is paid, the source code is right above to be built, and you can get the binary for free via an adwall: [download here](https://ouo.io/pC0cFb)  
If you prefer full amount to get to me, please gift [Amazon giftcard](https://www.amazon.in/Amazon-Pay-eGift-Card-First/dp/B0BPG9HXJ2/) via Email to neptotechnologies@gmail.com
## Installation & Setup

1. **Install [Node.js](https://nodejs.org/)** (if you don't have it already).
2. **Install [Rust](https://www.rust-lang.org/tools/install)** (required for Tauri backend).
3. **Install dependencies:**
   ```
   npm install
   ```
---

## Usage

### Start (Development)
```
npm run dev           # Start Vite dev server
npm run tauri dev     # Start Tauri app (runs vite automatically)
```

### Build (Production)
```
npm run build         # Build frontend
npm run tauri build   # Build Tauri app (runs build automatically)
```

---

## Features

### Enhanced Markdown Support
Codetrest now uses **remark.js** with advanced rendering capabilities:

- ✅ **GitHub Flavored Markdown (GFM)**
  - Tables with styling
  - Task lists (checkboxes)
  - Strikethrough text
  - Autolinks
  
- ✅ **Advanced Syntax Highlighting**
  - Powered by Shiki with Solarized Light theme
  - Support for 100+ programming languages
  - Line and word highlighting
  - Fallback to highlight.js for compatibility

- ✅ **Live Preview**
  - Real-time markdown rendering as you type
  - Debounced updates for smooth performance
  - Error handling with helpful messages

- ✅ **Rich Typography**
  - Beautiful code blocks with proper formatting
  - Styled blockquotes
  - Enhanced tables
  - Custom scrollbars

### Organization Features
- 🔍 **Search** - Find snippets by title, description, tags, or content
- 🏷️ **Tags** - Organize with multiple tags and filter by tag
- ⭐ **Favorites** - Star important snippets for quick access
- 📅 **Sorting** - Sort by date, title (A-Z or Z-A)
- 👁️ **Recent** - View recently accessed snippets

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for examples of all markdown features.

---

## Notes
- The first run may take a while as Rust dependencies are compiled.
- Build takes up too much space ~10GB though final application is just 10MB
- Snippets are saved locally (see the app for details).

**P.S:** I developed it because searching for working code takes time and double it when you forget the solution. I wanted a sleek modern save feature with search. I wanted it to serve the use simply without too many distracting features. It's the local Pinterest of Code.
