<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { ref, onMounted, onUnmounted } from 'vue'

interface Bird {
  x: number
  y: number
  delay: number
  size: number
}

interface BirdPosition {
  x: number
  y: number
  delay: number
  size: number
  isDragging?: boolean
  offsetX?: number
  offsetY?: number
}

const { Layout } = DefaultTheme
const { frontmatter } = useData()

// 404 page logic
const birds = ref<BirdPosition[]>([])
const messages = [
  "This bird took your page away! 🐦",
  "Looks like our cyber-pigeon got lost...",
  "Tweet tweet... page not found!",
  "This nest is empty!",
  "Our binary birds couldn't fetch this page"
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

onMounted(() => {
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', endDrag)
  window.addEventListener('touchmove', onDrag)
  window.addEventListener('touchend', endDrag)

  for (let i = 0; i < 5; i++) {
    birds.value.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      size: Math.random() * 20 + 20
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', endDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', endDrag)
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
      <WIPBubble />
    </template>

    <!-- Add 404 page slot -->
    <template #not-found>
      <div class="not-found-container">
        <div class="not-found">
          <h1 class="not-found-heading">4🐦4</h1>
          <p class="message">{{ currentMessage }}</p>
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
                 @touchmove.prevent>🐦</div>
          </div>
          <a class="vp-button brand" href="/">
            <i class="fas fa-home"></i>
            <span>Fly Home</span>
          </a>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.not-found-container {
  min-height: calc(100vh - var(--vp-nav-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem;
  box-sizing: border-box;
}

.not-found {
  text-align: center;
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.not-found-heading {
  font-size: 120px;
  margin: 0;
  padding: 0;
  line-height: 1;
  background: linear-gradient(315deg, var(--pjkt-purple) 25%, var(--pjkt-cyan));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 15px var(--pjkt-cyan));
  animation: pulse 2s infinite;
  font-family: var(--vp-font-family-headings);
}

.message {
  font-size: 24px;
  margin: 20px 0 40px;
  color: var(--pjkt-cyan);
  text-shadow: 0 0 10px var(--pjkt-cyan);
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
    filter: drop-shadow(0 0 10px var(--pjkt-yellow))
           drop-shadow(0 0 20px rgba(255, 228, 0, 0.4));
  }
  25% {
    translate: 50px -30px;
    rotate: -10deg;
    scale: 1.1;
    filter: drop-shadow(0 0 15px var(--pjkt-cyan))
           drop-shadow(0 0 25px rgba(0, 198, 255, 0.5));
  }
  50% {
    translate: -30px 50px;
    rotate: 15deg;
    scale: 0.9;
    filter: drop-shadow(0 0 12px var(--pjkt-purple))
           drop-shadow(0 0 22px rgba(160, 4, 255, 0.4));
  }
  75% {
    translate: -50px -50px;
    rotate: -5deg;
    scale: 1.05;
    filter: drop-shadow(0 0 13px var(--pjkt-yellow))
           drop-shadow(0 0 23px rgba(255, 228, 0, 0.5));
  }
}

@keyframes pulse {
  0%, 100% {
    filter: drop-shadow(0 0 15px var(--pjkt-cyan));
  }
  50% {
    filter: drop-shadow(0 0 30px var(--pjkt-purple));
  }
}

.vp-button.brand {
  font-size: 20px;
  padding: 12px 32px;
  border-radius: 8px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1;
  background: var(--pjkt-yellow);
  color: var(--pjkt-black);
  font-weight: 600;
  border: 2px solid transparent;
  box-shadow: 0 0 20px rgba(255, 228, 0, 0.3),
              inset 0 0 10px rgba(255, 228, 0, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  animation: buttonPulse 3s infinite;
}

.vp-button.brand i {
  font-size: 0.9em;
}

.vp-button.brand::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, var(--pjkt-cyan), var(--pjkt-purple));
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.vp-button.brand:hover {
  transform: translateY(-2px) scale(1.05);
  color: var(--pjkt-white);
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 30px rgba(255, 228, 0, 0.4),
              inset 0 0 15px rgba(255, 228, 0, 0.3);
}

.vp-button.brand:hover::before {
  opacity: 1;
}

.vp-button.brand:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 0 15px rgba(255, 228, 0, 0.3),
              inset 0 0 5px rgba(255, 228, 0, 0.2);
}

@keyframes buttonPulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 228, 0, 0.3),
                inset 0 0 10px rgba(255, 228, 0, 0.2);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 228, 0, 0.4),
                inset 0 0 15px rgba(255, 228, 0, 0.3);
  }
}

@media (max-width: 640px) {
  .not-found-heading {
    font-size: 80px;
  }
  
  .message {
    font-size: 20px;
  }
}
</style>