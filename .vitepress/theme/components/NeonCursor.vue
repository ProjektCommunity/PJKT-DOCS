<!-- NeonCursor.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursor = ref(null)
const cursorTrail = ref([])
const maxTrailPoints = 12
const lastMousePosition = ref({ x: 0, y: 0 })
let animationFrame = null

function updateCursorPosition(e) {
  if (cursor.value) {
    lastMousePosition.value = { x: e.clientX, y: e.clientY }
    cursor.value.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    
    // Add new point to trail with timestamp
    cursorTrail.value.push({ 
      x: e.clientX, 
      y: e.clientY,
      timestamp: Date.now() 
    })
    
    // Remove points older than 100ms
    cursorTrail.value = cursorTrail.value.filter(point => 
      Date.now() - point.timestamp < 150
    )
  }
}

function animate() {
  if (cursor.value) {
    // Get the points in reverse order (newest first)
    const points = [...cursorTrail.value].reverse()
    points.forEach((point, index) => {
      const trail = document.querySelector(`.cursor-trail-${index}`)
      if (trail) {
        // Calculate opacity based on age of the point
        const age = Date.now() - point.timestamp
        const opacity = Math.max(0, 1 - (age / 150))
        const scale = 1 - (index / points.length)
        
        trail.style.transform = `translate(${point.x}px, ${point.y}px) scale(${scale})`
        trail.style.opacity = opacity * 0.5
      }
    })
  }
  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  document.addEventListener('mousemove', updateCursorPosition)
  animate()
  // Don't hide the default cursor
  document.body.style.cursor = 'auto'
})

onUnmounted(() => {
  document.removeEventListener('mousemove', updateCursorPosition)
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<template>
  <div class="cursor-container">
    <div ref="cursor" class="neon-cursor"></div>
    <div v-for="(point, index) in maxTrailPoints" :key="index" 
         :class="`cursor-trail cursor-trail-${index}`"></div>
  </div>
</template>

<style scoped>
.cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.neon-cursor {
  position: fixed;
  width: 12px;
  height: 12px;
  background: rgba(0, 198, 255, 0.8); /* Making the base slightly transparent */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  mix-blend-mode: screen;
  filter: blur(4px); /* Adding blur to the cursor itself */
  box-shadow: 0 0 10px var(--pjkt-cyan),
              0 0 20px var(--pjkt-cyan),
              0 0 30px var(--pjkt-cyan),
              0 0 40px var(--pjkt-purple);
  transition: transform 0.05s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
}

.cursor-trail {
  position: fixed;
  width: 8px;
  height: 8px;
  background: var(--pjkt-cyan);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0;
  box-shadow: 0 0 6px var(--pjkt-cyan),
              0 0 12px var(--pjkt-purple);
  transition: opacity 0.15s ease;
  will-change: transform, opacity;
}
</style>