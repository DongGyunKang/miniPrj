<script setup>
import { useHrStore } from '@/stores/hrStore'

const hrStore = useHrStore()
</script>

<template>
  <section class="content-stack">
    <div class="section-header">
      <div>
        <p class="eyebrow">Settings</p>
        <h1>관리자 설정</h1>
      </div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>관리 항목</th>
          <th>담당</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in hrStore.adminTasks" :key="task.id">
          <td>{{ task.name }}</td>
          <td>{{ task.owner }}</td>
          <td><span class="table-badge">{{ task.status }}</span></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
