# Getting Started with PJKT SDK

<div class="guide-page">

## 🔍 Prerequisites

<div class="prerequisites-grid">
  <div class="prereq-card">
    <div class="prereq-icon">🌐</div>
    <div class="prereq-content">
      <h3>Basic Unity setup</h3>
      <p>Make sure you are setup with the VCC and basic Unity setup for VRChat creation.</p>
    </div>
  </div>
  <div class="prereq-card">
    <div class="prereq-icon">🛠️</div>
    <div class="prereq-content">
      <h3>Editor Creator Companion (VCC)</h3>
      <p>Download from the official VRChat website if needed</p>
    </div>
  </div>
</div>

## 📝 Step-by-Step Guide

<div class="steps-container">
  <div class="step-card">
    <div class="step-header">
      <div class="step-number">1</div>
      <h3>Add SDK Repository to VCC</h3>
    </div>
    <div class="step-content">
      <p>Click the button below to add the PJKT SDK repository to your VCC:</p>
      <div class="button-link-container">
        <div class="vcc-button">
          <a href="vcc://vpm/addRepo?url=https://Projekt-Community.github.io/PJKT-SDK/index.json" class="vcc-link">
            Add to VCC
          </a>
        </div>
        <div class="copy-link-box">
          <input type="text" value="https://Projekt-Community.github.io/PJKT-SDK/index.json" readonly class="link-input" />
          <button class="copy-button" onclick="navigator.clipboard.writeText('https://Projekt-Community.github.io/PJKT-SDK/index.json')">
            📋
          </button>
        </div>
      </div>
      <div class="step-note">
        <span class="note-icon">ℹ️</span>
        <span>Your browser may ask for permission to open VCC</span>
      </div>
    </div>
  </div>
  <div class="step-card">
    <div class="step-header">
      <div class="step-number">2</div>
      <h3>Create New World Project</h3>
    </div>
    <div class="step-content">
      <p>Set up a new Unity world project in VCC:</p>
      <ol class="step-list">
        <li>Open the "Projects" tab</li>
        <li>Click "Create New Project"</li>
        <li>Select "Unity 2022 World" project type</li>
        <li>Choose "Unity 2022 Worlds Project"</li>
        <li>Enter your project name</li>
        <li>Click "Create Project"</li>
      </ol>
      <div class="step-note">
        <span class="note-icon">ℹ️</span>
        <span>Make sure to give your project a descriptive name related to your booth.</span>
      </div>
    </div>
  </div>

  <div class="step-card">
    <div class="step-header">
      <div class="step-number">3</div>
      <h3>Project Creation and Package Import</h3>
    </div>
    <div class="step-content">
      <p>Wait for VCC to create your project and download necessary packages.</p>
      <div class="alert info">
        <span class="alert-icon">⏳</span>
        <span>This process may take a few minutes.</span>
      </div>
    </div>
  </div>

  <div class="step-card">
    <div class="step-header">
      <div class="step-number">4</div>
      <h3>Add the SDK Package</h3>
    </div>
    <div class="step-content">
      <div class="step-grid">
        <div class="grid-item">
          <ol class="step-list">
            <li>Find your project in the VCC project list</li>
            <li>Click "Manage Project" to access package management</li>
            <li>Locate "Projekt: Community SDK" in the package list</li>
            <li>Click the "Add" button next to the package</li>
          </ol>
          <div class="step-note">
            <span class="note-icon">ℹ️</span>
            <span>Check VCC for SDK updates before you build or upload.</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="step-card">
    <div class="step-header">
      <div class="step-number">5</div>
      <h3>Unity Editor Launch</h3>
    </div>
    <div class="step-content">
      <p>Unity will automatically launch and begin initial setup.</p>
      <div class="alert info">
        <span class="alert-icon">⏳</span>
        <span>This process may take a few minutes.</span>
      </div>
      <div class="alert danger">
        <span class="alert-icon">⚠️</span>
        <span>If Unity opens in "Safe Mode", click the "Exit Safe Mode" button in the top-right corner and confirm the prompt asking if you're sure. This is normal for first-time setup, due to PJKTSDK scripts compiling before VRChat SDK.</span>
      </div>
    </div>
  </div>

  <div class="step-card">
    <div class="step-header">
      <div class="step-number">6</div>
      <h3>Explore Unity Scene</h3>
    </div>
    <div class="step-content">
      <p>You'll be presented with a blank Unity scene - your canvas for creation!</p>
    </div>
  </div>

  <div class="step-card">
    <div class="step-header">
      <div class="step-number">7</div>
      <h3>Handle Initial Console Messages</h3>
    </div>
    <div class="step-content">
      <p>You may see some console messages during first-time setup.</p>
      <div class="alert tip">
        <span class="alert-icon">💡</span>
        <span>Initial ⚠️warnings are common, press the clear in your console. If everything dissapears, everything is good.</span>
      </div>
    </div>
  </div>
</div>

<div class="steps-container">
  <div class="step-card">
    <div class="step-header">
      <div class="step-number">8</div>
      <h3>Log In to the SDK Window</h3>
    </div>
    <div class="step-content">
      <p>Go to <code>PJKT SDK → Show SDK Window</code> in the Unity menu bar. Sign in with your PJKT representative account.</p>
    </div>
  </div>

  <div class="step-card">
    <div class="step-header">
      <div class="step-number">9</div>
      <h3>Add a Booth Descriptor</h3>
    </div>
    <div class="step-content">
      <p>Create an empty GameObject in your scene and name it after your community. Add the <strong>Booth Descriptor</strong> component via <code>Add Component → PJKT → Booth Descriptor</code>.</p>
      <ol class="step-list">
        <li>Optionally fill in the three <strong>Representatives</strong> fields with the names you want on the booth record, these fields may or may not have a use in FEST worlds.</li>
        <li>Build your booth content as children of this root GameObject, like you would with an avatar.</li>
      </ol>
      <div class="step-note">
        <span class="note-icon">ℹ️</span>
        <span>A gizmo box shows the maximum booth footprint in the Scene view. Keep all your meshes inside it.</span>
      </div>
    </div>
  </div>

  <div class="step-card">
    <div class="step-header">
      <div class="step-number">10</div>
      <h3>Validate Your Booth</h3>
    </div>
    <div class="step-content">
      <p>Open the <strong>Booths</strong> tab in the SDK and click your booth card. The SDK runs validation when you select the booth in the SDK</p>
      <p style="margin-top: 0.75rem;">The booth panel shows the current report and checks for when something being out of specification.</p>
      <div class="alert danger">
        <span class="alert-icon">⚠️</span>
        <span>Fix every issue on the booth card before you press upload.</span>
      </div>
    </div>
  </div>

  <div class="step-card">
    <div class="step-header">
      <div class="step-number">11</div>
      <h3>Upload Your Booth</h3>
    </div>
    <div class="step-content">
      <p>Open the <strong>Events</strong> tab only if you need to switch to a different event. Then return to the <strong>Booths</strong> tab and press <strong>Build and upload Booth</strong>.</p>
      <ol class="step-list">
        <li>Select the community on the booth card first. The upload button stays disabled until you do.</li>
        <li>Read and accept the rights disclaimer.</li>
        <li>Read and accept the booth change list. The SDK will adjust booth settings before it builds in some cases.</li>
        <li>The SDK builds the booth, does additional checks, and uploads the result!</li>
      </ol>
      <div class="step-note">
        <span class="note-icon">ℹ️</span>
        <span>Your account also needs upload access for the selected community. If the SDK rejects the upload, read the booth card message and the notification toast.</span>
      </div>
    </div>
  </div>

</div>

## 🎉 Congratulations!

<div class="success-panel">
  <div class="success-icon">🎯</div>
  <div class="success-content">
    <h3>Upload complete</h3>
    <p>When the upload finishes, the SDK shows a success! Now to finally drink that (now) cold coffee...</p>
  </div>
</div>

## 🔜 Next Steps

<div class="next-steps-grid">
  <div class="next-card">
    <a href="./specifications" style="text-decoration: none; color: inherit;">
      <div class="next-content">
        <h4>📐 Check the specs.</h4>
        <p>Need to know what's allowed? What not to do?</p>
      </div>
    </a>
  </div>
  <div class="next-card">
    <a href="./components" style="text-decoration: none; color: inherit;">
      <div class="next-content">
        <h4>🔘 Explore Components</h4>
        <p>Get familiar with what you can put on your booth!</p>
      </div>
    </a>
  </div>
</div>

<style scoped>
.guide-page {
  width: 100%;
  max-width: 100%;
}

.guide-hero {
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  border-radius: 12px;
  margin: 1rem 0 3rem;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
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

.prerequisites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.prereq-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.prereq-icon {
  font-size: 1.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.prereq-content h3 {
  margin: 0 0 0.5rem;
}

.prereq-content p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;
}

.step-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  padding: 1.5rem;
}

.step-card.featured {
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  border: 1px solid var(--vp-c-brand);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.step-number {
  width: 2rem;
  height: 2rem;
  background: var(--vp-c-brand-dark);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex-shrink: 0;
}

.step-header h3 {
  margin: 0;
  line-height: 2rem;
}

.step-content {
  margin-left: 3rem;
}

.step-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.grid-item h4 {
  margin: 0 0 0.75rem;
  color: var(--vp-c-text-1);
}

.step-list {
  margin: 0.5rem 0;
  padding-left: 1.25rem;
}

.step-list li {
  margin: 0.5rem 0;
  color: var(--vp-c-text-1); /* Changed from var(--vp-c-text-2) to var(--vp-c-text-1) for better contrast */
}

.step-tip, .step-note {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.9rem;
}

.alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

.alert.info {
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
}

.alert.warning {
  background: var(--vp-c-warning-soft);
  border-left: 4px solid var(--vp-c-warning);
}

.alert.danger {
  background: var(--vp-c-danger-soft);
  border-left: 4px solid var(--vp-c-danger);
  color: var(--vp-c-danger-text);
}

.alert.tip {
  background: var(--vp-c-tip-soft);
  border-left: 4px solid var(--vp-c-tip);
}

.check-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.check-icon {
  color: var(--vp-c-brand);
}

.success-panel {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-brand);
  margin: 2rem 0;
}

.success-icon {
  font-size: 2.5rem;
}

.success-content h3 {
  margin: 0 0 0.5rem;
  color: var(--vp-c-brand);
}

.success-content p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.next-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.next-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.next-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.next-icon {
  font-size: 1.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
}

.next-content h4 {
  margin: 0 0 0.25rem;
}

.next-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

kbd {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.2em 0.4em;
  font-size: 0.9em;
  font-family: var(--vp-font-family-mono);
}

.vcc-button {
  margin: 1rem 0;
}

.vcc-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #2563eb; /* Strong blue for better contrast */
  color: #ffffff !important;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* Improves text readability */
  letter-spacing: 0.02em;
}

.vcc-link:hover {
  background: #1d4ed8; /* Darker blue for hover state */
  text-decoration: none;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.vcc-link:active {
  transform: translateY(0);
  background: #1e40af; /* Even darker for active state */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.button-link-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.copy-link-box {
  display: flex;
  align-items: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.25rem;
  max-width: 100%;
  width: fit-content;
}

.link-input {
  background: transparent;
  border: none;
  color: var(--vp-c-text-2);
  padding: 0.5rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  width: 320px;
  max-width: calc(100% - 40px);
  outline: none;
}

.copy-button {
  background: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-button:hover {
  color: var(--vp-c-brand);
}

@media (max-width: 640px) {
  .link-input {
    width: 200px;
  }
  
  .button-link-container {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .copy-link-box {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .guide-hero {
    padding: 3rem 1rem;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-tagline {
    font-size: 1.1rem;
  }
  
  .step-content {
    margin-left: 0;
    margin-top: 1rem;
  }
  
  .success-panel {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }
  
  .next-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.validation-legend {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0.75rem 0;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.9rem;
}

.legend-item {
  color: var(--vp-c-text-2);
}
</style>

</div>