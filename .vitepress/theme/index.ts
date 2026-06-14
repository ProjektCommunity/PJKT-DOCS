// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.css'
import '@fortawesome/fontawesome-free/css/all.css'
import EventCountdown from './components/EventCountdown.vue'
import Glowsticks from './components/Glowsticks.vue'
import './components/EventCountdown.css'
import MyLayout from './MyLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    // Register global components
    app.component('EventCountdown', EventCountdown)
    app.component('Glowsticks', Glowsticks)
  }
} satisfies Theme
