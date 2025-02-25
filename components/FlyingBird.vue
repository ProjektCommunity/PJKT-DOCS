<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Collection of different bird emojis
const birdEmojis = ['🕊️', '🦅', '🦆', '🦉', '🦜', '🦢', '🦤', '🦩', '🐦', '🐧', '🪽', '🦚']
const activeBirds = ref([])

// Select a random bird emoji
function getRandomBird() {
  return birdEmojis[Math.floor(Math.random() * birdEmojis.length)]
}

function flyAcrossScreen() {
  // Create a new bird - starting from right side
  const bird = {
    id: Date.now() + Math.random(),
    x: window.innerWidth + 50, // Start position off-screen to the right
    y: Math.random() * (window.innerHeight - 100),
    emoji: getRandomBird(),
    speed: 3 + Math.random() * 3 // Varying speed between 3-6 pixels per frame
  }
  
  activeBirds.value.push(bird)
  
  const animate = () => {
    const birdIndex = activeBirds.value.findIndex(b => b.id === bird.id)
    if (birdIndex === -1) return

    activeBirds.value[birdIndex].x -= activeBirds.value[birdIndex].speed // Move from right to left
    
    // Remove bird when it leaves the screen to the left
    if (activeBirds.value[birdIndex].x < -50) {
      activeBirds.value.splice(birdIndex, 1)
      return
    }
    
    requestAnimationFrame(animate)
  }
  
  animate()
}

function onKeyPress(e) {
  if (e.key.toLowerCase() === 'b') {
    flyAcrossScreen()
  }
}

onMounted(() => {
    // Trigger bird flight very rarely (every 10-30 minutes) with only a 20% chance
    setInterval(() => {
        // 20% chance of a bird appearing when the interval triggers
        if (Math.random() < 0.01) {
            flyAcrossScreen()
        }
    }, Math.random() * 120000 + 300000) // 5-7 minutes

    // Add keyboard listener
    window.addEventListener('keydown', onKeyPress)
})

onUnmounted(() => {
  // Remove keyboard listener
  window.removeEventListener('keydown', onKeyPress)
})
</script>

<template>
  <div>
    <div v-for="bird in activeBirds" :key="bird.id" class="flying-bird" :style="{
      left: bird.x + 'px',
      top: bird.y + 'px'
    }">
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
  animation: flapWings 0.4s infinite;
}

@keyframes flapWings {
  0%, 100% { transform: translateY(0) scaleX(1); }
  50% { transform: translateY(-5px) scaleX(1.1); }
}
</style>