<div class="guide-page">

# Graffiti Grab 2025: Installation and Setup Guide

## 🔍 Requirements

<div> <!-- Removed class="prerequisites-grid" -->  <div class="prereq-card" style="border: 2px solid var(--vp-c-brand); background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);">
    <div class="prereq-icon" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-dark);">📦</div>
    <div class="prereq-content">
      <h3>TextMeshPro</h3>
      <p><strong>⚠️ IMPORTANT:</strong> If you don't have the essentials imported, Unity will likely prompt you to import TMP Essentials when you first import or use TextMeshPro components. <strong>Make sure to click "Import TMP Essentials" when prompted!</strong></p>
    </div>
  </div>
  <div class="prereq-card">
    <div class="prereq-icon">🎮</div>
    <div class="prereq-content">
      <h3>VRChat SDK (UdonSharp + Optional Persistence)</h3>
      <p>This package requires the VRChat SDK, specifically with UdonSharp capabilities enabled. Persistence capability within the SDK is optional but highly recommended for certain features.</p>
    </div>
  </div>
</div>

This guide explains how to import the Graffiti Grab Unity package into your project and position the necessary elements in your scene.

## 📝 Installation Steps

<div class="steps-container">
  <div class="step-card">
    <div class="step-header">
      <div class="step-number">1</div>
      <h3>Locate the Package File</h3>
    </div>
    <div class="step-content">
      <p>Navigate using your File Explorer to the directory where you saved the <code>Graffiti-Grab-2025.unitypackage</code> file.</p>
    </div>
  </div>
  <div class="step-card">
    <div class="step-header">
      <div class="step-number">2</div>
      <h3>Initiate Import</h3>
    </div>
    <div class="step-content">
      <p>Double-click the <code>Graffiti-Grab-2025.unitypackage</code> file.</p>
      <p><em>(Alternatively, you can drag and drop the <code>.unitypackage</code> file directly into the Unity Editor's Project window, or use the <code>Assets > Import Package > Custom Package...</code> menu option in Unity for the Unity Editors that feel grumpy about opening the file directly).</em></p>
    </div>
  </div>
  <div class="step-card">
    <div class="step-header">
      <div class="step-number">3</div>
      <h3>Confirm Import Contents & Wait</h3>
    </div>    <div class="step-content">
      <ul>
        <li>Unity will become the active window, and the "Import Unity Package" dialog will appear.</li>
        <li>Ensure all assets are selected (this is the default).</li>
        <li>Click the <strong>Import</strong> button.</li>
        <li>Allow Unity to complete the import process. This may involve compiling scripts, importing assets, etc.</li>
      </ul>
    </div>
  </div>
   <div class="step-card">
    <div class="step-header">
      <div the="step-number">4</div>
      <h3>Locate Imported Assets</h3>
    </div>
    <div class="step-content">
      <p>In your Unity <strong>Project</strong> window, navigate to the newly created <code>Assets/PJKT Graffiti Grab</code> folder.</p>
    </div>
  </div>
</div>

## 🛠️ Prefab Setup

<div class="steps-container">
  <div class="step-card">
    <div class="step-header">
      <div class="step-number">1</div>
      <h3>Add Prefab to Scene</h3>
    </div>
    <div class="step-content">
      <p>Drag the <code>Graffiti Grab 2025</code> prefab from the <code>Assets/PJKT Graffiti Grab</code> folder into your <strong>Scene</strong> view or the <strong>Hierarchy</strong> window. This places the main asset structure into your current scene.</p>
    </div>
  </div>  <div class="step-card">
    <div class="step-header">
      <div class="step-number">2</div>
      <h3>Adjust Orientation Of Instructions & Basket</h3>
    </div>    <div class="step-content">
      <ul>
        <li>In the <strong>Hierarchy</strong> window, expand the <code>Graffiti Grab 2025</code> GameObject.</li>
        <li>Select both the <code>Instruction Board</code> and the <code>Egg Basket + Manager</code> child GameObjects (you can <code>Ctrl+Click</code> to select multiple objects).</li>
        <li>Using positioning tools position them somewhere around your spawn. Make it nice and visible to the visitor.</li>
      </ul>
    </div>
  </div>  <div class="step-card featured">
    <div class="step-header">
      <div class="step-number">3</div>
      <h3>Configure Egg Manager Settings</h3>
    </div>    <div class="step-content">
      <ul>
        <li>In the <strong>Hierarchy</strong> window, select the <code>Egg Basket + Manager</code> GameObject within the <code>Graffiti Grab 2025</code> prefab.</li>
        <li>Look at the <strong>Inspector</strong> panel to find the <code>Egg Manager</code> component attached to this GameObject.</li>
        <li>From the dropdown menu, select the world that you're uploading to. This will automatically set up the correct keyword and next world UI elements.</li>
      </ul>
    </div>
  </div>
  <div class="step-card">
    <div class="step-header">
      <div class="step-number">4</div>
      <h3>Position Collectible Eggs</h3>
    </div>    <div class="step-content">
      <ul>
        <li>Further expand the <code>Graffiti Grab 2025</code> GameObject in the <strong>Hierarchy</strong>.</li>
        <li>Locate the parent GameObject containing the eggs under <code>Graffiti Grab 2025 > Collectible Eggs [Move these]</code>.</li>
        <li>When moving the eggs, make sure to only move the root of the <code>Collect Egg</code> object (<code>Collect Egg 1</code>, <code>Collect Egg 2</code>, <code>Collect Egg 3</code>, <code>Collect Egg 4</code>, <code>Collect Egg 5</code>).</li>
      </ul>
    </div>
  </div>
  <div class="step-card">
    <div class="step-header">
      <div class="step-number">4</div>
      <h3>You are done!</h3>
    </div>    <div class="step-content">
      <ul>
        <li>You can now play the scene and test the Graffiti Grab functionality.</li>
        <li>I recommend you to test it in the <code>Play</code> mode of Unity first, and then test it in the actual game.</li>
        <li>Cool bonus points if you also test it on mobile platforms.</li>
        <li>If you have any issues, please contact me on Discord: pesky12</li>
      </ul>
    </div>
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
  margin-bottom: 1.5rem;
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

.step-content p, .step-content em {
  margin-bottom: 0.5rem;
}

.step-content strong {
  font-weight: 600;
}

.step-content code {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.2em 0.4em;
  font-size: 0.9em;
  font-family: var(--vp-font-family-mono);
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
  color: var(--vp-c-text-1);
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
</style>

</div>
