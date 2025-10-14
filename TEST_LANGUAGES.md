# Test Code Block Languages

Try creating a snippet with this content to test language detection:

## JavaScript
\`\`\`javascript
const greeting = "Hello World";
console.log(greeting);
\`\`\`

## Python
\`\`\`python
def greet(name):
    print(f"Hello, {name}!")
greet("World")
\`\`\`

## Rust
\`\`\`rust
fn main() {
    println!("Hello, world!");
}
\`\`\`

## TypeScript
\`\`\`typescript
interface User {
    name: string;
    age: number;
}
const user: User = { name: "Alice", age: 30 };
\`\`\`

## Shell/Bash
\`\`\`bash
echo "Hello World"
ls -la
\`\`\`

## Instructions

1. Create a new snippet with the content above
2. Open the snippet to view it
3. Press F12 to open Developer Console
4. Look for console logs like: "Code block classes: ... Detected language: ..."
5. Share what you see in the console logs

This will help identify how the language classes are being set by the markdown renderer.
