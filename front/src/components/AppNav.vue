<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="topbar">
    <RouterLink class="brand" to="/">MyMini HR</RouterLink>
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/employees">Employees</RouterLink>
    </nav>
  </header>
</template>
