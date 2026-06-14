<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { ref, watch, onUnmounted } from 'vue'
import Glowsticks from './components/Glowsticks.vue'
import EventCountdown from './components/EventCountdown.vue'
import FlyingBird from '../../components/FlyingBird.vue'
import NeonCursor from './components/NeonCursor.vue'

interface BirdPosition {
  x: number
  y: number
  delay: number
  size: number
  isDragging?: boolean
  offsetX?: number
  offsetY?: number
  emoji: string
}

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()

// Bird emojis array
const birdEmojis = ['🐦', '🦜', '🦤', '🦚', '🦃', '🦢', '🦅', '🦆', '🦉']

// 404 page logic
const birds = ref<BirdPosition[]>([])
const messages = [
  "A bird grabbed this page and flew off. Classic. 🐦",
  "Wrong nest. Whatever you were looking for lives elsewhere.",
  "This page migrated south. Permanently.",
  "You found the void between pages. Congrats?",
  "The birds here refuse to answer for this."
]
const currentMessage = ref(messages[Math.floor(Math.random() * messages.length)])

let activeBird: BirdPosition | null = null

const startDrag = (bird: BirdPosition, event: MouseEvent | TouchEvent) => {
  bird.isDragging = true
  const pos = 'touches' in event ? event.touches[0] : event
  bird.offsetX = pos.clientX - (parseFloat(bird.x.toString()) / 100 * window.innerWidth)
  bird.offsetY = pos.clientY - (parseFloat(bird.y.toString()) / 100 * window.innerHeight)
  activeBird = bird
}

const onDrag = (event: MouseEvent | TouchEvent) => {
  if (activeBird?.isDragging) {
    const pos = 'touches' in event ? event.touches[0] : event
    const x = ((pos.clientX - (activeBird.offsetX || 0)) / window.innerWidth) * 100
    const y = ((pos.clientY - (activeBird.offsetY || 0)) / window.innerHeight) * 100
    activeBird.x = Math.max(0, Math.min(100, x))
    activeBird.y = Math.max(0, Math.min(100, y))
  }
}

const endDrag = () => {
  if (activeBird) {
    activeBird.isDragging = false
    activeBird = null
  }
}

const selectBirdEmoji = () => {
  // 70% chance for the common bird
  if (Math.random() < 0.7) {
    return '🐦'
  }
  // 30% chance for other bird variants
  return birdEmojis[Math.floor(Math.random() * (birdEmojis.length - 1)) + 1]
}

const goBack = () => {
  if (typeof window !== 'undefined') {
    window.history.back()
  }
}

let cleanupListeners: (() => void) | null = null

const attachBirdListeners = () => {
  if (typeof window === 'undefined') return
  if (cleanupListeners) return
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', endDrag)
  window.addEventListener('touchmove', onDrag)
  window.addEventListener('touchend', endDrag)

  if (birds.value.length === 0) {
    for (let i = 0; i < 5; i++) {
      birds.value.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        size: Math.random() * 20 + 20,
        emoji: selectBirdEmoji()
      })
    }
  }

  cleanupListeners = () => {
    window.removeEventListener('mousemove', onDrag)
    window.removeEventListener('mouseup', endDrag)
    window.removeEventListener('touchmove', onDrag)
    window.removeEventListener('touchend', endDrag)
  }
}

const detachBirdListeners = () => {
  cleanupListeners?.()
  cleanupListeners = null
}

watch(() => page.value.isNotFound, (isNotFound) => {
  if (typeof window === 'undefined') return
  if (isNotFound) {
    attachBirdListeners()
  } else {
    detachBirdListeners()
    birds.value = []
    activeBird = null
  }
}, { immediate: true })

onUnmounted(() => {
  detachBirdListeners()
})
</script>

<template>
  <Layout>
    <!-- Add home page specific slots -->
    <template #home-features-before>
      <Glowsticks v-if="frontmatter.layout === 'home'" />
    </template>

    <!-- Add navigation bar slots -->
    <template #nav-bar-title-after>
      <EventCountdown />
    </template>

    <!-- Add layout bottom slot -->
    <template #layout-bottom>
      <FlyingBird />
      <NeonCursor />
    </template>

    <!-- Add 404 page slot -->
    <template #not-found>
      <div class="not-found-container">
        <div class="bg-number" aria-hidden="true">404</div>
        <div class="bird-container">
          <div v-for="(bird, index) in birds"
               :key="index"
               class="bird"
               :class="{ 'dragging': bird.isDragging }"
               :style="{
                 '--x': bird.x + '%',
                 '--y': bird.y + '%',
                 '--delay': bird.delay + 's',
                 '--size': bird.size + 'px'
               }"
               @mousedown.prevent="startDrag(bird, $event)"
               @touchstart.prevent="startDrag(bird, $event)"
               @touchmove.prevent>{{ bird.emoji }}</div>
        </div>
        <div class="not-found">
          <h1 class="not-found-heading" aria-label="Page not found — 404">4🦜4</h1>
          <p class="message">{{ currentMessage }}</p>
          <div class="footer-row">
            <span class="wip-badge">⚠️ Still building. Pages may be missing.</span>
            <div class="button-group">
              <button class="vp-button brand" @click="goBack">← Back</button>
              <a class="vp-button brand" href="/">Fly Home</a>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.not-found-container {
  min-height: calc(100vh - var(--vp-nav-height));
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding: 2rem 8vw;
  box-sizing: border-box;
  overflow: hidden;
}

.bg-number {
  position: absolute;
  right: -2vw;
  top: 50%;
  transform: translateY(-50%);
  font-size: clamp(200px, 30vw, 440px);
  font-weight: 900;
  color: rgba(255, 228, 0, 0.04);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  z-index: 0;
  font-family: var(--vp-font-family-headings);
}

.not-found {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  max-width: 560px;
}

.not-found-heading {
  font-size: clamp(72px, 11vw, 140px);
  margin: 0;
  padding: 0;
  line-height: 1;
  color: var(--pjkt-yellow);
  filter: drop-shadow(0 0 20px rgba(255, 228, 0, 0.5));
  font-family: var(--vp-font-family-headings);
}

.message {
  font-size: 17px;
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.01em;
}

.footer-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.875rem;
  margin-top: 1.75rem;
}

.wip-badge {
  font-size: 13px;
  color: rgba(255, 228, 0, 0.6);
  letter-spacing: 0.02em;
}

.bird-container {
  position: absolute;
  inset: 0;
  pointer-events: all;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: default;
  z-index: 1;
}

.bird {
  position: absolute;
  left: var(--x);
  top: var(--y);
  font-size: var(--size);
  animation: float 10s ease-in-out infinite;
  animation-delay: var(--delay);
  filter: drop-shadow(0 0 10px var(--pjkt-yellow))
         drop-shadow(0 0 20px rgba(255, 228, 0, 0.4));
  transform-origin: center;
  will-change: transform, filter;
  transform: translate(var(--drag-x, 0), var(--drag-y, 0));
}

@media (prefers-reduced-motion: reduce) {
  .bird {
    animation: none;
  }
  .bird:not(.dragging) {
    transition: none;
  }
}

.bird:not(.dragging) {
  transition: transform 0.3s ease, filter 0.3s ease;
}

.bird.dragging {
  animation: none;
  scale: 1.2;
  rotate: 15deg;
  filter: drop-shadow(0 0 20px var(--pjkt-yellow))
         drop-shadow(0 0 40px rgba(255, 228, 0, 0.6));
  cursor: grabbing;
  z-index: 100;
  transition: none;
}

.bird:hover {
  transform: scale(1.2) rotate(15deg);
  filter: drop-shadow(0 0 15px var(--pjkt-yellow))
         drop-shadow(0 0 30px rgba(255, 228, 0, 0.6));
  cursor: grabbing;
}

@keyframes float {
  0%, 100% {
    translate: 0 0;
    rotate: 5deg;
    scale: 1;
  }
  25% {
    translate: 50px -30px;
    rotate: -10deg;
    scale: 1.1;
  }
  50% {
    translate: -30px 50px;
    rotate: 15deg;
    scale: 0.9;
  }
  75% {
    translate: -50px -50px;
    rotate: -5deg;
    scale: 1.05;
  }
}
.vp-button.brand {
  font-size: 15px;
  padding: 9px 22px;
  border-radius: 6px;
  text-decoration: none;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
  z-index: 1;
  background: var(--pjkt-yellow);
  color: var(--pjkt-black);
  font-weight: 700;
  border: none;
  box-shadow: 0 2px 14px rgba(255, 228, 0, 0.2);
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

@media (prefers-reduced-motion: no-preference) {
  .vp-button.brand:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(255, 228, 0, 0.35);
  }
}

@media (prefers-reduced-motion: reduce) {
  .vp-button.brand:hover {
    box-shadow: 0 0 0 2px var(--pjkt-yellow);
  }
}

.vp-button.brand:active {
  transform: translateY(0);
  box-shadow: 0 1px 8px rgba(255, 228, 0, 0.2);
}

.button-group {
  display: flex;
  gap: 0.625rem;
  justify-content: flex-start;
  align-items: center;
}

@media (max-width: 640px) {
  .not-found-container {
    padding: 2rem 6vw;
    justify-content: center;
  }

  .bg-number {
    right: -8vw;
    color: rgba(255, 228, 0, 0.025);
  }
}
</style>