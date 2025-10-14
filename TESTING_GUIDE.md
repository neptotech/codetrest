# Testing the New Markdown Features

## Test Snippets for New Features

### 1. GitHub Flavored Markdown - Tables

Try adding a snippet with this content:

```markdown
# Product Comparison

| Feature | Basic | Pro | Enterprise |
|---------|-------|-----|------------|
| Storage | 10GB | 100GB | Unlimited |
| Users | 1 | 10 | Unlimited |
| Support | Email | Priority | 24/7 |
| Price | $9.99 | $29.99 | Custom |
```

### 2. Task Lists

```markdown
# My TODO List

- [x] Migrate to remark.js
- [x] Add syntax highlighting
- [ ] Test all features
- [ ] Deploy to production
- [ ] Write documentation
```

### 3. Strikethrough

```markdown
# Shopping List

- ~~Milk~~ (already bought)
- Bread
- ~~Eggs~~ (got them)
- Coffee
```

### 4. Code Blocks with Syntax Highlighting

```markdown
# JavaScript Example

\`\`\`javascript
// Async function with arrow syntax
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Usage
fetchData('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(err => console.error(err));
\`\`\`

\`\`\`python
# Python class example
class DataProcessor:
    def __init__(self, name):
        self.name = name
        self.data = []
    
    def process(self, items):
        """Process a list of items"""
        for item in items:
            if self.validate(item):
                self.data.append(item)
        return self.data
    
    def validate(self, item):
        return item is not None and len(str(item)) > 0
\`\`\`

\`\`\`rust
// Rust struct with implementation
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
    
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
\`\`\`
```

### 5. Blockquotes

```markdown
# Important Notes

> **Note:** This is an important message.
> 
> Always backup your data before making changes.

> **Warning:** This action cannot be undone.
```

### 6. Mixed Content

```markdown
# Full Feature Demo

## Overview

This snippet demonstrates **all** the new markdown features.

### Features List

- [x] Tables
- [x] Task lists
- [x] Strikethrough
- [x] Syntax highlighting
- [x] Blockquotes

### Comparison Table

| Feature | Old (marked.js) | New (remark.js) |
|---------|----------------|-----------------|
| GFM Support | Limited | Full |
| Syntax Highlighting | Prism | Shiki/highlight.js |
| Tables | Basic | Enhanced |
| Task Lists | ❌ | ✅ |

### Code Example

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

console.log(users.map(u => u.name));
\`\`\`

> **Tip:** Use inline code like \`const x = 10;\` for short snippets.

### Shopping

- Apples
- ~~Bananas~~ (bought)
- Oranges
- ~~Milk~~ (got it)
```

## What to Look For

1. **Tables**: Should render with proper borders and alternating row colors (light theme)
2. **Task Lists**: Checkboxes should appear and be styled properly
3. **Strikethrough**: Text should have a line through it
4. **Code Highlighting**: 
   - Different colors for keywords, strings, functions
   - Solarized Light theme colors (matching the app's design)
   - Light cream background (--base3: #fdf6e3)
   - Proper formatting and indentation
5. **Blockquotes**: Left border and italic styling
6. **Live Preview**: Should update smoothly as you type (with 120ms debounce)

## Browser Console

Check the browser console (F12) for any errors. The markdown renderer will log errors if there are issues with parsing.
