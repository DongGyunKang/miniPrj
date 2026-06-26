<script setup>
import { onMounted, reactive } from 'vue'

import { useEmployeeStore } from '@/stores/employeeStore'

const employeeStore = useEmployeeStore()

const form = reactive({
  name: '',
  department: '',
  position: '',
  email: '',
  hireDate: '',
})

onMounted(() => {
  employeeStore.fetchEmployees()
})

async function submitEmployee() {
  await employeeStore.createEmployee({ ...form })
  form.name = ''
  form.department = ''
  form.position = ''
  form.email = ''
  form.hireDate = ''
}
</script>

<template>
  <section class="content-stack">
    <div class="section-header">
      <div>
        <p class="eyebrow">Directory</p>
        <h1>직원 관리</h1>
      </div>
      <button type="button" class="ghost-button" @click="employeeStore.fetchEmployees">
        새로고침
      </button>
    </div>

    <form class="employee-form" @submit.prevent="submitEmployee">
      <input v-model="form.name" required placeholder="이름">
      <input v-model="form.department" required placeholder="부서">
      <input v-model="form.position" required placeholder="직급/직책">
      <input v-model="form.email" type="email" required placeholder="이메일">
      <input v-model="form.hireDate" type="date" aria-label="입사일">
      <button type="submit">등록</button>
    </form>

    <p v-if="employeeStore.loading" class="muted">불러오는 중...</p>
    <p v-if="employeeStore.error" class="error">{{ employeeStore.error }}</p>

    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>이름</th>
          <th>부서</th>
          <th>직급/직책</th>
          <th>이메일</th>
          <th>입사일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employeeStore.employees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.department }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.hireDate }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
