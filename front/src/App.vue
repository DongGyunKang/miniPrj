<script setup>
import { RouterView } from 'vue-router'
import AppNav from '@/components/AppNav.vue'
</script>

<template>
  <div class="app-shell">
    <AppNav />
    <main class="page">
      <RouterView />
    </main>
  </div>
</template>
