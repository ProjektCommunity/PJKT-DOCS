<template>
  <Transition name="fade">
    <div 
      class="event-countdown" 
      :class="{ 
        'event-countdown-navbar': isHomePage,
        'event-countdown-bubble': !isHomePage,
        'event-countdown-error': apiError,
        'event-countdown-loading': isLoading
      }"
      v-if="isLoading || (deadline && eventName) || apiError"
    >
      <template v-if="isLoading">
        <div class="countdown-loading">
          Loading next event...
        </div>
      </template>
      <template v-else-if="!apiError">
        <div class="countdown-item">
          <span class="countdown-label">Next event:</span>
          <span class="countdown-value">{{ eventName }}</span>
        </div>
        <div class="countdown-item" v-if="deadline">
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
      </template>
      <template v-else>
        <div class="countdown-error-message">
          <span>⚠️ PJKT API is currently down. Please check our</span>
          <a href="https://discord.com/invite/pjkt" target="_blank" rel="noopener">Discord</a>
        </div>
      </template>
    </div>
  </Transition>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'

export default defineComponent({
  name: 'EventCountdown',
  setup() {
    const route = useRoute()
    const eventData = ref(null)
    const deadline = ref(null)
    const timeDistance = ref(0)
    const eventName = ref('')
    const apiError = ref(false)
    const isLoading = ref(true)

    const isHomePage = computed(() => route.path === '/')
    
    const fetchEventData = async () => {
      try {
        isLoading.value = true
        apiError.value = false
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
        
        if (!data || !data.projects || !Array.isArray(data.projects)) {
          throw new Error('Invalid API response format')
        }

        const now = new Date()
        let nextEvent = data.projects
          .filter(p => p.booth_deadline_date && new Date(p.booth_deadline_date) > now && p.accepting_booth)
          .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))[0]

        if (!nextEvent) {
          nextEvent = data.projects
            .filter(p => p.accepting_booth && p.booth_deadline_date)
            .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))[0]
        }

        if (nextEvent && nextEvent.name && nextEvent.booth_deadline_date) {
          eventData.value = nextEvent
          eventName.value = nextEvent.name
          deadline.value = nextEvent.booth_deadline_date
          updateCountdown()
        } else {
          eventName.value = ''
          deadline.value = null
          throw new Error('No valid event data found')
        }
      } catch (error) {
        console.error('Failed to fetch event data:', error)
        apiError.value = true
        eventName.value = ''
        deadline.value = null
      } finally {
        isLoading.value = false
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
      if (!deadline.value) return ''
      if (!timeDistance.value && timeDistance.value !== 0) return ''
      
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
      if (!deadline.value) {
        timeDistance.value = 0
        return
      }
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

      // Watch for loading state changes
      watch([isLoading, deadline], ([loading, newDeadline]) => {
        if (!loading && newDeadline) {
          startNormalUpdates()

          const checkInterval = setInterval(() => {
            if (timeDistance.value < 300000 && !animationFrameId) {
              startPreciseUpdates()
            } else if (timeDistance.value <= 0) {
              if (normalInterval) clearInterval(normalInterval)
              if (animationFrameId) cancelAnimationFrame(animationFrameId)
              if (checkInterval) clearInterval(checkInterval)
              // Refetch data when countdown ends
              fetchEventData()
            }
          }, 1000)
        }
      })

      // Clean up intervals on component unmount
      onUnmounted(() => {
        if (normalInterval) clearInterval(normalInterval)
        if (animationFrameId) cancelAnimationFrame(animationFrameId)
      })

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
      eventName,
      apiError,
      isLoading,
      deadline
    }
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.event-countdown {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 16px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

.event-countdown-error {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-danger-1);
  padding: 8px 16px;
}

.countdown-error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-danger-1);
}

.countdown-error-message a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  pointer-events: auto;
}

.countdown-error-message a:hover {
  text-decoration: underline;
}

.event-countdown-loading {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.countdown-loading {
  color: var(--vp-c-text-2);
  font-style: italic;
}
</style>