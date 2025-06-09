const { invoke } = window.__TAURI__.core;

// DOM elements
const searchInput = document.getElementById('searchInput');
const tagFilters = document.getElementById('tagFilters');
const sortSelect = document.getElementById('sortSelect');
const snippetsContainer = document.getElementById('snippetsContainer');
const emptyState = document.getElementById('emptyState');
const addSnippetBtn = document.getElementById('addSnippetBtn');
const addFirstSnippetBtn = document.getElementById('addFirstSnippetBtn');
const snippetModal = document.getElementById('snippetModal');
const viewModal = document.getElementById('viewModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeViewModalBtn = document.getElementById('closeViewModalBtn');
const closeViewModalBtn2 = document.getElementById('closeViewModalBtn2');
const cancelBtn = document.getElementById('cancelBtn');
const snippetForm = document.getElementById('snippetForm');
const deleteSnippetBtn = document.getElementById('deleteSnippetBtn');
const previewArea = document.getElementById('previewArea');
const editSnippetBtn = document.getElementById('editSnippetBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const allTab = document.getElementById('allTab');
const favoritesTab = document.getElementById('favoritesTab');
const recentTab = document.getElementById('recentTab');

// Stats elements
const totalSnippets = document.getElementById('totalSnippets');
const totalTags = document.getElementById('totalTags');
const updatedToday = document.getElementById('updatedToday');
const lastAdded = document.getElementById('lastAdded');

// Sample data - in a real app, this would come from a database
let snippets = JSON.parse(localStorage.getItem('codeSnippets')) || [];
let viewMode = 'all'; // 'all', 'favorites', 'recent'
let recentlyViewedSnippets = JSON.parse(localStorage.getItem('recentlyViewedSnippets')) || [];
let activeModalSnippetId = null;

// Add this variable at the top with other state variables:
let activeTags = []; // Array of selected tags

// Initialize the app
function init() {
    renderAllSnippets();
    renderTagFilters();
    updateStats();

    // If no snippets, show empty state
    if (snippets.length === 0) {
        snippetsContainer.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        snippetsContainer.classList.remove('hidden');
        emptyState.classList.add('hidden');
    }
}

// Render all snippets
function renderAllSnippets() {
    snippetsContainer.innerHTML = '';

    let snippetsToRender = [...snippets];

    // Apply search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        snippetsToRender = snippetsToRender.filter(snippet =>
            snippet.title.toLowerCase().includes(searchTerm) ||
            snippet.description.toLowerCase().includes(searchTerm) ||
            snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            snippet.content.toLowerCase().includes(searchTerm)
        );
    }

    // Apply view mode filter
    if (viewMode === 'favorites') {
        snippetsToRender = snippetsToRender.filter(snippet => snippet.isFavorite);
    } else if (viewMode === 'recent') {
        const recentIds = recentlyViewedSnippets.map(s => s.id);
        snippetsToRender = snippetsToRender.filter(snippet => recentIds.includes(snippet.id));
        // Order by recent views (most recent first)
        snippetsToRender.sort((a, b) => {
            const aIndex = recentlyViewedSnippets.findIndex(s => s.id === a.id);
            const bIndex = recentlyViewedSnippets.findIndex(s => s.id === b.id);
            return aIndex - bIndex;
        });
    }

    // Apply tag filter (must include all selected tags)
    if (activeTags.length > 0) {
        snippetsToRender = snippetsToRender.filter(snippet =>
            activeTags.every(tag => snippet.tags.includes(tag))
        );
    }

    // Apply sort
    const sortValue = sortSelect.value;
    if (sortValue === 'newest') {
        snippetsToRender.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    } else if (sortValue === 'oldest') {
        snippetsToRender.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    } else if (sortValue === 'title-asc') {
        snippetsToRender.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === 'title-desc') {
        snippetsToRender.sort((a, b) => b.title.localeCompare(a.title));
    }

    // Render
    if (snippetsToRender.length === 0) {
        snippetsContainer.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        snippetsContainer.classList.remove('hidden');
        emptyState.classList.add('hidden');

        snippetsToRender.forEach(snippet => {
            const snippetCard = createSnippetCard(snippet);
            snippetsContainer.appendChild(snippetCard);
        });
    }
}

// Create a snippet card element
function createSnippetCard(snippet) {
    const card = document.createElement('div');
    card.className = 'card-hover bg-[#eee8d5] rounded-lg overflow-hidden border border-[#93a1a1] flex flex-col';
    card.innerHTML = `
                <div class="p-4">
                    <div class="flex justify-between items-start">
                        <h3 class="font-bold text-lg text-[#073642] truncate">${snippet.title}</h3>
                        <button class="text-[#586e75] hover:text-[#268bd2]" data-id="${snippet.id}" data-action="favorite">
                            <i class="${snippet.isFavorite ? 'fas' : 'far'} fa-star"></i>
                        </button>
                    </div>
                    <p class="text-sm text-[#586e75] mt-1 line-clamp-2">${snippet.description}</p>
                </div>
                <div class="px-4 pb-2 flex flex-wrap gap-2">
                    ${snippet.tags.map(tag => `<span class="tag-chip text-xs bg-[#2aa198] text-white px-2 py-1 rounded">${tag}</span>`).join('')}
                </div>
                <div class="p-4 bg-[#fdf6e3] border-t border-[#93a1a1] mt-auto flex justify-between items-center text-sm text-[#586e75]">
                    <span>${formatDate(snippet.updatedAt)}</span>
                    <div>
                        <button class="mr-2 hover:text-[#268bd2]" data-id="${snippet.id}" data-action="edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="hover:text-[#268bd2]" data-id="${snippet.id}" data-action="view">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            `;

    // Add animation class if this is a newly added snippet
    if (snippet.isNew) {
        card.classList.add('new-snippet');
        // Remove the isNew flag after rendering
        const updatedSnippets = snippets.map(s =>
            s.id === snippet.id ? { ...s, isNew: false } : s
        );
        snippets = updatedSnippets;
        saveSnippets();
    }

    return card;
}

// Render tag filters
function renderTagFilters() {
    // Get all unique tags
    const allTags = [];
    snippets.forEach(snippet => {
        snippet.tags.forEach(tag => {
            if (!allTags.includes(tag)) {
                allTags.push(tag);
            }
        });
    });

    // Sort tags alphabetically
    allTags.sort();

    // Render tags
    tagFilters.innerHTML = '';
    allTags.forEach(tag => {
        const tagElement = document.createElement('button');
        tagElement.className = 'tag-chip text-xs px-2 py-1 rounded border border-[#93a1a1] hover:bg-[#2aa198] hover:text-white';
        tagElement.textContent = tag;
        tagElement.dataset.tag = tag;
        // Highlight if active
        if (activeTags.includes(tag)) {
            tagElement.classList.add('bg-[#2aa198]', 'text-white');
        } else {
            tagElement.classList.add('bg-[#fdf6e3]', 'text-[#657b83]');
        }
        tagElement.addEventListener('click', toggleTagFilter);
        tagFilters.appendChild(tagElement);
    });

    // Add "All" tag first
    const allTagsElement = document.createElement('button');
    allTagsElement.className = 'tag-chip text-xs px-2 py-1 rounded';
    allTagsElement.textContent = 'All';
    allTagsElement.dataset.tag = 'all';
    if (activeTags.length === 0) {
        allTagsElement.classList.add('bg-[#268bd2]', 'text-white');
    } else {
        allTagsElement.classList.add('bg-[#fdf6e3]', 'text-[#657b83]');
    }
    allTagsElement.addEventListener('click', toggleTagFilter);
    tagFilters.insertBefore(allTagsElement, tagFilters.firstChild);
}

// Toggle tag filter
function toggleTagFilter(e) {
    const tag = e.target.dataset.tag;
    if (tag === 'all') {
        activeTags = [];
    } else {
        if (activeTags.includes(tag)) {
            activeTags = activeTags.filter(t => t !== tag);
        } else {
            activeTags.push(tag);
        }
    }
    renderTagFilters();
    renderAllSnippets();
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Update stats
function updateStats() {
    totalSnippets.textContent = snippets.length;

    // Count unique tags
    const allTags = new Set();
    snippets.forEach(snippet => {
        snippet.tags.forEach(tag => allTags.add(tag));
    });
    totalTags.textContent = allTags.size;

    // Count snippets updated today
    const today = new Date().toDateString();
    const todayCount = snippets.filter(snippet =>
        new Date(snippet.updatedAt).toDateString() === today
    ).length;
    updatedToday.textContent = todayCount;

    // Get last added snippet
    if (snippets.length > 0) {
        const lastAddedSnippet = snippets.reduce((latest, current) =>
            new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest
        );
        lastAdded.textContent = lastAddedSnippet.title;
    } else {
        lastAdded.textContent = 'None';
    }
}

// Show add snippet modal
function showAddSnippetModal() {
    document.getElementById('modalTitle').textContent = 'Add New Snippet';
    document.getElementById('snippetId').value = '';
    document.getElementById('snippetTitle').value = '';
    document.getElementById('snippetDesc').value = '';
    document.getElementById('snippetTags').value = '';
    document.getElementById('snippetContent').value = '';
    deleteSnippetBtn.classList.add('hidden');
    previewArea.innerHTML = '';
    snippetModal.classList.remove('hidden');
}

// Show edit snippet modal
function showEditSnippetModal(snippetId) {
    const snippet = snippets.find(s => s.id === snippetId);
    if (!snippet) return;

    document.getElementById('modalTitle').textContent = 'Edit Snippet';
    document.getElementById('snippetId').value = snippet.id;
    document.getElementById('snippetTitle').value = snippet.title;
    document.getElementById('snippetDesc').value = snippet.description;
    document.getElementById('snippetTags').value = snippet.tags.join(', ');
    document.getElementById('snippetContent').value = snippet.content;
    deleteSnippetBtn.classList.remove('hidden');
    previewArea.innerHTML = '';
    snippetModal.classList.remove('hidden');

    updateLivePreview();
}

// Show view snippet modal
function showViewSnippetModal(snippetId) {
    const snippet = snippets.find(s => s.id === snippetId);
    if (!snippet) return;

    // Track recently viewed
    addToRecentlyViewed(snippetId);

    // Update modal content
    document.getElementById('viewModalTitle').textContent = snippet.title;
    document.getElementById('viewSnippetTitle').textContent = snippet.title;
    document.getElementById('viewSnippetDesc').textContent = snippet.description;

    // Update tags
    const tagsContainer = document.getElementById('viewSnippetTags');
    tagsContainer.innerHTML = '';
    snippet.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag-chip text-xs bg-[#2aa198] text-white px-2 py-1 rounded';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });

    // Update content with markdown rendering
    const contentContainer = document.getElementById('viewSnippetContent');
    contentContainer.innerHTML = marked.parse(snippet.content);

    // Highlight code blocks
    contentContainer.querySelectorAll('pre code').forEach((block) => {
        Prism.highlightElement(block);
    });

    // Update date
    document.getElementById('viewSnippetUpdated').textContent = formatDate(snippet.updatedAt);

    // Update favorite button
    const favoriteIcon = favoriteBtn.querySelector('i');
    favoriteBtn.dataset.id = snippet.id;
    if (snippet.isFavorite) {
        favoriteBtn.classList.remove('bg-[#b58900]');
        favoriteBtn.classList.add('bg-[#859900]');
        favoriteIcon.classList.replace('far', 'fas');
    } else {
        favoriteBtn.classList.add('bg-[#b58900]');
        favoriteBtn.classList.remove('bg-[#859900]');
        favoriteIcon.classList.replace('fas', 'far');
    }

    // Update edit button
    editSnippetBtn.dataset.id = snippet.id;

    viewModal.classList.remove('hidden');
}

// Add snippet
function addSnippet(title, description, tags, content) {
    const now = new Date().toISOString();
    const newSnippet = {
        id: generateId(),
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        content,
        isFavorite: false,
        createdAt: now,
        updatedAt: now,
        isNew: true
    };

    snippets.unshift(newSnippet);
    saveSnippets();
    renderAllSnippets();
    renderTagFilters();
    updateStats();
}

// Update snippet
function updateSnippet(id, title, description, tags, content) {
    const now = new Date().toISOString();
    const updatedSnippets = snippets.map(snippet => {
        if (snippet.id === id) {
            return {
                ...snippet,
                title,
                description,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                content,
                updatedAt: now
            };
        }
        return snippet;
    });

    snippets = updatedSnippets;
    saveSnippets();
    renderAllSnippets();
    renderTagFilters();
    updateStats();
}

// Delete snippet
function deleteSnippet(id) {
    if (confirm('Are you sure you want to delete this snippet?')) {
        snippets = snippets.filter(snippet => snippet.id !== id);
        saveSnippets();
        renderAllSnippets();
        renderTagFilters();
        updateStats();
    }
}

// Toggle snippet favorite status
function toggleFavorite(id) {
    const updatedSnippets = snippets.map(snippet => {
        if (snippet.id === id) {
            return {
                ...snippet,
                isFavorite: !snippet.isFavorite,
                updatedAt: new Date().toISOString()
            };
        }
        return snippet;
    });

    snippets = updatedSnippets;
    saveSnippets();

    // Update UI if favorite tab is active
    if (viewMode === 'favorites') {
        renderAllSnippets();
    }

    updateStats();
}

// Add snippet to recently viewed
function addToRecentlyViewed(id) {
    const snippet = snippets.find(s => s.id === id);
    if (!snippet) return;

    // Remove if already exists
    recentlyViewedSnippets = recentlyViewedSnippets.filter(s => s.id !== id);

    // Add to beginning
    recentlyViewedSnippets.unshift({
        id: snippet.id,
        title: snippet.title,
        viewedAt: new Date().toISOString()
    });

    // Keep only last 10
    if (recentlyViewedSnippets.length > 10) {
        recentlyViewedSnippets.pop();
    }

    localStorage.setItem('recentlyViewedSnippets', JSON.stringify(recentlyViewedSnippets));

    // Update UI if recent tab is active
    if (viewMode === 'recent') {
        renderAllSnippets();
    }
}

// Save snippets to localStorage
function saveSnippets() {
    localStorage.setItem('codeSnippets', JSON.stringify(snippets));
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Live markdown preview
const snippetContent = document.getElementById('snippetContent');
snippetContent.addEventListener('input', updateLivePreview);

function updateLivePreview() {
    const content = snippetContent.value;
    previewArea.innerHTML = marked.parse(content);
    // Highlight code blocks
    previewArea.querySelectorAll('pre code').forEach((block) => {
        Prism.highlightElement(block);
    });
}
// const { shell } = require('electron');

// previewArea.addEventListener('click', function (e) {
//     if (e.target.tagName === 'A') {
//         e.preventDefault();
//         shell.openExternal(e.target.href);
//     }
// });
// Intercept link clicks in previewArea and viewSnippetContent to open in system browser

function handleExternalLinks(container) {
    container.addEventListener('click', async function (e) {
        const a = e.target.closest('a');
        if (a && a.href && a.target !== '_blank') {
            e.preventDefault();
            try {
                await window.__TAURI__.opener.openUrl(a.href);
            } catch (err) {
                console.error('Failed to open link externally:', err);
            }
        }
    });
}

// Attach after DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    handleExternalLinks(previewArea);
    const viewContent = document.getElementById('viewSnippetContent');
    if (viewContent) handleExternalLinks(viewContent);
});

// Event listeners
searchInput.addEventListener('input', renderAllSnippets);
sortSelect.addEventListener('change', renderAllSnippets);
addSnippetBtn.addEventListener('click', showAddSnippetModal);
addFirstSnippetBtn.addEventListener('click', showAddSnippetModal);

closeModalBtn.addEventListener('click', () => snippetModal.classList.add('hidden'));
closeViewModalBtn.addEventListener('click', () => viewModal.classList.add('hidden'));
closeViewModalBtn2.addEventListener('click', () => viewModal.classList.add('hidden'));
cancelBtn.addEventListener('click', () => snippetModal.classList.add('hidden'));

snippetForm.addEventListener('submit', e => {
    e.preventDefault();

    const id = document.getElementById('snippetId').value;
    const title = document.getElementById('snippetTitle').value;
    const description = document.getElementById('snippetDesc').value;
    const tags = document.getElementById('snippetTags').value;
    const content = document.getElementById('snippetContent').value;

    if (id) {
        updateSnippet(id, title, description, tags, content);
    } else {
        addSnippet(title, description, tags, content);
    }

    snippetModal.classList.add('hidden');
});

deleteSnippetBtn.addEventListener('click', () => {
    const id = document.getElementById('snippetId').value;
    deleteSnippet(id);
    snippetModal.classList.add('hidden');
});

editSnippetBtn.addEventListener('click', e => {
    const id = e.target.closest('button').dataset.id;
    viewModal.classList.add('hidden');
    showEditSnippetModal(id);
});

favoriteBtn.addEventListener('click', e => {
    const id = e.target.closest('button').dataset.id;
    toggleFavorite(id);

    // Update button appearance
    const icon = favoriteBtn.querySelector('i');
    const snippet = snippets.find(s => s.id === id);
    if (snippet.isFavorite) {
        favoriteBtn.classList.remove('bg-[#b58900]');
        favoriteBtn.classList.add('bg-[#859900]');
        icon.classList.replace('far', 'fas');
    } else {
        favoriteBtn.classList.add('bg-[#b58900]');
        favoriteBtn.classList.remove('bg-[#859900]');
        icon.classList.replace('fas', 'far');
    }
});

// Delegate click events for snippet actions
snippetsContainer.addEventListener('click', e => {
    const button = e.target.closest('button');
    if (!button) return;

    const action = button.dataset.action;
    const id = button.dataset.id;

    if (action === 'view') {
        showViewSnippetModal(id);
    } else if (action === 'edit') {
        showEditSnippetModal(id);
    } else if (action === 'favorite') {
        toggleFavorite(id);

        // Update star icon
        const icon = button.querySelector('i');
        const snippet = snippets.find(s => s.id === id);
        if (snippet.isFavorite) {
            icon.classList.replace('far', 'fas');
        } else {
            icon.classList.replace('fas', 'far');
        }

        // Update UI if favorite tab is active
        if (viewMode === 'favorites') {
            const card = button.closest('.card-hover');
            card.style.display = snippet.isFavorite ? '' : 'none';
        }
    }
});

// Tab switching
allTab.addEventListener('click', () => {
    viewMode = 'all';
    allTab.classList.add('tab-active');
    favoritesTab.classList.remove('tab-active');
    recentTab.classList.remove('tab-active');
    renderAllSnippets();
});

favoritesTab.addEventListener('click', () => {
    viewMode = 'favorites';
    allTab.classList.remove('tab-active');
    favoritesTab.classList.add('tab-active');
    recentTab.classList.remove('tab-active');
    renderAllSnippets();
});

recentTab.addEventListener('click', () => {
    viewMode = 'recent';
    allTab.classList.remove('tab-active');
    favoritesTab.classList.remove('tab-active');
    recentTab.classList.add('tab-active');
    renderAllSnippets();
});

// Add some sample data if empty
if (snippets.length === 0) {
    const sampleSnippets = [
        {
            id: 'sample1',
            title: 'Simple React Component',
            description: 'A basic React functional component with TypeScript',
            tags: ['react', 'typescript', 'frontend'],
            content: `\`\`\`tsx
import React, { useState } from 'react';

interface Props {
    initialValue?: string;
}

const MyComponent: React.FC<Props> = ({ initialValue = '' }) => {
    const [value, setValue] = useState(initialValue);
    
    return (
        <div className="p-4 border rounded">
            <input 
                type="text" 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                className="p-2 border rounded"
            />
            <p>Current value: {value}</p>
        </div>
    );
};

export default MyComponent;
\`\`\``,
            isFavorite: true,
            createdAt: new Date('2023-06-01').toISOString(),
            updatedAt: new Date('2023-06-05').toISOString()
        },
        {
            id: 'sample2',
            title: 'Flexbox Centering',
            description: 'How to center elements vertically and horizontally using Flexbox',
            tags: ['css', 'frontend', 'layout'],
            content: `\`\`\`css
/* Center both vertically and horizontally */
.center-container {
    display: flex;
    justify-content: center; /* horizontal alignment */
    align-items: center;     /* vertical alignment */
    height: 100vh;           /* needs height to work */
}

/* For more complex spacing */
.spaced-container {
    display: flex;
    justify-content: space-between; /* items spaced evenly */
    align-items: flex-start;        /* items aligned to top */
    gap: 1rem;                      /* spacing between items */
}
\`\`\``,
            isFavorite: false,
            createdAt: new Date('2023-05-15').toISOString(),
            updatedAt: new Date('2023-05-20').toISOString()
        }
    ];

    snippets = sampleSnippets;
    saveSnippets();
}

// Initialize the app
init();



// Save snippets to file
async function saveSnippetsToFile() {
    try {
        await invoke('save_snippets_to_documents', {
            content: JSON.stringify(snippets, null, 2)
        });
    } catch (e) {
        console.error('Failed to save snippets:', e);
    }
}

// Load snippets from file
async function loadSnippetsFromFile() {
    try {
        const text = await invoke('load_snippets_from_documents', {});
        if (text) {
            snippets = JSON.parse(text);
            localStorage.setItem('codeSnippets', JSON.stringify(snippets));
            renderAllSnippets();
            renderTagFilters();
            updateStats();
        }
    } catch (e) {
        // Ignore if file is empty or doesn't exist
    }
}

// Patch saveSnippets to also save to file
const originalSaveSnippets = saveSnippets;
saveSnippets = function () {
    originalSaveSnippets();
    saveSnippetsToFile();
};

// On app start, load from file if exists
loadSnippetsFromFile();