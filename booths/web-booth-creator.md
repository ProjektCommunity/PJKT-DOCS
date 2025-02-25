# Web Booth Creator

<div class="guide-page">

## 🚧 Work In Progress 🚧

<div class="wip-notice">
  <div class="wip-icon">🏗️</div>
  <div class="wip-content">
    <h3>This documentation is currently under construction</h3>
    <p>We're working hard to complete this guide. Please check back soon for updates!</p>
  </div>
</div>

## Introduction

The Web Booth Creator is an tool that will allow you to create and customize PJKT booths directly through your web browser, without needing Unity experience.

## Getting Started with the Editor

### Using the Web Booth Creator

<div class="steps-container">
  <div class="step-card">
    <div class="step-icon">🌐</div>
    <div class="step-content">
      <h4>0. Access the Booth Editor</h4>
      <div class="step-details">
        <p>Go to <a href="https://booth.projektcommunity.com/" target="_blank">https://booth.projektcommunity.com/</a> to access the web booth editor.</p>
      </div>
    </div>
  </div>

  <div class="step-card">
    <div class="step-icon">🔑</div>
    <div class="step-content">
      <h4>1. Login to the Editor</h4>
      <div class="step-details">
        <p class="step-warning">⚠️ Note: The Unity application may take a moment to load when you first open it.</p>
        <div class="step-progress">
          <span class="progress-item">① Enter your registered email</span>
          <span class="progress-item">② Type your password</span>
          <span class="progress-item">③ Click "Login"</span>
          <span class="progress-success">✓ Success: You'll see your username with "Logout" and "Upload Your Images Here!" options</span>
        </div>
      </div>
    </div>
  </div>

  <div class="step-card">
    <div class="step-icon">🎯</div>
    <div class="step-content">
      <h4>2. Choose Your Images</h4>
      <p>In the right panel, locate the image slots you want to customize (e.g., "TOP BANNER", "NEON ORNAMENT", "LEFT POSTER") and click "Choose File" next to each one.</p>
    </div>
  </div>

  <div class="step-card">
    <div class="step-icon">📐</div>
    <div class="step-content">
      <h4>3. Check Requirements</h4>
      <p>Ensure your images meet the size requirements for each slot (e.g., "3242x432" for banners) to prevent stretching.</p>
    </div>
  </div>

  <div class="step-card">
    <div class="step-icon">⬆️</div>
    <div class="step-content">
      <h4>4. Upload Your Work</h4>
      <p>Click the "Upload" button at the bottom of the panel to submit all your selected images.</p>
    </div>
  </div>
</div>

::: tip Success Indicator
After upload: You'll see a "Make has been submitted" confirmation message
:::

## 🎉 Congratulations!

  <div class="success-content">
    <h3>Your booth is now Ready!</h3>
  </div>

<style scoped>
.guide-page {
  width: 100%;
  max-width: 100%;
}

.wip-notice {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--vp-c-warning-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-warning);
  margin: 2rem 0;
}

.wip-icon {
  font-size: 2.5rem;
}

.wip-content h3 {
  margin: 0 0 0.5rem;
  color: var(--vp-c-warning-dark);
}

.wip-content p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.feature-icon {
  font-size: 1.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.feature-content h3 {
  margin: 0 0 0.5rem;
}

.feature-content p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
}

.step-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.step-icon {
  font-size: 1.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.step-content {
  flex: 1;
}

.step-content h4 {
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
}

.step-content p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.step-warning {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-warning-soft);
  border-left: 3px solid var(--vp-c-warning);
  border-radius: 4px;
  color: var (--vp-c-text-1);
  font-size: 0.9rem;
}

.step-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step-progress {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 0.5rem;
  border-left: 2px solid var(--vp-c-divider);
  margin-top: 0.5rem;
}

.progress-item {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.progress-success {
  color: var(--vp-c-green-1);
  font-size: 0.9rem;
  margin-top: 0.25rem;
  padding-top: 0.25rem;
  border-top: 1px dashed var(--vp-c-divider);
}

@media (max-width: 640px) {
  .wip-notice {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }

  .step-card {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }

  .step-icon {
    margin: 0 auto;
  }

  .step-progress {
    align-items: center;
    border-left: none;
    border-top: 2px solid var(--vp-c-divider);
    padding-left: 0;
    padding-top: 0.5rem;
    margin-top: 0.75rem;
  }
}
</style>

</div>