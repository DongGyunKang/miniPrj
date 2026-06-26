<script setup>
import { useHrStore } from '@/stores/hrStore'

const hrStore = useHrStore()
</script>

<template>
  <section class="content-stack">
    <div class="section-header">
      <div>
        <p class="eyebrow">Leave</p>
        <h1>휴가 관리</h1>
      </div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>직원</th>
          <th>종류</th>
          <th>기간</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in hrStore.leaveRequests" :key="request.id">
          <td>{{ request.employee }}</td>
          <td>{{ request.type }}</td>
          <td>{{ request.period }}</td>
          <td><span class="table-badge">{{ request.status }}</span></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
