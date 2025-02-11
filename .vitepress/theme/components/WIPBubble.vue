<template>
  <div v-if="!dismissed" class="wip-bubble">
    <span>🚧 Documentation is WIP</span>
    <button class="close-button" @click="dismiss">×</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dismissed = ref(false)

const dismiss = () => {
  dismissed.value = true
}
</script>

<style scoped>
.wip-bubble {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #1a2533;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 100;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.2px;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: inherit;
}

.close-button:hover {
  color: white;
}
</style>