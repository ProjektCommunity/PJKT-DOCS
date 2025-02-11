<template>
  <div class="glowsticks-container" ref="container">
    <div 
      v-for="(stick, index) in visibleGlowsticks" 
      :key="index"
      class="glowstick"
      :class="[stick.color, `layer-${stick.layer}`]"
      :style="{
        left: `${stick.x}%`,
        top: `${stick.y}%`,
        '--rotation': `${stick.rotation}deg`,
        '--float-distance': `${stick.floatDistance}%`,
        animationDelay: `${stick.delay}s`,
        animationDuration: `${stick.duration}s`,
        height: `${stick.height}px`,
        opacity: stick.opacity,
        transform: `translate3d(${stick.parallaxX}px, ${stick.parallaxY}px, 0) rotate(${stick.parallaxRotation}deg)`
      }"
    ></div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue'

export default defineComponent({
  name: 'Glowsticks',
  setup() {
    const container = ref(null)
    const glowsticks = ref([])
    const scrollProgress = ref(0)
    const isMobile = ref(false)
    
    const updateIsMobile = () => {
      isMobile.value = window.innerWidth < 768
    }

    const visibleGlowsticks = computed(() => {
      return glowsticks.value // Show all glowsticks regardless of mobile/desktop
    })
    
    const createGlowsticks = () => {
      const colors = ['yellow', 'cyan', 'purple']
      const sticks = []
      const count = isMobile.value ? 8 : 15  // Reduced from 12/24 to 8/15

      // Helper function to generate positions within hero bounds
      const getHeroPosition = () => {
        // Hero section typically takes up about 60% of the viewport height
        // and is centered horizontally
        const heroHeight = 60
        const heroTop = 0
        const heroBottom = heroTop + heroHeight

        // Generate position biased towards center of hero
        const y = heroTop + (Math.random() * 0.6 + 0.2) * heroHeight // 20-80% of hero height
        const x = 50 + (Math.random() + Math.random() - 1) * 30 // Concentrated around center ±30%
        
        return { x, y }
      }

      for (let i = 0; i < count; i++) {
        const layer = Math.floor(Math.random() * 3) + 1
        const rotationDirection = Math.random() > 0.5 ? 1 : -1
        const position = getHeroPosition()
        
        sticks.push({
          x: position.x,
          y: position.y,
          rotation: Math.random() * 360,
          rotationDirection,
          floatDistance: 6 + Math.random() * 12, // Reduced float distance
          delay: -(Math.random() * 16),
          duration: isMobile.value ? 16 + Math.random() * 8 : 12 + Math.random() * 10,
          height: isMobile.value ? 60 + Math.random() * 80 : 80 + Math.random() * 120,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.12 + Math.random() * 0.2, // Reduced opacity range
          layer,
          parallaxX: 0,
          parallaxY: 0,
          parallaxRotation: 0
        })
      }
      
      glowsticks.value = sticks
    }

    const updateParallax = () => {
      if (document.hidden) return

      const speeds = {
        1: { move: isMobile.value ? 0.08 : 0.12, rotate: 0.02 },
        2: { move: isMobile.value ? 0.05 : 0.08, rotate: 0.015 },
        3: { move: isMobile.value ? 0.03 : 0.04, rotate: 0.01 }
      }

      glowsticks.value = glowsticks.value.map(stick => {
        const speed = speeds[stick.layer]
        return {
          ...stick,
          parallaxX: Math.sin(scrollProgress.value * 0.002) * (isMobile.value ? 3 : 5) * speed.move,
          parallaxY: scrollProgress.value * speed.move,
          parallaxRotation: scrollProgress.value * speed.rotate * stick.rotationDirection
        }
      })
    }

    let rafId = null
    const handleScroll = () => {
      if (!container.value || document.hidden) return
      if (rafId) cancelAnimationFrame(rafId)
      
      rafId = requestAnimationFrame(() => {
        scrollProgress.value = window.scrollY
        updateParallax()
        rafId = null
      })
    }
    
    onMounted(() => {
      updateIsMobile()
      createGlowsticks()
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', updateIsMobile)
      window.addEventListener('orientationchange', updateIsMobile)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateIsMobile)
      window.removeEventListener('orientationchange', updateIsMobile)
      if (rafId) cancelAnimationFrame(rafId)
    })
    
    return {
      container,
      visibleGlowsticks
    }
  }
})
</script>

<style>
.glowsticks-container {
  position: fixed; /* Changed from absolute to fixed */
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: -1; /* Changed from 0 to -1 to ensure it stays behind content */
  width: 100vw;
  height: 100vh;
  mask-image: linear-gradient(to bottom, 
    rgba(0,0,0,1) 0%,
    rgba(0,0,0,1) 40%,
    rgba(0,0,0,0.3) 70%,
    rgba(0,0,0,0) 100%
  );
  -webkit-mask-image: linear-gradient(to bottom, 
    rgba(0,0,0,1) 0%,
    rgba(0,0,0,1) 40%,
    rgba(0,0,0,0.3) 70%,
    rgba(0,0,0,0) 100%
  );
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  contain: strict;
}

.glowstick {
  position: absolute;
  width: 3px;
  background: linear-gradient(180deg, transparent, currentColor 30%, currentColor 70%, transparent);
  animation: floatGlowstick var(--duration, 12s) ease-in-out infinite;
  transform-style: preserve-3d;
  will-change: transform;
  backface-visibility: hidden;
  contain: layout style;
}

.glowstick.layer-1 { 
  z-index: 3; 
  filter: blur(3px);
  width: 3px;
  --parallax-speed: 0.12;
}
.glowstick.layer-2 { 
  z-index: 2; 
  filter: blur(5px);
  width: 2.5px;
  opacity: 0.8;
  --parallax-speed: 0.08;
}
.glowstick.layer-3 { 
  z-index: 1; 
  filter: blur(7px);
  width: 2px;
  opacity: 0.6;
  --parallax-speed: 0.04;
}

.glowstick::after {
  content: '';
  position: absolute;
  inset: -5px;
  background: inherit;
  filter: blur(8px);
  opacity: 0.4;
}

@keyframes floatGlowstick {
  0% {
    transform: translateY(calc(var(--float-distance) * -1)) rotate(calc(var(--rotation) - 5deg));
  }
  50% {
    transform: translateY(var(--float-distance)) rotate(calc(var(--rotation) + 5deg));
  }
  100% {
    transform: translateY(calc(var(--float-distance) * -1)) rotate(calc(var(--rotation) - 5deg));
  }
}

.glowstick.yellow {
  --glow-color: var(--pjkt-yellow);
  box-shadow: 0 0 15px var(--glow-color);
}

.glowstick.cyan {
  --glow-color: var(--pjkt-cyan);
  box-shadow: 0 0 15px var(--glow-color);
}

.glowstick.purple {
  --glow-color: var(--pjkt-purple);
  box-shadow: 0 0 15px var(--glow-color);
}

@media (min-width: 960px) {
  .glowsticks-container {
    position: fixed;
    left: 0;
    right: 0;
    transform: none;
    max-width: none;
  }
  
  .glowstick {
    animation-duration: calc(var(--duration, 12s) * 1.5);
  }
}

@media (max-width: 768px) {
  .glowstick {
    animation-duration: calc(var(--duration, 12s) * 1.4);
  }
}
</style>