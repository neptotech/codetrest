import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeHighlight from 'rehype-highlight';
import remarkImages from "remark-images";
/**
 * Renders markdown to HTML with syntax highlighting and GFM support
 * @param {string} md - The markdown content to render
 * @returns {Promise<string>} - The rendered HTML
 */
export async function renderMarkdown(md) {
  // Base pipeline with GitHub Flavored Markdown support
  let processor = remark()
    .use(remarkGfm) // Support tables, task lists, strikethrough, autolinks, etc.
    .use(remarkImages) // Support image syntax
    .use(remarkRehype); // Convert to HTML

  // Detect current theme
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  
  // Try pretty-code first for richer highlighting with Shiki
  const prettyOptions = {
    theme: isDark ? "material-theme-darker" : "solarized-light",
    bypassInlineCode: true,
    keepBackground: true,
    defaultLang: "shell",
    tokensMap: {
      // optional custom token mappings
    },
  };

  try {
    processor = processor.use(rehypePrettyCode, prettyOptions);
  } catch (_) {
    // If pretty-code setup fails, we'll fallback to rehype-highlight below
  }

  // Always include a simple fallback highlighter to cover non-Shiki cases
  processor = processor.use(rehypeHighlight);

  const file = await processor.use(rehypeStringify).process(md);
  return String(file);
}

/**
 * Debounce function to limit how often a function is called
 * @param {Function} fn - The function to debounce
 * @param {number} ms - The debounce delay in milliseconds
 * @returns {Function} - The debounced function
 */
export function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

/**
 * Enhance code blocks with toolbar (language label and copy button)
 * Call this after rendering markdown to add interactive elements
 * @param {HTMLElement} container - The container element with rendered markdown
 */
export function enhanceCodeBlocks(container) {
  const preElements = container.querySelectorAll('pre');
  
  preElements.forEach(pre => {
    // Skip if already enhanced
    if (pre.querySelector('.code-toolbar')) return;
    
    const code = pre.querySelector('code');
    if (!code) return;
    
    // Try multiple patterns to find the language
    let language = 'text';
    
    // Pattern 1: language-javascript (from remark/rehype)
    const langClass = Array.from(code.classList).find(cls => cls.startsWith('language-'));
    if (langClass) {
      language = langClass.replace('language-', '');
    }
    
    // Pattern 2: Check data-language attribute (from rehype-pretty-code)
    if (language === 'text' && code.dataset.language) {
      language = code.dataset.language;
    }
    
    // Pattern 3: Check pre element's data-language
    if (language === 'text' && pre.dataset.language) {
      language = pre.dataset.language;
    }
    
    // Pattern 4: Check for hljs language classes (language-javascript hljs)
    if (language === 'text') {
      const hljsClass = Array.from(code.classList).find(cls => 
        cls !== 'hljs' && cls !== 'language-text' && cls.length > 0
      );
      if (hljsClass && hljsClass.startsWith('language-')) {
        language = hljsClass.replace('language-', '');
      }
    }
    
    // Create toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';
    
    // Language label
    const langLabel = document.createElement('span');
    langLabel.className = 'code-language';
    langLabel.textContent = language.toUpperCase();
    
    // Copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
    copyBtn.onclick = async () => {
      const codeText = code.textContent;
      try {
        await navigator.clipboard.writeText(codeText);
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        copyBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
        }, 2000);
      }
    };
    
    toolbar.appendChild(langLabel);
    toolbar.appendChild(copyBtn);
    
    // Wrap pre element in a container
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(toolbar);
    wrapper.appendChild(pre);
  });
}
