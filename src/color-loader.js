import config from '../conf.json' assert { type: 'json' };

// Generate CSS variable name from token key (convert dots to hyphens)
function varName(key) {
	return `--ct-${key.replace(/\./g,'-')}`;
}

function buildThemeCss(themeName, tokens) {
	const lines = Object.entries(tokens).map(([k,v]) => `  ${varName(k)}: ${v};`);
	return themeName === 'light'
		? `:root {\n${lines.join('\n')}\n}`
		: `[data-theme="${themeName}"] {\n${lines.join('\n')}\n}`;
}

function injectCss(id, css) {
	let style = document.getElementById(id);
	if(!style) { style = document.createElement('style'); style.id = id; document.head.appendChild(style); }
	style.textContent = css;
}

export function applyColorTokens() {
	const themes = config.themes;
	const css = Object.entries(themes).map(([name,toks]) => buildThemeCss(name, toks)).join('\n');
	injectCss('color-tokens', css);
}

// Utility classes (map previous literal-based Tailwind-like classes to vars)
export function injectUtilityClasses() {
	const mappings = {
		'.bg-app': 'background-color: var(--ct-base-bg-root);',
		'.bg-app-alt': 'background-color: var(--ct-base-bg-alt);',
		'.bg-muted': 'background-color: var(--ct-base-bg-alt);',
		'.hover\\:bg-muted:hover': 'background-color: var(--ct-base-bg-alt);',
		'.bg-panel': 'background-color: var(--ct-base-panel);',
		'.border-default': 'border-color: var(--ct-base-border);',
		'.text-heading': 'color: var(--ct-text-primary);',
		'.text-body': 'color: var(--ct-text-secondary);',
		'.text-muted': 'color: var(--ct-text-muted);',
		'.bg-accent': 'background-color: var(--ct-accent-primary);',
		'.hover\\:bg-accent-dark:hover': 'background-color: var(--ct-accent-primary-dark);',
		'.bg-tag': 'background-color: var(--ct-tag-bg);',
		'.text-tag': 'color: var(--ct-tag-text);',
		'.bg-card': 'background-color: var(--ct-card-bg);',
		'.bg-card-footer': 'background-color: var(--ct-card-footer-bg);',
		'.bg-code-block': 'background-color: var(--ct-code-bg-block);',
		'.bg-code-inline': 'background-color: var(--ct-code-bg-inline);',
		'.border-code': 'border-color: var(--ct-code-border);',
		'.bg-success': 'background-color: var(--ct-accent-success);',
		'.hover\\:bg-success-hover:hover': 'background-color: var(--ct-accent-green-hover);',
		'.bg-danger': 'background-color: var(--ct-accent-danger);',
		'.hover\\:bg-danger-hover:hover': 'background-color: var(--ct-accent-danger-hover);',
		'.bg-warning': 'background-color: var(--ct-accent-warning);',
		'.hover\\:bg-warning-hover:hover': 'background-color: var(--ct-accent-warning-hover);',
		'.text-accent': 'color: var(--ct-accent-primary);',
		'.hover\\:text-accent:hover': 'color: var(--ct-accent-primary);'
	};
	const css = Object.entries(mappings).map(([sel,rule]) => `${sel}{${rule}}`).join('\n');
	injectCss('color-utilities', css);
}

export function initColors() {
	applyColorTokens();
	injectUtilityClasses();
}

// Auto-init
initColors();
