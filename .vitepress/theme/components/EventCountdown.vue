<template>
  <div 
    class="event-countdown" 
    :class="{ 
      'event-countdown-navbar': isHomePage,
      'event-countdown-bubble': !isHomePage 
    }"
    v-show="eventName"
  >
    <div class="countdown-item">
      <span class="countdown-label">Next event:</span>
      <span class="countdown-value">{{ eventName }}</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-label">Submission deadline:</span>
      <span 
        class="countdown-value" 
        :class="{ 'countdown-urgent': timeDistance < 300000 }"
        data-tooltip
        role="tooltip"
        tabindex="0"
        aria-label="Full deadline date and time"
      >
        {{ formattedDeadline }}
        <span class="tooltip" role="tooltip">{{ deadlineFormatted }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vitepress'

export default defineComponent({
  name: 'EventCountdown',
  setup() {
    const route = useRoute()
    const eventData = ref(null)
    const deadline = ref('')
    const timeDistance = ref(0)
    const eventName = ref('')

    const isHomePage = computed(() => {
      return route.path === '/'
    })

    const fetchEventData = async () => {
      try {
        const response = await fetch('https://api.projektcommunity.com/projects')
        const data = await response.json()
        
        // Find the next event that's accepting booths and deadline hasn't passed
        const now = new Date()
        let nextEvent = data.projects
          .filter(p => new Date(p.booth_deadline_date) > now && p.accepting_booth)
          .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))[0]

        // If no upcoming events found, get the last event that accepted booths
        if (!nextEvent) {
          nextEvent = data.projects
            .filter(p => p.accepting_booth)
            .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))[0]
        }

        if (nextEvent) {
          eventData.value = nextEvent
          eventName.value = nextEvent.name
          deadline.value = nextEvent.booth_deadline_date
        }
      } catch (error) {
        console.error('Failed to fetch event data:', error)
      }
    }

    const deadlineFormatted = computed(() => {
      if (!deadline.value) return ''
      const date = new Date(deadline.value)
      const dateStr = date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      const timeStr = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })
      return `${dateStr} at ${timeStr}`
    })
    
    // Hehe dummy stupid over-engineered countdown formatter
    const formattedDeadline = computed(() => {
      if (timeDistance.value <= 0) return 'Deadline passed'
      
      const days = Math.floor(timeDistance.value / (1000 * 60 * 60 * 24))
      const months = Math.floor(days / 30.44)
      
      if (months > 0) {
        const remainingDays = Math.floor(days % 30.44)
        return `${months}m ${remainingDays}d`
      }
      
      if (days > 0) {
        const hours = Math.floor((timeDistance.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        return `${days}d ${hours}h`
      }

      const hours = Math.floor(timeDistance.value / (1000 * 60 * 60))
      if (hours > 0) {
        const minutes = Math.floor((timeDistance.value % (1000 * 60 * 60)) / (1000 * 60))
        return `${hours}h ${minutes}m`
      }

      const minutes = Math.floor(timeDistance.value / (1000 * 60))
      if (minutes > 0) {
        const seconds = Math.floor((timeDistance.value % (1000 * 60)) / 1000)
        if (timeDistance.value < 300000) { // Only show milliseconds for last 5 minutes
          const milliseconds = Math.floor((timeDistance.value % 1000) / 10) // Reduced to 2 digits
          return `${minutes}m ${seconds}.${milliseconds.toString().padStart(2, '0')}s`
        }
        return `${minutes}m ${seconds}s`
      }
      
      const seconds = Math.floor(timeDistance.value / 1000)
      const milliseconds = Math.floor((timeDistance.value % 1000) / 10) // Reduced to 2 digits
      return `${seconds}.${milliseconds.toString().padStart(2, '0')}s`
    })

    const updateCountdown = () => {
      const now = new Date().getTime()
      const targetDate = new Date(deadline.value).getTime()
      timeDistance.value = targetDate - now
    }

    onMounted(() => {
      fetchEventData()
      let animationFrameId = null
      let normalInterval = null

      const updateWithAnimation = () => {
        updateCountdown()
        animationFrameId = requestAnimationFrame(updateWithAnimation)
      }

      const startPreciseUpdates = () => {
        if (normalInterval) {
          clearInterval(normalInterval)
          normalInterval = null
        }
        updateWithAnimation()
      }

      const startNormalUpdates = () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
          animationFrameId = null
        }
        updateCountdown()
        normalInterval = setInterval(updateCountdown, 1000)
      }

      // Start with normal updates (every second)
      startNormalUpdates()

      // Check every second if we need to switch to precise updates
      const checkInterval = setInterval(() => {
        if (timeDistance.value < 300000 && !animationFrameId) { // Switch to precise updates under 5 minutes
          startPreciseUpdates()
        } else if (timeDistance.value <= 0) { // Clean up when deadline passed
          if (normalInterval) clearInterval(normalInterval)
          if (animationFrameId) cancelAnimationFrame(animationFrameId)
          if (checkInterval) clearInterval(checkInterval)
        }
      }, 1000)

      // Add tooltip position handler
      const tooltipElements = document.querySelectorAll('[data-tooltip]');
      tooltipElements.forEach(element => {
        const tooltip = element.querySelector('.tooltip');
        if (tooltip) {
          const updatePosition = () => {
            const rect = element.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            
            if (spaceBelow < 100 && spaceAbove > spaceBelow) {
              tooltip.style.top = 'auto';
              tooltip.style.bottom = 'calc(100% + 5px)';
              tooltip.classList.add('tooltip-top');
            } else {
              tooltip.style.top = 'calc(100% + 5px)';
              tooltip.style.bottom = 'auto';
              tooltip.classList.remove('tooltip-top');
            }
          };

          // Update position on hover
          element.addEventListener('mouseenter', updatePosition);
          // Update position on scroll and resize
          window.addEventListener('scroll', updatePosition);
          window.addEventListener('resize', updatePosition);
        }
      });
    })

    return {
      formattedDeadline,
      timeDistance,
      isHomePage,
      deadlineFormatted,
      eventName
    }
  }
})
</script>

<style scoped>
.event-countdown {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 16px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.event-countdown-navbar {
  position: relative;
}

.event-countdown-bubble {
  position: fixed;
  bottom: 20px;
  left: 20px;
  flex-direction: column;
  gap: 4px;
  border-radius: 8px;
  padding: 8px;
  z-index: 100;
  width: fit-content;
  pointer-events: none;
}

/* Hide bubble on mobile */
@media (max-width: 959px) {
  .event-countdown-bubble {
    display: none;
  }
}

.countdown-item {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  cursor: help;
}

.countdown-label {
  color: var(--vp-c-text-2);
}

.countdown-value {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.countdown-urgent {
  color: red;
  font-weight: bold;
}

.countdown-value[data-tooltip] {
  position: relative;
  cursor: help;
  outline: none;
}

.countdown-value[data-tooltip]:hover .tooltip,
.countdown-value[data-tooltip]:focus .tooltip,
.countdown-value[data-tooltip]:focus-visible .tooltip {
  visibility: visible;
  opacity: 1;
  transform: translateX(-50%) translateY(2px);  /* Changed to move downward */
}

.countdown-value[data-tooltip]:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
  border-radius: 2px;
}

.countdown-value[data-tooltip] .tooltip {
  visibility: hidden;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 10px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 13px;
  min-width: max-content;  /* Added to ensure tooltip is at least as wide as its content */
  max-width: 300px;  /* Added to prevent extremely long tooltips */
  text-align: center;  /* Added to center the text */
  z-index: 999;  /* Increased to ensure tooltip appears above other elements */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: all 0.2s ease;
  border: 1px solid var(--vp-c-divider);
  pointer-events: none;
  line-height: 1.4;  /* Added for better text readability */
}

.countdown-value[data-tooltip]:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.countdown-value[data-tooltip] .tooltip::after,
.countdown-value[data-tooltip] .tooltip::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.countdown-value[data-tooltip] .tooltip::after {
  border: 5px solid transparent;
}

.countdown-value[data-tooltip] .tooltip::before {
  border: 6px solid transparent;
  z-index: -1;
}

/* Bottom position styles */
.countdown-value[data-tooltip] .tooltip:not(.tooltip-top)::after {
  bottom: 100%;
  border-bottom-color: var(--vp-c-bg-soft);
}

.countdown-value[data-tooltip] .tooltip:not(.tooltip-top)::before {
  bottom: 100%;
  border-bottom-color: var(--vp-c-divider);
  margin-bottom: 0.5px;
}

/* Top position styles */
.countdown-value[data-tooltip] .tooltip.tooltip-top::after {
  top: 100%;
  border-top-color: var(--vp-c-bg-soft);
}

.countdown-value[data-tooltip] .tooltip.tooltip-top::before {
  top: 100%;
  border-top-color: var(--vp-c-divider);
  margin-top: 0.5px;
}
</style>