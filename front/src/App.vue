<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppNav from '@/components/AppNav.vue'
import { useHrStore } from '@/stores/hrStore'

const hrStore = useHrStore()

// 앱이 처음 열릴 때 HR 공통 데이터를 한 번 불러옵니다.
// 백엔드가 꺼져 있으면 hrStore 내부의 샘플 데이터가 그대로 사용됩니다.
onMounted(() => {
  hrStore.loadHrData()
})
</script>

<template>
  <div class="app-shell">
    <!-- 전체 화면 공통 상단 메뉴 -->
    <AppNav />
    <main class="page">
      <!-- 현재 URL에 맞는 화면 컴포넌트가 여기에 표시됩니다. -->
      <RouterView />
    </main>
  </div>
</template>
