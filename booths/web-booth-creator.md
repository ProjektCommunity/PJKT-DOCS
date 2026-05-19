# Web Booth Creator

<div class="guide-page">

::: warning Work In Progress
This documentation is still being completed. The steps below cover the current workflow but some image slot details are pending.
:::

## Introduction

The Web Booth Creator lets you create and customise PJKT booths directly in your browser — no Unity experience needed. You upload images for each slot in the booth template and the tool assembles the result.

## Getting Started with the Editor

### Using the Web Booth Creator

<div class="steps-container">
  <div class="step-card">
    <div class="step-icon">🌐</div>
    <div class="step-content">
      <h4>Step 1 — Access the Booth Editor</h4>
      <div class="step-details">
        <p>Go to <a href="https://booth.projektcommunity.com/" target="_blank">https://booth.projektcommunity.com/</a> to open the web booth editor.</p>
      </div>
    </div>
  </div>

  <div class="step-card">
    <div class="step-icon">🔑</div>
    <div class="step-content">
      <h4>Step 2 — Log In</h4>
      <div class="step-details">
        <div class="step-progress">
          <span class="progress-item">① Enter your registered email</span>
          <span class="progress-item">② Enter your password</span>
          <span class="progress-item">③ Click <strong>Login</strong></span>
          <span class="progress-success">✓ You'll see your username and the image upload panel</span>
        </div>
      </div>
    </div>
  </div>

  <div class="step-card">
    <div class="step-icon">🎯</div>
    <div class="step-content">
      <h4>Step 3 — Upload Your Images</h4>
      <p>In the right panel, locate each image slot and click <strong>Choose File</strong> to pick your image. Each slot has a required pixel size — see the table below.</p>
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

::: warning Upload buttons or 3D preview not Showing?
If you don't see a 3D preview of your booth after uploading images, you may need to enable **Hardware acceleration** in your web browser:

1. Open your browser settings
2. Enable "Hardware acceleration" (or "Use hardware acceleration when available")
3. **Restart your browser** completely after enabling this setting
4. Return to the booth editor

Most modern browsers require hardware acceleration, which the 3D preview depends on.
:::

## 🖼️ Image Slots

Each slot in the booth template has a fixed pixel size. Images that do not match will be stretched.

::: tip
Use the "DOWNLOAD TEMPLATE IMAGES" button to download a zip file with correctly sized placeholder images for each slot. You can design your booth by replacing these placeholders with your own images in your design tool, then export at the same pixel dimensions.
:::

## 📁 Image Requirements

- **Accepted formats:** PNG, JPG
- **Colour space:** sRGB
- **Match the pixel dimensions shown for each slot**

## ❓ Troubleshooting

<div class="trouble-grid">
  <div class="trouble-item">
    <div class="trouble-icon">🔴</div>
    <div class="trouble-content">
      <h4>Images look stretched</h4>
      <p>Your image does not match the required slot dimensions. Export from your design tool at the exact pixel size shown next to that slot's file picker.</p>
    </div>
  </div>
  <div class="trouble-item">
    <div class="trouble-icon">💬</div>
    <div class="trouble-content">
      <h4>Still stuck?</h4>
      <p>Ask in the representative channels of the PJKT Discord.</p>
    </div>
  </div>
</div>

<style scoped>
.guide-page {
  width: 100%;
  max-width: 100%;
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
  flex-shrink: 0;
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

.trouble-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
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
  font-size: 1.25rem;
  flex-shrink: 0;
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
  .step-card {
    flex-direction: column;
  }

  .step-icon {
    margin: 0;
  }

  .trouble-grid {
    grid-template-columns: 1fr;
  }
}
</style>

</div>

