<script setup>
import { RouterLink } from 'vue-router'

import { useHrStore } from '@/stores/hrStore'

const hrStore = useHrStore()
</script>

<template>
  <section class="content-stack">
    <!-- 인사관리시스템 첫 화면 소개 영역 -->
    <div class="dashboard-header">
      <div>
        <p class="eyebrow">Human Resources</p>
        <h1>인사관리시스템</h1>
        <p class="lead">직원 정보, 조직, 근태, 휴가, 권한 관리를 한 흐름으로 다루는 업무 시스템입니다.</p>
      </div>
    </div>

    <!-- 대시보드 요약 지표. hrStore.summary 계산값을 사용합니다. -->
    <div class="metric-grid">
      <article class="metric-tile">
        <span>업무 모듈</span>
        <strong>{{ hrStore.summary.modules }}</strong>
      </article>
      <article class="metric-tile">
        <span>부서</span>
        <strong>{{ hrStore.summary.departments }}</strong>
      </article>
      <article class="metric-tile">
        <span>금일 근태</span>
        <strong>{{ hrStore.summary.todayAttendance }}</strong>
      </article>
      <article class="metric-tile">
        <span>처리할 휴가</span>
        <strong>{{ hrStore.summary.pendingLeaves }}</strong>
      </article>
    </div>

    <!-- 업무 모듈 카드. 클릭하면 각 업무 화면으로 이동합니다. -->
    <section class="module-grid" aria-label="HR modules">
      <RouterLink
        v-for="module in hrStore.modules"
        :key="module.key"
        class="module-card"
        :to="module.route"
      >
        <span class="status-pill">{{ module.status }}</span>
        <h2>{{ module.name }}</h2>
        <p>{{ module.description }}</p>
      </RouterLink>
    </section>
  </section>
</template>
