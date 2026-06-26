<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="topbar">
    <RouterLink class="brand" to="/">Mini HR</RouterLink>
    <nav class="nav-links">
      <RouterLink to="/">대시보드</RouterLink>
      <RouterLink to="/employees">직원</RouterLink>
      <RouterLink to="/departments">부서</RouterLink>
      <RouterLink to="/attendance">근태</RouterLink>
      <RouterLink to="/leave">휴가</RouterLink>
      <RouterLink to="/admin">관리자</RouterLink>
    </nav>
  </header>
</template>
