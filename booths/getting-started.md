# Booth Creation Options

<div class="booths-index-page">

## 🎨 Choose Your Path

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
      <a href="./web-booth-creator" class="action-button web-button">Choose Peace of Mind</a>
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
      <a href="./getting-started-with-sdk" class="action-button sdk-button">Embrace the Challenge</a>
    </div>
  </div>
</div>

## 📚 Essential Resources

<div class="resources-grid">
  <a href="./specifications" class="resource-card">
    <div class="resource-icon">📋</div>
    <h4>Booth Specifications</h4>
    <p>Technical requirements and limitations</p>
  </a>

  <a href="./components" class="resource-card">
    <div class="resource-icon">🧩</div>
    <h4>Components Reference</h4>
    <p>Available components and features</p>
  </a>
</div>

## ❓ Need Help?

<div class="help-section">
  <p>If you encounter any issues or have questions:</p>
  <ul class="help-list">
    <li>📚 Check the specifications and guidelines</li>
    <li>📖 Review our documentation</li>
    <li>💬 Contact our staff team for specific concerns</li>
  </ul>
</div>

</div>

<style scoped>
.booths-index-page {
  width: 100%;
  max-width: 100%;
  padding: 1rem;
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

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.resource-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
  position: relative;
}

.resource-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, 
    var(--pjkt-yellow), 
    var(--pjkt-cyan)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  border-radius: inherit;
}

.resource-card:hover::after {
  opacity: 0.1;
}

.resource-card:hover {
  transform: translateY(-2px);
  border-color: var(--pjkt-yellow);
  background: linear-gradient(135deg, 
    rgba(255, 228, 0, 0.05),
    rgba(0, 198, 255, 0.05)
  );
  box-shadow: 0 4px 12px rgba(255, 228, 0, 0.1);
}

.resource-card .resource-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.resource-card:hover .resource-icon {
  transform: scale(1.1);
}

.resource-card h4 {
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
}

.resource-card:hover h4 {
  color: var(--pjkt-yellow);
}

.resource-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.help-section {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.help-section:hover {
  border-color: var(--pjkt-cyan);
  background: linear-gradient(135deg,
    rgba(0, 198, 255, 0.05),
    transparent
  );
  box-shadow: 0 4px 12px rgba(0, 198, 255, 0.1);
  transform: translateY(-2px);
}

.help-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
}

.help-list li {
  margin: 0.5rem 0;
  color: var(--vp-c-text-1);
}

@keyframes borderGlow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
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
</style>