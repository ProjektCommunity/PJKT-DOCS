<!-- NeonCursor.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursor = ref(null)

function setElementTransform(element, x, y) {
  element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
}

function updateCursorPosition(event) {
  if (!cursor.value) {
    return
  }

  setElementTransform(cursor.value, event.clientX, event.clientY)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  document.addEventListener('mousemove', updateCursorPosition, { passive: true })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', updateCursorPosition)
})
</script>

<template>
  <div class="cursor-container" aria-hidden="true">
    <div ref="cursor" class="neon-cursor"></div>
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
  contain: layout paint style;
}

.neon-cursor {
  position: fixed;
  width: 12px;
  height: 12px;
  background: rgba(0, 198, 255, 0.8);
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: screen;
  filter: blur(3px);
  box-shadow: 0 0 10px var(--pjkt-cyan),
              0 0 20px var(--pjkt-cyan),
              0 0 28px var(--pjkt-purple);
  will-change: transform;
}
</style>