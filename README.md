# Meet Codetrest — Your Ultimate Markdown-Powered Notes Hub

Experience a sleek, modern UI designed for developers and thinkers. Quickly save code snippets, ideas, or anything else — all with full Markdown support. Easily search, tag, and organize your content by date.

Fast. Clean. Smart.
Try Codetrest today — and level up how you save and find what matters.

---

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
npm tauri dev
```

### Build (Production)
```
npm tauri build
```

---

## Notes
- The first run may take a while as Rust dependencies are compiled.
- Build takes up too much space ~10GB though final application is just 10MB
- Snippets are saved locally (see the app for details).

**P.S:** I developed it because searching for working code takes time and double it when you forget the solution. I wanted a sleek modern save feature with search. I wanted it to serve the use simply without too many distracting features. It's the local Pinterest of Code.