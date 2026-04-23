<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface FlyingBirdInstance {
  id: number
  x: number
  y: number
  emoji: string
  speed: number
}

const allBirdEmojis = ['🕊️', '🦅', '🦆', '🦉', '🦜', '🦢', '🦩', '🐦', '🐧', '🦚']
const birdEmojis = ref<string[]>([])
const activeBirds = ref<FlyingBirdInstance[]>([])
let spawnIntervalId: number | undefined

function isEmojiSupported(emoji: string) {
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

function getRandomBird() {
  if (!birdEmojis.value.length) {
    return '🐦'
  }

  return birdEmojis.value[Math.floor(Math.random() * birdEmojis.value.length)]
}

function flyAcrossScreen() {
  const bird: FlyingBirdInstance = {
    id: Date.now() + Math.random(),
    x: window.innerWidth + 50,
    y: Math.random() * Math.max(window.innerHeight - 100, 100),
    emoji: getRandomBird(),
    speed: 3 + Math.random() * 3
  }

  activeBirds.value.push(bird)

  const animate = () => {
    const birdIndex = activeBirds.value.findIndex((entry) => entry.id === bird.id)

    if (birdIndex === -1) {
      return
    }

    activeBirds.value[birdIndex].x -= activeBirds.value[birdIndex].speed

    if (activeBirds.value[birdIndex].x < -50) {
      activeBirds.value.splice(birdIndex, 1)
      return
    }

    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

function onKeyPress(event: KeyboardEvent) {
  if (event.key.toLowerCase() === 'b') {
    flyAcrossScreen()
  }
}

onMounted(() => {
  // Skip all bird logic if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  birdEmojis.value = allBirdEmojis.filter((emoji) => isEmojiSupported(emoji))

  spawnIntervalId = window.setInterval(() => {
    if (Math.random() < 0.01) {
      flyAcrossScreen()
    }
  }, Math.random() * 120000 + 300000)

  window.addEventListener('keydown', onKeyPress)
})

onUnmounted(() => {
  if (spawnIntervalId !== undefined) {
    window.clearInterval(spawnIntervalId)
  }

  window.removeEventListener('keydown', onKeyPress)
})
</script>

<template>
  <div>
    <div
      v-for="bird in activeBirds"
      :key="bird.id"
      class="flying-bird"
      :style="{
        left: `${bird.x}px`,
        top: `${bird.y}px`
      }"
    >
      {{ bird.emoji }}
    </div>
  </div>
</template>

<style scoped>
.flying-bird {
  position: fixed;
  z-index: 1000;
  font-size: 24px;
  pointer-events: none;
  transform: scaleX(1);
  animation: flap-wings 400ms linear infinite;
}

@keyframes flap-wings {
  0%,
  100% {
    transform: translateY(0) scaleX(1);
  }

  50% {
    transform: translateY(-5px) scaleX(1.08);
  }
}
</style>
