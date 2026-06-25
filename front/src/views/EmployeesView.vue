<script setup>
import { onMounted, reactive } from 'vue'

import { useEmployeeStore } from '@/stores/employeeStore'

const employeeStore = useEmployeeStore()

const form = reactive({
  name: '',
  department: '',
  position: '',
  email: '',
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
}
</script>

<template>
  <section class="content-stack">
    <div class="section-header">
      <div>
        <p class="eyebrow">Directory</p>
        <h1>Employees</h1>
      </div>
      <button type="button" class="ghost-button" @click="employeeStore.fetchEmployees">
        Refresh
      </button>
    </div>

    <form class="employee-form" @submit.prevent="submitEmployee">
      <input v-model="form.name" required placeholder="Name">
      <input v-model="form.department" required placeholder="Department">
      <input v-model="form.position" required placeholder="Position">
      <input v-model="form.email" type="email" required placeholder="Email">
      <button type="submit">Add</button>
    </form>

    <p v-if="employeeStore.loading" class="muted">Loading...</p>
    <p v-if="employeeStore.error" class="error">{{ employeeStore.error }}</p>

    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Position</th>
          <th>Email</th>
          <th>Hire Date</th>
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
