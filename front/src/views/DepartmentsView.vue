<script setup>
import { useHrStore } from '@/stores/hrStore'

const hrStore = useHrStore()
</script>

<template>
  <section class="content-stack">
    <div class="section-header">
      <div>
        <p class="eyebrow">Organization</p>
        <h1>부서 관리</h1>
      </div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>부서명</th>
          <th>부서장</th>
          <th>인원</th>
          <th>주요 업무</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="department in hrStore.departments" :key="department.id">
          <td>{{ department.name }}</td>
          <td>{{ department.manager }}</td>
          <td>{{ department.headcount }}</td>
          <td>{{ department.role }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
