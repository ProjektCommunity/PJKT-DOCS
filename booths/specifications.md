# PJKT Booth Creation Guidelines

<script setup>
import { onMounted, ref } from 'vue'

const specs = ref(null)
const loading = ref(true)
const error = ref(null)
const eventName = ref('')
const eventInfo = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('https://api.projektcommunity.com/projects')
    const data = await response.json()
    const now = new Date()
    
    // Find the closest future event that's accepting booths
    const futureEvents = data.projects
      .filter(p => p.accepting_booth && p.booth_requirements && new Date(p.start_date) > now)
      .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))

    if (futureEvents.length === 0) {
      error.value = 'No upcoming events are currently accepting booths'
      loading.value = false
      return
    }

    const nextEvent = futureEvents[0]
    specs.value = nextEvent.booth_requirements
    eventName.value = nextEvent.name
    eventInfo.value = {
      startDate: new Date(nextEvent.start_date).toLocaleDateString(),
      endDate: new Date(nextEvent.end_date).toLocaleDateString(),
      deadline: new Date(nextEvent.booth_deadline_date).toLocaleDateString(),
      logo: nextEvent.Logo?.path,
      preview: nextEvent.preview_link
    }
    loading.value = false
  } catch (e) {
    error.value = 'Failed to load specifications'
    loading.value = false
  }
})

const formatNumber = (num) => num.toLocaleString()
</script>

<div v-if="loading" class="loading">Loading specifications...</div>
<div v-else-if="error" class="error-message">{{ error }}</div>
<template v-else>

<div class="specs-content">
<div class="event-header">
    <img v-if="eventInfo.logo" :src="eventInfo.logo" :alt="eventName + ' logo'" class="event-logo">
    <div class="event-info">
        <h2>{{ eventName }}</h2>
        <div class="dates">Event: {{ eventInfo.startDate }} - {{ eventInfo.endDate }}</div>
        <div class="deadline">Booth submissions due: {{ eventInfo.deadline }}</div>
        <div v-if="eventInfo.preview" class="preview-info">
            <a :href="eventInfo.preview" target="_blank" rel="noopener">Preview Event Space</a>
        </div>
    </div>
</div>

## Geometry and Bounds

<ul>
  <li>Model under {{ formatNumber(specs.MaxTriangles) }} triangles</li>
  <li>Up to {{ specs.MaxMaterial }} materials</li>
  <li>Max size: {{ specs.MaxDims[0] }}x{{ specs.MaxDims[1] }}x{{ specs.MaxDims[2] }} meters
    <span v-if="specs.MaxDimsMargin" class="margin-note">
      (includes {{ specs.MaxDimsMargin }}m safety margin)
    </span>
  </li>
  <li>Maximum static meshes: {{ specs.MaxStaticMeshes }}</li>
</ul>

## File Size Requirements

<ul>
  <li>VRChat Build: under {{ specs.MaxBuildSize ?? 8 }} MB</li>
  <li>Uncompressed assets: under {{ specs.MaxFileSize }} MB</li>
  <li>VRAM usage: less than {{ specs.MaxVram }} MB</li>
</ul>

## Interactive Elements

<ul>
  <li>Pickups and Props:
    <ul>
      <li>Maximum {{ specs.MaxPickups }} kinematic pickups</li>
      <li>Maximum {{ specs.MaxAvatarPedestals }} avatar pedestals</li>
      <li>Maximum {{ specs.MaxPortals }} portals</li>
    </ul>
  </li>
  <li>UI and Effects:
    <ul>
      <li>{{ specs.MaxTextMeshPro }} TextMeshPro component allowed</li>
      <li>Maximum {{ specs.MaxParticles }} particles (no collisions)</li>
      <li>Mirrors: {{ specs.MaxMirrors === 0 ? 'Not allowed' : `Maximum ${specs.MaxMirrors}` }}</li>
    </ul>
  </li>
  <li>Animations:
    <ul>
      <li>{{ specs.MaxSkinnedMeshRenderers }} skinned mesh renderer</li>
      <li>{{ specs.MaxAnimators }} animator with up to {{ specs.MaxAnimations }} animations</li>
    </ul>
  </li>
</ul>

## SDK Integration

<ul>
  <li>Maximum {{ specs.MaxUdonScripts }} Udon scripts per booth</li>
  <li>Only use approved scripts from the whitelist below</li>
</ul>

### Approved Scripts

Available in the PJKT SDK:

<ul class="script-list">
  <li v-for="script in specs.UdonWhitelist" :key="script">
    {{ script.split('/').pop().replace('.asset', '') }}
  </li>
</ul>

## Important Notes

- Staff may contact you for booth adjustments if needed
- Booths may be rejected (with discussion)
- Report SDK bugs to @Pesky#8762 on Discord

## Restrictions

- No custom Udon scripting (only use approved prefabs)
- If a feature is not explicitly mentioned in these specifications, assume it's not allowed
- No runtime lighting changes - use baked lighting only
- Custom shaders are allowed but must be performance-conscious

</div>

</template>

<style>
.specs-content {
  margin-top: 2rem;
}
.specs-content ul {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style-type: disc;
  padding-left: 1.5rem;
}
.loading {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}
.error-message {
  color: var(--vp-c-danger);
  padding: 1rem;
  border: 1px solid var(--vp-c-danger);
  border-radius: 6px;
  margin: 1rem 0;
}
.event-header {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}
.event-logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
.event-info {
  flex: 1;
}
.event-info h2 {
  margin: 0;
}
.dates {
  margin-top: 0.75rem;
  color: var(--vp-c-text-2);
}
.deadline {
  color: var(--vp-c-brand);
  font-weight: 500;
}
.action-buttons {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.preview-info {
  margin-top: 1rem;
}
.preview-info a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand-alt);
  color: var(--vp-c-text-1);
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: opacity 0.2s;
}
.preview-info a:hover {
  opacity: 0.9;
}
.margin-note {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  font-style: italic;
}
.specs-content ul ul {
  margin: 0.5rem 0;
}
.script-list {
  background-color: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1rem 1rem 1rem 2.5rem !important;
}
.script-list li {
  font-family: monospace;
}
</style>