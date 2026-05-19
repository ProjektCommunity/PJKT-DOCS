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
            <p>Before you continue lurking around. Make sure to read the guide for new Reps</p>
            <div class="button-container">
              <a href="/info/new-representatives" class="action-button">Read it right here!</a>
            </div>
          </div>
        </div>
      </div>

## Create Your Booth

<div class="booth-choice">
  <!-- Primary: Web Booth Creator -->
  <div class="booth-card web-booth">
    <div class="booth-icon">🌐</div>
    <div class="booth-header">
      <h3>Web Booth Creator</h3>
      <p class="booth-tagline">For those who want a booth without the hassle</p>
    </div>
    <ul class="booth-features">
      <li>✨ No coding experience, we gotchu</li>
      <li>🎯 All done on the web</li>
      <li>⚡ Quick setup</li>
      <li>🧘‍♂️ Zero Unity-induced pain</li>
    </ul>
    <a href="/booths/web-booth-creator" class="booth-cta web-cta">Choose Peace of Mind</a>
  </div>

  <!-- Secondary: PJKT SDK -->
  <div class="booth-card sdk-booth">
    <div class="booth-icon">💻</div>
    <div class="booth-header">
      <h3>PJKT SDK</h3>
      <p class="booth-tagline">Brave souls who enjoy debugging Unity at 3 AM</p>
    </div>
    <ul class="booth-features">
      <li>🎨 Complete customization</li>
      <li>🔧 Cool interactive features</li>
      <li>🎮 Full Unity (and its pain)</li>
      <li>☕ I would grab a coffee...</li>
    </ul>
    <a href="/booths/getting-started-with-sdk" class="booth-cta sdk-cta">Embrace the Challenge</a>
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

/* Booth choice layout */
.booth-choice {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
  align-items: stretch;
}

.booth-card {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.web-booth {
  border-left: 4px solid var(--pjkt-cyan);
}

.sdk-booth {
  border-left: 4px solid var(--pjkt-purple);
}

.web-booth:hover {
  box-shadow: 0 4px 20px rgba(0, 198, 255, 0.08);
}

.sdk-booth:hover {
  box-shadow: 0 4px 20px rgba(160, 4, 255, 0.08);
}

.booth-badge {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  background: var(--pjkt-yellow);
  color: var(--vp-c-black);
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: 4px;
  margin-bottom: 1.25rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.booth-chip {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  font-size: 0.65rem;
  font-weight: 600;
  border-radius: 3px;
  margin-bottom: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.booth-icon {
  font-size: 2.5rem;
  margin-bottom: 1.25rem;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--vp-c-bg);
}

.web-booth .booth-icon {
  box-shadow: 0 0 0 2px rgba(0, 198, 255, 0.2);
}

.sdk-booth .booth-icon {
  box-shadow: 0 0 0 2px rgba(160, 4, 255, 0.2);
}

.booth-header h3 {
  margin: 0 0 0.5rem;
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}

.booth-tagline {
  margin: 0;
  font-size: 1rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
  line-height: 1.4;
}

.booth-features {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  flex-grow: 1;
}

.booth-features li {
  margin: 0.6rem 0;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.booth-cta {
  display: block;
  padding: 0.9rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  text-align: center;
  transition: all 0.2s ease;
  margin-top: auto;
}

.web-cta {
  background: var(--pjkt-cyan);
  color: var(--pjkt-black);
}

.web-cta:hover {
  background: #00b8e6;
  color: var(--pjkt-black);
  transform: translateY(-1px);
}

.sdk-cta {
  background: var(--pjkt-purple);
  color: var(--pjkt-white);
}

.sdk-cta:hover {
  background: #8a00d4;
  color: var(--pjkt-white);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .booth-choice {
    grid-template-columns: 1fr;
  }
  
  .booth-card {
    padding: 1.5rem;
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