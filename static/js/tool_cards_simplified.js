// Simplified Tool Cards JavaScript

// Tool icons mapping
const toolIcons = {
  'google_search': '🔍',
  'python_code_generator': '🐍',
  'wikipedia_knowledge_searcher': '📚',
  'arxiv_paper_searcher': '📄',
  'image_captioner': '🖼️',
  'object_detector': '👁️',
  'text_detector': '📝',
  'url_text_extractor': '🌐',
  'pubmed_search': '🏥',
  'nature_news_fetcher': '📰',
  'generalist_solution_generator': '💡',
  'path_generalist_classifier': '🔬',
  'relevant_patch_zoomer': '🔎'
};

// Tool categories
const toolCategories = {
  'Search': ['google_search', 'wikipedia_knowledge_searcher', 'arxiv_paper_searcher', 'pubmed_search'],
  'Code': ['python_code_generator'],
  'Vision': ['image_captioner', 'object_detector', 'text_detector', 'relevant_patch_zoomer'],
  'Text': ['url_text_extractor', 'nature_news_fetcher'],
  'AI': ['generalist_solution_generator', 'path_generalist_classifier']
};

// State
let allTools = [];
let currentFilter = 'All';

// Initialize
document.addEventListener('DOMContentLoaded', async function() {
  await loadTools();
  renderTools();
  setupControls();
});

// Load tools from metadata files
async function loadTools() {
  const toolDirectories = [
    'google_search',
    'python_code_generator',
    'wikipedia_knowledge_searcher',
    'arxiv_paper_searcher',
    'image_captioner',
    'object_detector',
    'text_detector',
    'url_text_extractor',
    'pubmed_search',
    'nature_news_fetcher',
    'generalist_solution_generator',
    'path_generalist_classifier',
    'relevant_patch_zoomer'
  ];

  const promises = toolDirectories.map(async (dir) => {
    try {
      const response = await fetch(`./tools/${dir}/metadata.json`);
      if (!response.ok) return null;
      const metadata = await response.json();
      return {
        id: dir,
        ...metadata,
        category: getToolCategory(dir)
      };
    } catch (error) {
      console.error(`Failed to load tool: ${dir}`, error);
      return null;
    }
  });

  const results = await Promise.all(promises);
  allTools = results.filter(tool => tool !== null);
}

// Get tool category
function getToolCategory(toolId) {
  for (const [category, tools] of Object.entries(toolCategories)) {
    if (tools.includes(toolId)) {
      return category;
    }
  }
  return 'Other';
}

// Render tools
function renderTools(filter = 'All', searchQuery = '') {
  const container = document.getElementById('tools-grid');
  if (!container) return;

  let filteredTools = allTools;

  // Apply category filter
  if (filter !== 'All') {
    filteredTools = filteredTools.filter(tool => tool.category === filter);
  }

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredTools = filteredTools.filter(tool =>
      tool.tool_name.toLowerCase().includes(query) ||
      tool.tool_description.toLowerCase().includes(query)
    );
  }

  // Render
  if (filteredTools.length === 0) {
    container.innerHTML = `
      <div class="tools-empty">
        <i class="fas fa-tools"></i>
        <p>No tools found matching your criteria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredTools.map(tool => createToolCard(tool)).join('');
}

// Create tool card HTML
function createToolCard(tool) {
  const icon = toolIcons[tool.id] || '🔧';
  const toolName = tool.tool_name.replace(/_/g, ' ');

  // Get first demo command if available
  const demoCommand = tool.demo_commands && tool.demo_commands.length > 0
    ? tool.demo_commands[0]
    : null;

  // Format input types
  const inputsHTML = tool.input_types ? Object.entries(tool.input_types).map(([key, value]) => `
    <div class="tool-param">
      <span class="tool-param-name">${key}</span>
      <span class="tool-param-type">${value}</span>
    </div>
  `).join('') : '<p style="color: #999; font-size: 0.85rem;">No input parameters</p>';

  return `
    <div class="tool-card" data-category="${tool.category}">
      <div class="tool-card-header">
        <h3 class="tool-card-title">
          <span class="tool-icon">${icon}</span>
          ${toolName}
        </h3>
      </div>

      <p class="tool-card-description">${tool.tool_description}</p>

      <div class="tool-card-section">
        <div class="tool-section-label">Inputs</div>
        <div class="tool-inputs">
          ${inputsHTML}
        </div>
      </div>

      ${tool.output_type ? `
        <div class="tool-card-section">
          <div class="tool-section-label">Output</div>
          <div class="tool-output">
            <div class="tool-param">
              <span class="tool-param-type">${tool.output_type}</span>
            </div>
          </div>
        </div>
      ` : ''}

      ${demoCommand ? `
        <div class="tool-card-section">
          <div class="tool-section-label">Example</div>
          <div class="tool-code-example"><code>${escapeHtml(demoCommand.command)}</code></div>
          ${demoCommand.description ? `<div class="tool-code-desc">${demoCommand.description}</div>` : ''}
        </div>
      ` : ''}

      <div class="tool-card-footer">
        <a href="./tools/${tool.id}/metadata.json" class="tool-link" target="_blank">
          <i class="fas fa-info-circle"></i>
          Metadata
        </a>
        <a href="https://github.com/octotools/octotools/tree/main/octotoolkit/tools/${tool.id}" class="tool-link" target="_blank">
          <i class="fab fa-github"></i>
          Code
        </a>
      </div>
    </div>
  `;
}

// Setup controls
function setupControls() {
  // Search
  const searchInput = document.getElementById('tools-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderTools(currentFilter, e.target.value);
    });
  }

  // Filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update filter
      currentFilter = btn.dataset.category;
      const searchQuery = searchInput ? searchInput.value : '';
      renderTools(currentFilter, searchQuery);
    });
  });
}

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Expose functions globally
window.toolCards = {
  loadTools,
  renderTools,
  getToolCategory
};
