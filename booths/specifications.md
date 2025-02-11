# PJKT Booth Creation Guidelines

<script setup>
import { onMounted, ref, nextTick, onUnmounted } from 'vue'
import * as THREE from 'three'
// Changed to use three-stdlib for postprocessing imports
import { EffectComposer } from 'three-stdlib/postprocessing/EffectComposer'
import { RenderPass } from 'three-stdlib/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three-stdlib/postprocessing/UnrealBloomPass'

const specs = ref({
  // Fallback specs in case API is unavailable
  MaxTriangles: 50000,
  MaxMaterial: 10,
  MaxStaticMeshes: 100,
  MaxDims: [8, 8, 5],
  MaxDimsMargin: 0.5,
  MaxBuildSize: 8,
  MaxFileSize: 100,
  MaxVram: 50,
  MaxPickups: 10,
  MaxAvatarPedestals: 2,
  MaxPortals: 1,
  MaxTextMeshPro: 20,
  MaxParticles: 5,
  MaxMirrors: 1,
  MaxSkinnedMeshRenderers: 5,
  MaxAnimators: 10,
  MaxAnimations: 20,
  MaxUdonScripts: 10,
  UdonWhitelist: ['Default SDK Scripts']
})
const loading = ref(true)
const error = ref(null)
const eventName = ref('')
const eventInfo = ref(null)

// Three.js setup for booth preview
const canvasRef = ref(null)
let renderer, scene, camera, animationFrameId, composer

function createTextSprite(text, position, color = '#ff69b4') {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  
  // Tiny text with high resolution for crispness
  const padding = 1
  context.font = 'Bold 8px Inter, -apple-system, BlinkMacSystemFont'
  const textWidth = context.measureText(text).width
  const width = textWidth + padding * 2
  const height = 9
  
  canvas.width = width * 8
  canvas.height = height * 8
  context.scale(8, 8)
  
  context.fillStyle = '#ffffff'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, width / 2, height / 2)
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  
  const spriteMaterial = new THREE.SpriteMaterial({ 
    map: texture,
    transparent: true,
    depthTest: false,
    sizeAttenuation: false
  })
  
  const sprite = new THREE.Sprite(spriteMaterial)
  sprite.scale.set(width / 100, height / 100, 1)
  sprite.position.copy(new THREE.Vector3(position.x, position.y, position.z))
  
  sprite.onBeforeRender = (renderer, scene, camera) => {
    sprite.position.copy(new THREE.Vector3(position.x, position.y, position.z))
    sprite.quaternion.copy(camera.quaternion)
  }
  
  return sprite
}

function createMeasurementTick(start, end, color = 0xff69b4) {  // Changed to hot pink
  const geometry = new THREE.BufferGeometry().setFromPoints([start, end])
  const material = new THREE.LineBasicMaterial({ 
    color: color,
    opacity: 0.6,
    transparent: true
  })
  return new THREE.Line(geometry, material)
}

function initThreeJS() {
  const container = canvasRef.value
  if (!container) return

  scene = new THREE.Scene()
  scene.background = new THREE.Color('#242424')

  const aspect = container.clientWidth / container.clientHeight
  camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
  const radius = 18
  camera.position.set(radius * 0, 9, radius * 0)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({
    canvas: container,
    antialias: true,
    alpha: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(container.clientWidth, container.clientHeight, false)

  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  composer.addPass(new UnrealBloomPass(
    new THREE.Vector2(container.clientWidth, container.clientHeight),
    0.2,
    0.3,
    0.5
  ))

  const gridHelper = new THREE.GridHelper(10, 10, 0x666666, 0x444444)
  gridHelper.material.opacity = 0.3
  gridHelper.material.transparent = true
  scene.add(gridHelper)

  // Add arrow helper to show forward direction
  const arrowDir = new THREE.Vector3(0, 0, 1)
  arrowDir.normalize()
  const arrowOrigin = new THREE.Vector3(0, 0.1, 0)
  const arrowLength = 2
  const arrowColor = 0x00ff00 // Green color
  const headLength = 0.4
  const headWidth = 0.3
  const arrowHelper = new THREE.ArrowHelper(arrowDir, arrowOrigin, arrowLength, arrowColor, headLength, headWidth)
  scene.add(arrowHelper)

  if (!specs.value?.MaxDims) return
  const [width, length, height] = specs.value.MaxDims

  const colors = [
    new THREE.Color(0xff69b4),
    new THREE.Color(0xff1493),
    new THREE.Color(0xda70d6),
    new THREE.Color(0x9370db),
    new THREE.Color(0x8a2be2)
  ]
  
  let colorIndex = 0
  let nextColorIndex = 1
  let colorTransition = 0

  const geometry = new THREE.BoxGeometry(width, height, length)
  const material = new THREE.MeshPhysicalMaterial({
    color: colors[0],
    transparent: true,
    opacity: 0.1,  // More transparent
    metalness: 0.9,
    roughness: 0.2,
    reflectivity: 0.7,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
    side: THREE.DoubleSide,
    depthWrite: false  // Don't write to depth buffer
  })

  const cube = new THREE.Mesh(geometry, material)
  cube.position.y = height / 2
  cube.renderOrder = 1  // Render after lines
  scene.add(cube)

  const edgesGeometry = new THREE.EdgesGeometry(geometry)
  const edgesLayers = colors.map((color, i) => {
    // Create inner edges
    const innerEdges = new THREE.LineSegments(
      edgesGeometry,
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
        depthTest: false,
        depthWrite: false,
        linewidth: 2
      })
    )
    innerEdges.position.y = height / 2
    innerEdges.renderOrder = 2
    scene.add(innerEdges)

    // Create slightly offset outer edges
    const outerEdges = new THREE.LineSegments(
      edgesGeometry,
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.6,
        depthTest: false,
        depthWrite: false,
        linewidth: 1
      })
    )
    outerEdges.position.y = height / 2
    outerEdges.scale.set(1.001 + i * 0.001, 1.001 + i * 0.001, 1.001 + i * 0.001)
    outerEdges.renderOrder = 3
    scene.add(outerEdges)

    return { inner: innerEdges, outer: outerEdges }
  })

  const labels = [
    { text: `${width}m`, position: { x: 0, y: 0.3, z: -length/2 - 0.2 } },
    { text: `${length}m`, position: { x: -width/2 - 0.2, y: 0.3, z: 0 } },
    { text: `${height}m`, position: { x: -width/2 - 0.4, y: height/2, z: -length/2 - 0.2 } }
  ]

  labels.forEach(label => scene.add(createTextSprite(label.text, label.position)))

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 10, 5)
  scene.add(directionalLight)

  function animate() {
    if (!scene || !camera || !composer) return
    
    animationFrameId = requestAnimationFrame(animate)
    theta += 0.001

    camera.position.x = radius * Math.cos(theta)
    camera.position.z = radius * Math.sin(theta)
    camera.lookAt(0, height/4, 0)

    colorTransition += 0.005
    if (colorTransition >= 1) {
      colorTransition = 0
      colorIndex = nextColorIndex
      nextColorIndex = (nextColorIndex + 1) % colors.length
    }

    const currentColor = colors[colorIndex]
    const nextColor = colors[nextColorIndex]
    const lerpedColor = new THREE.Color()
    lerpedColor.lerpColors(currentColor, nextColor, colorTransition)

    material.color.copy(lerpedColor)
    edgesLayers.forEach(({ inner, outer }, i) => {
      const edgeColor = new THREE.Color()
      edgeColor.lerpColors(currentColor, nextColor, colorTransition + i * 0.2)
      inner.material.color.copy(edgeColor)
      outer.material.color.copy(edgeColor)
    })

    scene.traverse((object) => {
      if (object.isSprite && object.onBeforeRender) {
        object.onBeforeRender(renderer, scene, camera)
      }
    })

    composer.render()
  }

  let theta = 0
  animate()

  const handleResize = () => {
    if (!container || !camera || !renderer || !composer) return
    const width = container.clientWidth
    const height = container.clientHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    composer.setSize(width, height)
  }

  window.addEventListener('resize', handleResize)
  handleResize()
}

onMounted(async () => {
  try {
    const response = await fetch('https://api.projektcommunity.com/projects', {
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('API response was not ok')
    }
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
    error.value = 'Using fallback specifications - API is currently unavailable'
    loading.value = false
    // We'll still initialize Three.js with fallback specs
    nextTick(() => {
      if (canvasRef.value) {
        initThreeJS()
      }
    })
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
  margin: 0;
}

h1 {
  margin-bottom: 0;
}

h2.event-title {
  margin: 0 0 0.25rem;
  font-size: 1.85rem;
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
  margin-top: 0.25rem;
}

.event-logo {
  flex-shrink: 0;
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: 8px;
}

.event-info {
  display: block;
  min-height: min-content;
  overflow: hidden;
  height: auto;
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
  gap: 0.75rem;
  margin: 0.75rem 0;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.dimensions-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
}

.dim {
  text-align: center;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
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
  color: var (--vp-c-brand);
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
  height: 400px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.preview-canvas {
  width: 100%;
  height: 100%;
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
</style>