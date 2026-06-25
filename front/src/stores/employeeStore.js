import { defineStore } from 'pinia'
import { ref } from 'vue'

import http from '@/api/http'

export const useEmployeeStore = defineStore('employees', () => {
  const employees = ref([])
  const loading = ref(false)
  const error = ref('')

  async function fetchEmployees() {
    loading.value = true
    error.value = ''

    try {
      const { data } = await http.get('/employees')
      employees.value = data
    } catch (err) {
      error.value = err?.message || 'Failed to load employees'
    } finally {
      loading.value = false
    }
  }

  async function createEmployee(payload) {
    const { data } = await http.post('/employees', payload)
    employees.value = [...employees.value, data]
    return data
  }

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    createEmployee,
  }
})
