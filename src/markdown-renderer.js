import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkImages from "remark-images";

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function transformMarkdownCollapsibles(md) {
  const lines = md.split('\n');
  const out = [];
  const stack = [];
  let inFence = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Keep fenced code blocks untouched
    if (/^```|^~~~/.test(trimmed)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }

    if (!inFence) {
      const detailsOpen = trimmed.match(/^:::\s*details(?:\s+open)?(?:\s*\[(.+)\]|\s+(.+))?\s*$/i);
      if (detailsOpen) {
        const isOpen = /:::\s*details\s+open/i.test(trimmed);
        const summaryRaw = (detailsOpen[1] || detailsOpen[2] || 'Details').trim();
        const summary = escapeHtml(summaryRaw);
        out.push(`<details${isOpen ? ' open' : ''}><summary>${summary}</summary>`);
        stack.push('details');
        continue;
      }

      if (trimmed === ':::' && stack.length > 0) {
        stack.pop();
        out.push('</details>');
        continue;
      }
    }

    out.push(line);
  }

  // Close any unclosed blocks to keep HTML balanced
  while (stack.length > 0) {
    stack.pop();
    out.push('</details>');
  }

  return out.join('\n');
}

const extendedTagNames = [
  'article',
  'aside',
  'blockquote',
  'caption',
  'col',
  'colgroup',
  'data',
  'datalist',
  'details',
  'dialog',
  'div',
  'dl',
  'dt',
  'dd',
  'figure',
  'figcaption',
  'footer',
  'header',
  'hgroup',
  'hr',
  'iframe',
  'img',
  'kbd',
  'main',
  'mark',
  'menu',
  'meter',
  'nav',
  'picture',
  'progress',
  'section',
  'small',
  'source',
  'sub',
  'summary',
  'sup',
  'time',
  'u',
  'var',
  'video',
  'audio',
  'track',
  'wbr',
  'form',
  'label',
  'input',
  'textarea',
  'select',
  'option',
  'optgroup',
  'button',
  'fieldset',
  'legend',
  'output',
  'canvas',
  'map',
  'area',
  'abbr',
  'cite',
  'q',
  's',
  'ins',
  'del',
];

const markdownSchema = {
  ...defaultSchema,
  protocols: {
    ...defaultSchema.protocols,
    href: ['http', 'https', 'mailto', 'tel', 'file', 'asset', 'blob'],
    src: ['http', 'https', 'data', 'file', 'asset', 'blob'],
    cite: ['http', 'https', 'file', 'asset'],
    poster: ['http', 'https', 'data', 'file', 'asset', 'blob'],
  },
  tagNames: Array.from(new Set([...(defaultSchema.tagNames || []), ...extendedTagNames])),
  attributes: {
    ...defaultSchema.attributes,
    '*': [
      ...((defaultSchema.attributes && defaultSchema.attributes['*']) || []),
      'className',
      'id',
      'style',
      'title',
      'lang',
      'dir',
      'tabindex',
      'aria-label',
      'aria-labelledby',
      'aria-describedby',
      'role',
      'data-theme',
      'data-language',
      'data-state',
      'data-open',
    ],
    a: [
      ...((defaultSchema.attributes && defaultSchema.attributes.a) || []),
      'target',
      'rel',
      'download',
      'hreflang',
      'referrerpolicy',
    ],
    img: [
      ...((defaultSchema.attributes && defaultSchema.attributes.img) || []),
      'loading',
      'decoding',
      'referrerpolicy',
      'width',
      'height',
      'srcset',
      'sizes',
      'usemap',
      'ismap',
      'alt',
    ],
    iframe: [
      'src',
      'title',
      'width',
      'height',
      'name',
      'allow',
      'allowfullscreen',
      'loading',
      'referrerpolicy',
      'sandbox',
      'frameborder',
    ],
    table: ['summary'],
    td: ['colspan', 'rowspan', 'headers', 'align', 'valign'],
    th: ['colspan', 'rowspan', 'headers', 'scope', 'align', 'valign'],
    col: ['span', 'width'],
    colgroup: ['span', 'width'],
    ol: ['start', 'reversed', 'type'],
    li: ['value'],
    blockquote: ['cite'],
    q: ['cite'],
    time: ['datetime'],
    data: ['value'],
    details: ['open', 'name'],
    summary: ['className'],
    video: ['src', 'controls', 'autoplay', 'muted', 'loop', 'playsinline', 'poster', 'width', 'height', 'preload'],
    audio: ['src', 'controls', 'autoplay', 'muted', 'loop', 'preload'],
    source: ['src', 'type', 'srcset', 'sizes', 'media'],
    track: ['default', 'kind', 'label', 'src', 'srclang'],
    picture: ['className'],
    form: ['action', 'method', 'enctype', 'autocomplete', 'novalidate', 'target', 'name'],
    label: ['for'],
    input: ['type', 'name', 'value', 'placeholder', 'checked', 'disabled', 'readonly', 'required', 'min', 'max', 'step', 'pattern', 'multiple', 'accept', 'autocomplete'],
    textarea: ['name', 'rows', 'cols', 'placeholder', 'disabled', 'readonly', 'required', 'maxlength', 'minlength'],
    select: ['name', 'multiple', 'disabled', 'required', 'size'],
    option: ['value', 'selected', 'disabled', 'label'],
    optgroup: ['label', 'disabled'],
    button: ['type', 'name', 'value', 'disabled'],
    fieldset: ['disabled', 'name'],
    meter: ['value', 'min', 'max', 'low', 'high', 'optimum'],
    progress: ['value', 'max'],
    area: ['alt', 'coords', 'shape', 'href', 'target', 'rel', 'download'],
    canvas: ['width', 'height'],
    dialog: ['open'],
  },
};
/**
 * Renders markdown to HTML with syntax highlighting and GFM support
 * @param {string} md - The markdown content to render
 * @returns {Promise<string>} - The rendered HTML
 */
export async function renderMarkdown(md) {
  const normalizedMarkdown = transformMarkdownCollapsibles(md);

  // Base pipeline with GitHub Flavored Markdown support
  let processor = remark()
    .use(remarkGfm) // Support tables, task lists, strikethrough, autolinks, etc.
    .use(remarkMath) // Support inline/block LaTeX math
    .use(remarkImages) // Support image syntax
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, markdownSchema);

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

  // Render $...$ and $$...$$ via KaTeX
  processor = processor.use(rehypeKatex);

  const file = await processor.use(rehypeStringify).process(normalizedMarkdown);
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
