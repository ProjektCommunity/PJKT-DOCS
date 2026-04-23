<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const allBirdEmojis = ['🕊️', '🦅', '🦆', '🦉', '🦜', '🦢', '🦩', '🐦', '🐧', '🦚']
const birdEmojis = ref([])
const activeBirds = ref([])

const birdStartOffset = 50
const birdEndOffset = -50
const birdViewportPadding = 100

let animationFrameId = 0
let nextBirdId = 0
let cachedSupportedBirdEmojis

function isEmojiSupported(emoji) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    return false
  }

  context.fillStyle = '#000000'
  context.textBaseline = 'top'
  context.font = '16px Arial'
  context.fillText(emoji, 0, 0)

  return context.measureText(emoji).width > 0
}

function getSupportedBirdEmojis() {
  if (cachedSupportedBirdEmojis) {
    return cachedSupportedBirdEmojis
  }

  cachedSupportedBirdEmojis = allBirdEmojis.filter((emoji) => isEmojiSupported(emoji))

  if (!cachedSupportedBirdEmojis.length) {
    cachedSupportedBirdEmojis = ['🐦']
  }

  return cachedSupportedBirdEmojis
}

function getRandomBird() {
  return birdEmojis.value[Math.floor(Math.random() * birdEmojis.value.length)] ?? '🐦'
}

function stopAnimationLoop() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = 0
  }
}

function animateBirds() {
  if (!activeBirds.value.length) {
    animationFrameId = 0
    return
  }

  for (let index = activeBirds.value.length - 1; index >= 0; index -= 1) {
    const bird = activeBirds.value[index]
    bird.x -= bird.speed

    if (bird.x < birdEndOffset) {
      activeBirds.value.splice(index, 1)
    }
  }

  animationFrameId = requestAnimationFrame(animateBirds)
}

function ensureAnimationLoop() {
  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(animateBirds)
  }
}

function flyAcrossScreen() {
  const maxY = Math.max(window.innerHeight - birdViewportPadding, birdViewportPadding)

  activeBirds.value.push({
    id: nextBirdId,
    x: window.innerWidth + birdStartOffset,
    y: Math.random() * maxY,
    emoji: getRandomBird(),
    speed: 3 + Math.random() * 3
  })

  nextBirdId += 1
  ensureAnimationLoop()
}

function onKeyPress(event) {
  if (event.key.toLowerCase() === 'b') {
    flyAcrossScreen()
  }
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  birdEmojis.value = getSupportedBirdEmojis()
  window.addEventListener('keydown', onKeyPress)
})

onUnmounted(() => {
  stopAnimationLoop()

  activeBirds.value = []
  window.removeEventListener('keydown', onKeyPress)
})
</script>

<template>
  <div aria-hidden="true">
    <div
      v-for="bird in activeBirds"
      :key="bird.id"
      class="flying-bird"
      :style="{
        transform: `translate3d(${bird.x}px, ${bird.y}px, 0)`
      }"
    >
      <span class="flying-bird__emoji">{{ bird.emoji }}</span>
    </div>
  </div>
</template>

<style scoped>
.flying-bird {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  pointer-events: none;
  will-change: transform;
}

.flying-bird__emoji {
  display: block;
  font-size: 24px;
  transform: translateZ(0);
  animation: flapWings 400ms linear infinite;
}

@keyframes flapWings {
  0%, 100% {
    transform: translate3d(0, 0, 0) scaleX(1);
  }

  50% {
    transform: translate3d(0, -5px, 0) scaleX(1.06);
  }
}
</style>