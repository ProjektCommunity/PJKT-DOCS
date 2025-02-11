# PJKT Booth Creation Guidelines

<script setup>
import { onMounted, ref, nextTick, onUnmounted } from 'vue'
import * as THREE from 'three'

const specs = ref(null)
const loading = ref(true)
const error = ref(null)
const eventName = ref('')
const eventInfo = ref(null)

// Three.js setup for booth preview
const canvasRef = ref(null)
let renderer, scene, camera, animationFrameId

onMounted(async () => {
  try {
    const response = await fetch('https://api.projektcommunity.com/projects')
    const data = await response.json()
    const now = new Date()
    
    // Find the closest future event that's accepting booths
    const futureEvents = data.projects
      .filter(p => p.accepting_booth && p.booth_requirements && new Date(p.start_date) > now)
      .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))

    if (futureEvents.length === 0) {
      error.value = 'No upcoming events are currently accepting booths'
      loading.value = false
      return
    }

    const nextEvent = futureEvents[0]
    specs.value = nextEvent.booth_requirements
    eventName.value = nextEvent.name
    eventInfo.value = {
      startDate: new Date(nextEvent.start_date).toLocaleDateString(),
      endDate: new Date(nextEvent.end_date).toLocaleDateString(),
      deadline: new Date(nextEvent.booth_deadline_date).toLocaleDateString(),
      logo: nextEvent.Logo?.path,
      preview: nextEvent.preview_link
    }
    loading.value = false
    
    // Initialize Three.js only after specs are loaded
    nextTick(() => {
      if (canvasRef.value && specs.value) {
        initThreeJS()
      }
    })
  } catch (e) {
    error.value = 'Failed to load specifications'
    loading.value = false
  }
})

onUnmounted(() => {
  // Cleanup Three.js resources
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  if (renderer) {
    renderer.dispose()
  }
  if (scene) {
    scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose()
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose())
        } else {
          object.material.dispose()
        }
      }
    })
  }
})

function initThreeJS() {
  // Scene setup
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf5f5f5)

  // Camera setup
  const container = canvasRef.value
  const aspect = container.clientWidth / container.clientHeight
  camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
  camera.position.set(10, 8, 10)
  camera.lookAt(0, 0, 0)

  // Renderer setup
  renderer = new THREE.WebGLRenderer({
    canvas: container,
    antialias: true,
    alpha: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(container.clientWidth, container.clientHeight)

  // Add grid helper
  const gridHelper = new THREE.GridHelper(10, 10)
  scene.add(gridHelper)

  // Add booth cube
  if (specs.value?.MaxDims) {
    const [width, length, height] = specs.value.MaxDims
    const geometry = new THREE.BoxGeometry(width, height, length)
    const material = new THREE.MeshPhongMaterial({
      color: 0x2196f3,
      transparent: true,
      opacity: 0.5,
    })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.y = height / 2
    scene.add(cube)

    // Add wireframe
    const wireframe = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({ color: 0x000000 })
    )
    wireframe.position.y = height / 2
    scene.add(wireframe)
  }

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
  directionalLight.position.set(10, 20, 10)
  scene.add(directionalLight)

  // Animation loop
  function animate() {
    animationFrameId = requestAnimationFrame(animate)
    if (camera) {
      camera.position.x = 10 * Math.cos(Date.now() * 0.0005)
      camera.position.z = 10 * Math.sin(Date.now() * 0.0005)
      camera.lookAt(0, 0, 0)
    }
    renderer.render(scene, camera)
  }
  animate()

  // Handle window resize
  const handleResize = () => {
    if (container) {
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
  }
  window.addEventListener('resize', handleResize)
}

const formatNumber = (num) => num.toLocaleString()
</script>

<div v-if="loading" class="loading">Loading specifications...</div>
<div v-else-if="error" class="error-message">{{ error }}</div>
<template v-else>

<div class="specs-content">
<div class="event-header">
    <img v-if="eventInfo.logo" :src="eventInfo.logo" :alt="eventName + ' logo'" class="event-logo">
    <div class="event-info">
        <h1 class="event-title">{{ eventName }}</h1>
        <div class="event-metadata">
            <div class="dates">
                <span class="icon">📅</span>
                <span>Event: {{ eventInfo.startDate }} - {{ eventInfo.endDate }}</span>
            </div>
            <div class="deadline">
                <span class="icon">⏰</span>
                <span>Booth submissions due: {{ eventInfo.deadline }}</span>
            </div>
            <div v-if="eventInfo.preview" class="preview-info">
                <a :href="eventInfo.preview" target="_blank" rel="noopener">
                    <span class="icon">🔍</span>
                    <span>Preview Event Space</span>
                </a>
            </div>
        </div>
    </div>
</div>

::: warning IMPORTANT NOTE
Before creating your booth, make sure to review all specifications carefully. Staff may contact you for adjustments if needed.
:::

## 📐 Geometry and Bounds

::: info Technical Specifications
<div class="specs-grid">
  <div class="spec-item">
    <div class="spec-value">{{ formatNumber(specs.MaxTriangles) }}</div>
    <div class="spec-label">Max Triangles</div>
  </div>
  <div class="spec-item">
    <div class="spec-value">{{ specs.MaxMaterial }}</div>
    <div class="spec-label">Materials</div>
  </div>
  <div class="spec-item">
    <div class="spec-value">{{ specs.MaxStaticMeshes }}</div>
    <div class="spec-label">Static Meshes</div>
  </div>
</div>

**Maximum Dimensions:**
<div class="dimensions-box">
  <div class="booth-preview">
    <canvas ref="canvasRef" class="preview-canvas"></canvas>
  </div>
  <div class="dimensions-info">
    <div class="dim">Width: {{ specs.MaxDims[0] }}m</div>
    <div class="dim">Length: {{ specs.MaxDims[1] }}m</div>
    <div class="dim">Height: {{ specs.MaxDims[2] }}m</div>
    <div v-if="specs.MaxDimsMargin" class="margin-note">
      ℹ️ Includes {{ specs.MaxDimsMargin }}m safety margin
    </div>
  </div>
</div>
:::

## 💾 Size Requirements

::: tip Resource Limits
<div class="resource-limits">
  <div class="resource-item">
    <span class="resource-icon">📦</span>
    <span class="resource-label">VRChat Build:</span>
    <span class="resource-value">{{ specs.MaxBuildSize ?? 8 }} MB</span>
  </div>
  <div class="resource-item">
    <span class="resource-icon">💾</span>
    <span class="resource-label">Uncompressed:</span>
    <span class="resource-value">{{ specs.MaxFileSize }} MB</span>
  </div>
  <div class="resource-item">
    <span class="resource-icon">🎮</span>
    <span class="resource-label">VRAM Usage:</span>
    <span class="resource-value">{{ specs.MaxVram }} MB</span>
  </div>
</div>
:::


## 🎮 Pickups and Props

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-title">Pickups</div>
    <div class="feature-value">{{ specs.MaxPickups }}</div>
  </div>
  <div class="feature-card">
    <div class="feature-title">Avatar Pedestals</div>
    <div class="feature-value">{{ specs.MaxAvatarPedestals }}</div>
  </div>
  <div class="feature-card">
    <div class="feature-title">Portals</div>
    <div class="feature-value">{{ specs.MaxPortals }}</div>
  </div>
</div>

## 🎨 UI and Effects

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-title">TextMeshPro</div>
    <div class="feature-value">{{ specs.MaxTextMeshPro }}</div>
  </div>
  <div class="feature-card">
    <div class="feature-title">Particles</div>
    <div class="feature-value">{{ specs.MaxParticles }}</div>
    <div class="feature-note">No collisions allowed</div>
  </div>
  <div class="feature-card">
    <div class="feature-title">Mirrors</div>
    <div class="feature-value">{{ specs.MaxMirrors === 0 ? '❌' : specs.MaxMirrors }}</div>
  </div>
</div>

## 🎬 Animations

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-title">Skinned Meshes</div>
    <div class="feature-value">{{ specs.MaxSkinnedMeshRenderers }}</div>
  </div>
  <div class="feature-card">
    <div class="feature-title">Animators</div>
    <div class="feature-value">{{ specs.MaxAnimators }}</div>
  </div>
  <div class="feature-card">
    <div class="feature-title">Animations</div>
    <div class="feature-value">{{ specs.MaxAnimations }}</div>
  </div>
</div>

## 🔧 SDK Integration

::: warning Scripts Limit
Maximum {{ specs.MaxUdonScripts }} Udon scripts per booth. Only use approved scripts from the whitelist below.
:::

### 📜 Approved Scripts

Available in the PJKT SDK:

<div class="script-container">
  <div v-for="script in specs.UdonWhitelist" :key="script" class="script-item">
    <span class="script-icon">📄</span>
    {{ script.split('/').pop().replace('.asset', '') }}
  </div>
</div>

## ⚠️ Restrictions

::: danger Important Restrictions
- No custom Udon scripting (only use approved prefabs)
- If a feature is not explicitly mentioned in these specifications, assume it's not allowed
- No runtime lighting changes - use baked lighting only
- Custom shaders are allowed but must be performance-conscious
:::

::: tip Need Help?
Report SDK bugs to @Pesky#8762 on Discord
:::

</div>

</template>

<style>
.specs-content {
  margin: 0;  /* Remove all margins */
}
h1 {
  margin-bottom: 0;  /* Remove bottom margin from the main heading */
}
h2.event-title {
  margin: 0 0 0.25rem;  /* Added small bottom margin */
  font-size: 1.85rem;   /* Slightly reduced font size */
  color: var(--vp-c-text-1);
  text-shadow: none;
  font-weight: 700;
}
h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.loading {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}
.error-message {
  color: var(--vp-c-danger);
  padding: 1rem;
  border: 1px solid var(--vp-c-danger);
  border-radius: 6px;
  margin: 1rem 0;
}
.event-header {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin: 0;
  padding: 1rem;
  background: linear-gradient(135deg, 
    var(--vp-c-bg-soft) 0%,
    var(--vp-c-bg) 100%
  );
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.event-title + .event-metadata {
  margin-top: 0.25rem;  /* Control spacing directly between title and metadata */
}

.event-logo {
  flex-shrink: 0;
  width: 90px;         /* Further reduced logo size */
  height: 90px;
  object-fit: contain;
  border-radius: 8px;
}

.event-info {
  display: block;
  min-height: min-content;
  overflow: hidden;
  height: auto !important;
  float: left;
  clear: both;
}

.event-metadata {
  margin-top: 0.25rem;
}

.dates, .deadline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  margin: 0;
  padding: 0.35rem 0;
  background: transparent;
  border: none;
  box-shadow: none;
}

.dates:hover, .deadline:hover {
  background: transparent;
}

.preview-info {
  margin-top: 0.75rem;
  padding-top: 0.25rem;
  border-top: 1px solid var(--vp-c-divider);
}

.preview-info a {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.15s ease-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.preview-info a:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 640px) {
  .event-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.25rem;
    gap: 1rem;
  }
  
  .event-logo {
    width: 75px;
    height: 75px;
  }
  
  .event-title {
    font-size: 1.6rem;
  }
  
  .event-metadata {
    align-items: center;
  }
  
  .dates, .deadline {
    justify-content: center;
    width: 100%;
  }
  
  .preview-info {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .preview-info a {
    width: 100%;
    justify-content: center;
  }
}
.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}
.spec-item {
  padding: 1rem;
  text-align: center;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}
.spec-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}
.spec-label {
  margin-top: 0.5rem;
  color: var(--vp-c-text-2);
}

.dimensions-box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.dimensions-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.dim {
  text-align: center;
  font-weight: 500;
}

.resource-limits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}
.resource-item {
  text-align: center;
  padding: 1.25rem 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.resource-icon {
  font-size: 1.2rem;
}
.resource-label {
  color: var(--vp-c-text-2);
}
.resource-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  margin-top: 0.25rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}
.feature-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  text-align: center;
}
.feature-title {
  font-weight: 500;
  color: var(--vp-c-text-2);
}
.feature-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: var(--vp-c-brand);
}
.feature-note {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.script-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
}
.script-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-family: monospace;
}
.script-icon {
  opacity: 0.7;
}

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  font-size: 1rem;
  opacity: 0.8;
}

.booth-preview {
  width: 100%;
  height: 300px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.preview-canvas {
  width: 100%;
  height: 100%;
}
</style>