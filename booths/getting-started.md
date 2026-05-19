# Gettings started with booths

<div class="booths-index-page">

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
      <li>✨ No coding, we gotchu</li>
      <li>🎯 All done on the web</li>
      <li>⚡ Quick setup</li>
      <li>🧘‍♂️ Zero Unity-induced pain</li>
    </ul>
    <a href="./web-booth-creator" class="booth-cta web-cta">Choose Peace of Mind</a>
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
    <a href="./getting-started-with-sdk" class="booth-cta sdk-cta">Embrace the Challenge</a>
  </div>
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
</style>