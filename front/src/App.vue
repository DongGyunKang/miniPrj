<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppNav from '@/components/AppNav.vue'
import { useHrStore } from '@/stores/hrStore'

const hrStore = useHrStore()

onMounted(() => {
  hrStore.loadHrData()
})
</script>

<template>
  <div class="app-shell">
    <AppNav />
    <main class="page">
      <RouterView />
    </main>
  </div>
</template>
