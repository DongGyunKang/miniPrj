<script setup>
import { useHrStore } from '@/stores/hrStore'

const hrStore = useHrStore()
</script>

<template>
  <section class="content-stack">
    <div class="section-header">
      <div>
        <p class="eyebrow">Time Tracking</p>
        <h1>근태 관리</h1>
      </div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>직원</th>
          <th>부서</th>
          <th>출근</th>
          <th>퇴근</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in hrStore.attendance" :key="record.id">
          <td>{{ record.employee }}</td>
          <td>{{ record.department }}</td>
          <td>{{ record.checkIn }}</td>
          <td>{{ record.checkOut }}</td>
          <td><span class="table-badge">{{ record.status }}</span></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
