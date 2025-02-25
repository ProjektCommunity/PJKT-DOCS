# Booth Buttons & Components 2025

<script setup>
import { h } from 'vue'
</script>

<div class="components-page">
<!-- 
::: info Button Prefabs Available
<div class="prefabs-grid">
  <div class="prefab-card">
    <div class="prefab-icon">🔄</div>
    <div class="prefab-content">
      <h3>Object Toggles</h3>
      <p>Toggle visibility of objects</p>
    </div>
  </div>
  <div class="prefab-card">
    <div class="prefab-icon">👥</div>
    <div class="prefab-content">
      <h3>Open Group</h3>
      <p>Group info & store buttons</p>
    </div>
  </div>
  <div class="prefab-card">
    <div class="prefab-icon">↩️</div>
    <div class="prefab-content">
      <h3>Pickup Resets</h3>
      <p>Reset object positions</p>
    </div>
  </div>
  <div class="prefab-card">
    <div class="prefab-icon">⚡</div>
    <div class="prefab-content">
      <h3>Teleports</h3>
      <p>Player transportation</p>
    </div>
  </div>
</div>
::: -->

## 📖 Getting Started

<div class="setup-steps">
  <div class="step-card">
    <div class="step-number">1</div>
    <div class="step-content">
      <h3>Install SDK</h3>
      <p>Make sure you have the PJKT SDK installed and are logged in with a representative account.</p>
      <div class="step-note">Need help? Check the <a href="/booths/getting-started-with-sdk">Getting Started Guide</a></div>
    </div>
  </div>
  
  <div class="step-card">
    <div class="step-number">2</div>
    <div class="step-content">
      <h3>Import Package</h3>
      <p>Navigate to <code>PJKT SDK > SDK2</code> and find the <code>PJKT 2025 Button Prefabs</code> under ⚙️ Settings.</p>
    </div>
  </div>
  
  <div class="step-card">
    <div class="step-number">3</div>
    <div class="step-content">
      <h3>Use Prefabs</h3>
      <p>Find prefabs in <code>Assets\PJKT\Button Prefabs 2025\Prefabs</code>. Choose from:</p>
      <ul class="prefab-types">
        <li><strong>Buttons:</strong> UI Button triggered</li>
        <li><strong>Collision:</strong> Collider activated</li>
        <li><strong>Toggle:</strong> UI Toggle with state</li>
      </ul>
    </div>
  </div>
  
  <div class="step-card">
    <div class="step-number">4</div>
    <div class="step-content">
      <h3>Configure & Test</h3>
      <p>Set required properties in the inspector and test in Play Mode or Build & Test.</p>
      <div class="step-note">Check the demo scene at <code>Assets\PJKT\Button Prefabs 2025\Demo Scene\Demo Scene.unity</code></div>
    </div>
  </div>
</div>

## ➡️ TeleportPlayer

<div class="component-section">
  <div class="component-header">
    <div class="component-title">
      <div class="component-icon">⚡</div>
      <h3>Teleport Player Component</h3>
    </div>
    <div class="component-description">
      Instantly transport players to designated locations with configurable usage settings.
    </div>
  </div>

  <div class="demo-container">
    <div class="demo-tabs">
      <div class="demo-tab-header">
        <h4>🎮 In-Game Demonstration</h4>
      </div>
      <video controls>
        <source src="/Booths/TeleportDemo.mp4" type="video/mp4">
      </video>
    </div>
    <div class="demo-tabs">
      <div class="demo-tab-header">
        <h4>🛠️ Editor Tool Setup</h4>
      </div>
      <video controls>
        <source src="/Booths/TeleportEditorToolDemo.mp4" type="video/mp4">
      </video>
    </div>
  </div>

  <div class="settings-panel">
    <h4>📝 Configuration Options</h4>
    <div class="settings-grid">
      <div class="setting-item">
        <div class="setting-name">Teleport Destination</div>
        <div class="setting-desc">Transform reference for the target teleport location</div>
      </div>
      <div class="setting-item">
        <div class="setting-name">UI Buttons</div>
        <div class="setting-desc">Optional Unity UI button references for trigger activation</div>
      </div>
      <div class="setting-item">
        <div class="setting-name">One-time Use</div>
        <div class="setting-desc">Toggle for single-use functionality</div>
      </div>
    </div>
  </div>

  <div class="component-tip">
    <span class="tip-icon">💡</span>
    <span class="tip-text">Use the inspector's visual guides and gizmos to easily set up teleport locations</span>
  </div>
</div>

## 🔄 ResetPickups

<div class="component-section">
  <div class="component-header">
    <div class="component-title">
      <div class="component-icon">↩️</div>
      <h3>Reset Pickups Component</h3>
    </div>
    <div class="component-description">
      Reset VRCObjectSync pickups to their original positions with optional user restrictions.
    </div>
  </div>

  <div class="demo-container single">
    <div class="demo-tabs">
      <div class="demo-tab-header">
        <h4>🎮 Functionality Demo</h4>
      </div>
      <video controls>
        <source src="/Booths/PickupResetDemo.mp4" type="video/mp4">
      </video>
    </div>
  </div>

  <div class="settings-panel">
    <h4>📝 Configuration Options</h4>
    <div class="settings-grid">
      <div class="setting-item">
        <div class="setting-name">Pickups To Reset</div>
        <div class="setting-desc">List of VRCObjectSync components to be reset</div>
      </div>
      <div class="setting-item">
        <div class="setting-name">Use Whitelist</div>
        <div class="setting-desc">Enable user access restrictions</div>
      </div>
      <div class="setting-item">
        <div class="setting-name">Allowed Users</div>
        <div class="setting-desc">List of usernames with reset permissions</div>
      </div>
      <div class="setting-item">
        <div class="setting-name">UI Buttons</div>
        <div class="setting-desc">Optional Unity UI button references</div>
      </div>
    </div>
  </div>
</div>

## 👥 OpenGroupInformationContainer

<div class="component-section">
  <div class="component-header">
    <div class="component-title">
      <div class="component-icon">👥</div>
      <h3>Group Information Component</h3>
    </div>
    <div class="component-description">
      Display your group's information or store page through interactive elements.
    </div>
  </div>

  <div class="demo-container single">
    <div class="demo-tabs">
      <div class="demo-tab-header">
        <h4>🎮 Functionality Demo</h4>
      </div>
      <video controls>
        <source src="/Booths/GroupOpenDemo.mp4" type="video/mp4">
      </video>
    </div>
  </div>

  <div class="settings-panel">
    <h4>📝 Configuration Options</h4>
    <div class="settings-grid">
      <div class="setting-item">
        <div class="setting-name">Group ID</div>
        <div class="setting-desc">Your group's unique identifier (grp_xxxx-xxxx-xxxx-xxxx)</div>
      </div>
      <div class="setting-item">
        <div class="setting-name">Open To Store</div>
        <div class="setting-desc">Toggle to open group's store page instead</div>
      </div>
      <div class="setting-item">
        <div class="setting-name">UI Buttons</div>
        <div class="setting-desc">Optional Unity UI button references</div>
      </div>
    </div>
  </div>

  <div class="component-tip">
    <span class="tip-icon">💡</span>
    <span class="tip-text">Find your Group ID in your VRChat group's URL: vrchat.com/home/group/<strong>grp_xxxx...</strong></span>
  </div>
</div>

## 🔘 ButtonToggle

<div class="component-section">
  <div class="component-header">
    <div class="component-title">
      <div class="component-icon">🔄</div>
      <h3>Object Toggle Component</h3>
    </div>
    <div class="component-description">
      Toggle visibility of objects and control animations with customizable states.
    </div>
  </div>

  <div class="demo-container single">
    <div class="demo-tabs">
      <div class="demo-tab-header">
        <h4>🎮 Functionality Demo</h4>
      </div>
      <video controls>
        <source src="/Booths/ObjectToggleDemo.mp4" type="video/mp4">
      </video>
    </div>
  </div>

  <div class="settings-panel">
    <h4>📝 Configuration Options</h4>
    <div class="settings-grid">
      <div class="setting-item">
        <div class="setting-name">Objects To Toggle</div>
        <div class="setting-desc">GameObjects to be toggled on/off</div>
      </div>
      <div class="setting-item">
        <div class="setting-name">Animator Settings</div>
        <div class="setting-desc">Animator component and boolean parameters</div>
      </div>
      <div class="setting-item">
        <div class="setting-name">UI Elements</div>
        <div class="setting-desc">UI buttons and toggles for interaction</div>
      </div>
      <div class="setting-item">
        <div class="setting-name">Starting State</div>
        <div class="setting-desc">Initial state configuration on player load</div>
      </div>
    </div>
  </div>

  <div class="state-options">
    <h4>🎯 Starting State Options</h4>
    <div class="state-grid">
      <div class="state-item">
        <div class="state-name">Do Nothing</div>
        <div class="state-desc">Maintain editor state, invert on press</div>
      </div>
      <div class="state-item">
        <div class="state-name">Enable All</div>
        <div class="state-desc">Start with all objects enabled</div>
      </div>
      <div class="state-item">
        <div class="state-name">Disable All</div>
        <div class="state-desc">Start with all objects disabled</div>
      </div>
    </div>
  </div>
</div>

## 🔧 Troubleshooting

<div class="troubleshooting-section">
  <div class="trouble-grid">
    <div class="trouble-item">
      <div class="trouble-icon">⚠️</div>
      <div class="trouble-content">
        <h4>Missing Components</h4>
        <p>Verify that all required colliders or UI components are properly assigned</p>
      </div>
    </div>
    <div class="trouble-item">
      <div class="trouble-icon">🔍</div>
      <div class="trouble-content">
        <h4>Group ID Format</h4>
        <p>Ensure Group ID matches format: grp_xxxx-xxxx-xxxx-xxxx</p>
      </div>
    </div>
    <div class="trouble-item">
      <div class="trouble-icon">🎯</div>
      <div class="trouble-content">
        <h4>Unity UI Issues</h4>
        <p>Check UI button connections and event system setup.</p>
      </div>
    </div>
    <div class="trouble-item">
      <div class="trouble-icon">🎯</div>
      <div class="trouble-content">
        <h4>Need help?</h4>
        <p>Ask in representative channels of our Discord.</p>
      </div>
    </div>
  </div>
</div>

<style scoped>
.components-page {
  width: 100%;
  max-width: 100%;
}

.hero {
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(to bottom, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  border-radius: 12px;
  margin: 1rem 0 3rem;
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

.prefabs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.prefab-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.prefab-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.prefab-icon {
  font-size: 1.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.prefab-content h3 {
  margin: 0 0 0rem;
  font-size: 1rem;
  font-weight: 600;
}

.prefab-content p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.setup-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.step-card {
  position: relative;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.step-number {
  position: absolute;
  top: -1rem;
  left: -1rem;
  width: 2rem;
  height: 2rem;
  background: var(--vp-c-brand-dark, #0952af);
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.step-content h3 {
  margin: 0 0 0.75rem;
  color: var(--vp-c-text-1);
}

.step-content p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.step-note {
  margin-top: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.9rem;
}

.prefab-types {
  margin: 0.75rem 0 0;
  padding-left: 1.25rem;
}

.prefab-types li {
  margin: 0.25rem 0;
  color: var(--vp-c-text-2);
}

.components-page h1 {
  margin-bottom: 0;
}

.components-page h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.components-page .loading {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}

.components-page .error-message {
  color: var(--vp-c-danger);
  padding: 1rem;
  border: 1px solid var(--vp-c-danger);
  border-radius: 6px;
  margin: 1rem 0;
}

.components-page .script-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
}

.components-page .script-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-family: monospace;
}

.components-page .script-icon {
  opacity: 0.7;
}

.components-page .feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.components-page .feature-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  text-align: center;
}

.components-page .feature-title {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.components-page .feature-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: var(--vp-c-brand);
}

.components-page .feature-note {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

/* Override global styles */
.components-page hr {
  border-color: var(--vp-c-divider);
  margin: 2rem 0;
}

.components-page h3 {
  color: var(--vp-c-text-1);
  margin: 1.5rem 0 1rem;
}

.components-page ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.components-page li {
  color: var(--vp-c-text-1);
  margin: 0.5rem 0;
}

/* Style sections */
.components-page .overview {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
}

.components-page .key-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.components-page .inspector-settings {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
}

.component-section {
  margin: 2.5rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.component-header {
  margin-bottom: 2rem;
}

.component-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.component-icon {
  font-size: 1.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.component-description {
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  margin-left: calc(2.25rem + 1rem);
}

.demo-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.demo-container.single {
  grid-template-columns: 1fr;
  max-width: 800px;
  margin: 1.5rem auto;
}

.demo-tabs {
  background: var(--vp-c-bg);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.demo-tab-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-tab-header h4 {
  margin: 0;
  color: var(--vp-c-text-1);
}

.demo-tabs video {
  width: 100%;
  display: block;
}

.settings-panel {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
}

.settings-panel h4 {
  margin: 0 0 1rem;
  color: var(--vp-c-text-1);
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.setting-item {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.setting-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.setting-desc {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.component-tip {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 4px solid var(--vp-c-brand);
}

.tip-icon {
  font-size: 1.2rem;
}

.tip-text {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.state-options {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
}

.state-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.state-item {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.state-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.state-desc {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.troubleshooting-section {
  margin: 2.5rem 0;
}

.trouble-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.trouble-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.trouble-icon {
  font-size: 1.5rem;
}

.trouble-content h4 {
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
}

.trouble-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

@media (max-width: 640px) {
  .components-page h1 {
    font-size: 1.8rem;
  }
  
  .components-page h2 {
    font-size: 1.4rem;
  }
  
  .prefabs-grid {
    grid-template-columns: 1fr;
  }
  
  .step-card {
    margin-left: 1rem;
  }
  
  .component-section {
    padding: 1rem;
  }
  
  .component-description {
    margin-left: 0;
    margin-top: 1rem;
  }
  
  .settings-grid,
  .state-grid {
    grid-template-columns: 1fr;
  }
  
  .trouble-grid {
    grid-template-columns: 1fr;
  }
}
</style>

</div>