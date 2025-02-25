# Welcome to PJKT:DOCS

<script setup>
import { ref, onMounted } from 'vue'

const sections = ref([
  {
    id: 'booths',
    title: 'Booth Development',
    icon: '🏪',
    description: 'Everything you need to know about creating and submitting booths',
    pages: [
      { title: 'Getting Started with SDK', path: '/booths/getting-started-with-sdk' },
      { title: 'Specifications', path: '/booths/specifications' },
      { title: 'Web Booth Creator', path: '/booths/web-booth-creator' },
      { title: 'Components', path: '/booths/components' }
    ]
  },
])

const activeSection = ref(null)

function setActiveSection(id) {
  activeSection.value = activeSection.value === id ? null : id
}

onMounted(() => {
  // Automatically expand the first section
  if (sections.value.length > 0) {
    activeSection.value = sections.value[0].id
  }
})
</script>

<div class="welcome-page">
      <div class="doc-overview">
        <div class="overview-callout">
          <div class="callout-icon">💡</div>
          <div class="callout-content">
            <h3>New to being a rep?</h3>
            <p>Make sure you have an <B>invitation code</B>, then explore our documentation sections below to learn more about specific topics.</p>
          </div>
        </div>
      </div>

## 🎨 Need a booth? Choose Your Path:

<div class="options-grid">
  <div class="option-card web-booth">
    <div class="option-icon">🌐</div>
    <div class="option-content">
      <h3>Web Booth Creator</h3>
      <p class="option-desc">For those who value their sanity and free time</p>
      <ul class="feature-list">
        <li>✨ No coding experience required</li>
        <li>🎯 Simple web-based interface</li>
        <li>⚡ Quick setup and customization</li>
        <li>🧘‍♂️ Zero Unity-induced headaches</li>
      </ul>
      <a href="/booths/web-booth-creator" class="action-button web-button">Choose Peace of Mind</a>
    </div>
  </div>

  <div class="option-card sdk-booth">
    <div class="option-icon">💻</div>
    <div class="option-content">
      <h3>PJKT SDK</h3>
      <p class="option-desc">For the brave souls who enjoy debugging Unity at 3 AM</p>
      <ul class="feature-list">
        <li>🎨 Complete customization freedom</li>
        <li>🔧 Advanced interactive features</li>
        <li>🎮 Full Unity power (and its quirks)</li>
        <li>☕ Recommended caffeine intake: High</li>
      </ul>
      <a href="/booths/getting-started-with-sdk" class="action-button sdk-button">Embrace the Challenge</a>
    </div>
  </div>
</div>


## 🧭 Documentation Sections

<div class="sections-container">
  <div v-for="section in sections" :key="section.id" class="section-card">
    <div class="section-header" @click="setActiveSection(section.id)">
      <div class="section-icon">{{ section.icon }}</div>
      <h3 class="section-title">{{ section.title }}</h3>
      <div class="section-expander" :class="{ 'expanded': activeSection === section.id }">
        <span v-if="activeSection === section.id">▼</span>
        <span v-else>▶</span>
      </div>
    </div>
    <div class="section-content" :class="{ 'expanded': activeSection === section.id }">
      <p class="section-description">{{ section.description }}</p>
      <div v-if="section.pages.length > 0" class="pages-list">
        <h4>Pages included:</h4>
        <ul>
          <li v-for="page in section.pages" :key="page.path">
            <a :href="page.path">{{ page.title }}</a>
          </li>
        </ul>
      </div>
      <div v-else class="coming-soon">
        <span>More content coming soon!</span>
      </div>
    </div>
  </div>
</div>

## 🌟 Featured Resources

<div class="featured-grid">
  <div class="featured-card">
    <div class="featured-content">
      <h3>📐 Booth Specifications</h3>
      <p>Review the technical requirements and limitations for booth development</p>
      <div class="featured-link">
        <a href="/booths/specifications">View Specifications</a>
      </div>
    </div>
  </div>

</div>

## 📝 Documentation Structure

The documentation is organized to help you quickly find what you need:

<div class="structure-diagram">
  <div class="structure-node root">
    <div class="node-content">
      <div class="node-icon">📚</div>
      <div class="node-label">PJKT Documentation</div>
    </div>
    <div class="structure-branches">
      <div class="structure-branch">
        <div class="branch-line"></div>
        <div class="structure-node">
          <div class="node-content">
            <div class="node-icon">ℹ️</div>
            <div class="node-label">Info</div>
          </div>
          <div class="node-details">Basic information and onboarding guides</div>
        </div>
      </div>
      <div class="structure-branch">
        <div class="branch-line"></div>
        <div class="structure-node">
          <div class="node-content">
            <div class="node-icon">🏪</div>
            <div class="node-label">Booths</div>
          </div>
          <div class="node-details">Booth creation guides and technical specifications</div>
        </div>
      </div>
      <!-- <div class="structure-branch">
        <div class="branch-line"></div>
        <div class="structure-node">
          <div class="node-content">
            <div class="node-icon">🧩</div>
            <div class="node-label">Components</div>
          </div>
          <div class="node-details">Reusable UI and functional components</div>
        </div>
      </div> -->
    </div>
  </div>
</div>

## 📌 Need Help?

<div class="help-container">
  <div class="help-card">
    <div class="help-icon">💬</div>
    <div class="help-content">
      <h3>Join Our Discord</h3>
      <p>Connect with the community and get real-time assistance from our team</p>
      <a href="https://discord.gg/projekt" class="help-button" target="_blank">Join Discord</a>
    </div>
  </div>
  <div class="help-card">
    <div class="help-icon">🔍</div>
    <div class="help-content">
      <h3>Search Documentation</h3>
      <p>Use the search feature at the top of the page to find specific topics</p>
    </div>
  </div>
</div>

</div>

<style scoped>
.welcome-page {
  width: 100%;
  max-width: 100%;
}

.welcome-hero {
  padding: 3rem 2rem;
  margin: 1rem 0 2.5rem;
  text-align: center;
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  position: relative;
  overflow: hidden;
}

.welcome-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(125, 125, 255, 0.05), transparent 70%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.hero-logo {
  margin-bottom: 1.5rem;
}

.logo-image {
  max-height: 80px;
  max-width: 100%;
}

.hero-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(120deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-tagline {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.doc-overview {
  margin: 2rem 0;
}

.doc-overview p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.overview-callout {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand);
}

.callout-icon {
  font-size: 1.6rem;
}

.callout-content h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.callout-content p {
  margin: 0;
}

.sections-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
}

.section-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.section-header:hover {
  background: var(--vp-c-bg-mute);
}

.section-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title {
  flex-grow: 1;
  margin: 0;
}

.section-expander {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.section-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.section-content.expanded {
  max-height: 500px;
  padding: 0 1.25rem 1.25rem;
}

.section-description {
  color: var(--vp-c-text-2);
  margin-top: 0;
}

.pages-list h4 {
  margin: 1rem 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.pages-list ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.pages-list li {
  margin: 0.35rem 0;
}

.coming-soon {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-style: italic;
  color: var(--vp-c-text-2);
  text-align: center;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.featured-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.featured-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-color: var(--vp-c-brand);
}

.featured-content h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.featured-content p {
  color: var(--vp-c-text-2);
  margin-bottom: 1.25rem;
}

.featured-link a {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: var(--vp-c-brand);
  color: var(--vp-c-bg) !important; /* Changed from white to background color for better contrast */
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600; /* Increased from 500 to 600 for better readability */
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.featured-link a:hover {
  background: linear-gradient(90deg, var(--pjkt-yellow), #FFD700);
  color: var(--vp-c-black) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 228, 0, 0.3);
}

.structure-diagram {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.structure-node {
  margin-bottom: 1rem;
}

.structure-node.root {
  margin-bottom: 2rem;
}

.node-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.node-icon {
  font-size: 1.2rem;
}

.node-label {
  font-weight: 600;
}

.node-details {
  margin-top: 0.5rem;
  margin-left: 2.5rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.structure-branches {
  margin-top: 1.5rem;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.structure-branch {
  position: relative;
}

.branch-line {
  position: absolute;
  left: -1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--vp-c-divider);
}

.structure-branch:last-child .branch-line {
  height: 50%;
}

.help-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.help-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.help-icon {
  font-size: 2rem;
}

.help-content h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.help-content p {
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
}

.help-button {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: var(--vp-c-brand);
  color: var(--vp-c-bg) !important; /* Changed from white to background color for better contrast */
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600; /* Increased from 500 to 600 for better readability */
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.help-button:hover {
  background: var(--vp-c-brand-dark);
  color: var(--vp-c-bg) !important;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.option-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.web-booth {
  border-left: 4px solid var(--pjkt-cyan);
}

.sdk-booth {
  border-left: 4px solid var(--pjkt-purple);
}

.option-card:hover {
  transform: translateY(-4px);
}

.web-booth:hover {
  box-shadow: 0 8px 24px rgba(0, 198, 255, 0.15);
}

.sdk-booth:hover {
  box-shadow: 0 8px 24px rgba(160, 4, 255, 0.15);
}

.option-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: transform 0.3s ease, background-color 0.3s ease;
  background: var(--vp-c-bg);
}

.web-booth .option-icon {
  box-shadow: 0 0 0 2px rgba(0, 198, 255, 0.2);
}

.sdk-booth .option-icon {
  box-shadow: 0 0 0 2px rgba(160, 4, 255, 0.2);
}

.web-booth:hover .option-icon {
  transform: scale(1.05);
  background-color: rgba(0, 198, 255, 0.1);
}

.sdk-booth:hover .option-icon {
  transform: scale(1.05);
  background-color: rgba(160, 4, 255, 0.1);
}

.option-content h3 {
  margin: 0 0 0.75rem;
  color: var(--vp-c-text-1);
  font-size: 1.8rem;
  transition: color 0.3s ease;
}

.web-booth:hover h3 {
  background: linear-gradient(90deg, var(--pjkt-cyan), #00ffc6);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 2px 12px rgba(0, 198, 255, 0.2);
}

.sdk-booth:hover h3 {
  background: linear-gradient(90deg, var(--pjkt-purple), #ff0080);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 2px 12px rgba(160, 4, 255, 0.2);
}

.option-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
}

.feature-list li {
  margin: 0.75rem 0;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-button {
  display: inline-block;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  color: var(--vp-c-black);
  position: relative;
  overflow: hidden;
  text-shadow: none;
}

.web-button {
  background-color: var(--pjkt-cyan);
}

.sdk-button {
  background-color: var(--pjkt-purple);
}

.action-button:hover {
  transform: translateY(-2px);
  color: var(--vp-c-black); /* Ensuring high contrast on hover */
}

.web-button:hover {
  box-shadow: 0 4px 12px rgba(0, 198, 255, 0.3);
  background: linear-gradient(90deg, var(--pjkt-cyan), #00ffc6);
}

.sdk-button:hover {
  box-shadow: 0 4px 12px rgba(160, 4, 255, 0.3);
  background: linear-gradient(90deg, var(--pjkt-purple), #ff0080);
}

.action-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

@media (max-width: 640px) {
  .options-grid {
    grid-template-columns: 1fr;
  }
  
  .option-card {
    padding: 1.5rem;
  }
  
  .option-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .welcome-hero {
    padding: 2rem 1rem;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-tagline {
    font-size: 1rem;
  }
  
  .overview-callout {
    flex-direction: column;
  }
  
  .structure-diagram {
    overflow-x: auto;
  }
}
</style>