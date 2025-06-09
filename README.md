# Meet Codetrest — Your Ultimate Markdown-Powered Notes Hub
Experience a sleek, modern UI designed for developers and thinkers. Quickly save code snippets, ideas, or anything else — all with full Markdown support. Easily search, tag, and organize your content by date.

Fast. Clean. Smart.
Try Codetrest today — and level up how you save and find what matters.

---
## Download
Currently prebuilt portable and installer(32bit and 64bit) are provided for windows. Though this application is built for cross platform support. It can be easily built with github actions and soon mac and linux binaries will be released.

Being a student I would like if you could buy this supporting me via Gumroad: [download here](https://electrobyte6.gumroad.com/l/onbsd) Small prices still matter to me.
But that doesn't mean the software is paid, the source code is right above to be built, and you can get the binary for free via an adwall: [download here](https://ouo.io/pC0cFb)

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
npm run tauri dev
```

### Build (Production)
```
npm run tauri build
```

---

## Notes
- The first run may take a while as Rust dependencies are compiled.
- Build takes up too much space ~10GB though final application is just 10MB
- Snippets are saved locally (see the app for details).

**P.S:** I developed it because searching for working code takes time and double it when you forget the solution. I wanted a sleek modern save feature with search. I wanted it to serve the use simply without too many distracting features. It's the local Pinterest of Code.
