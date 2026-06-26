import { defineStore } from 'pinia'
import { ref } from 'vue'

import http from '@/api/http'

export const useEmployeeStore = defineStore('employees', () => {
  const sampleEmployees = [
    {
      id: 1,
      name: 'Kim Admin',
      department: '인사팀',
      position: 'Manager',
      email: 'admin@mymini.local',
      hireDate: '2026-01-02',
    },
    {
      id: 2,
      name: 'Lee Staff',
      department: '개발팀',
      position: 'Engineer',
      email: 'staff@mymini.local',
      hireDate: '2026-02-03',
    },
    {
      id: 3,
      name: 'Park User',
      department: '운영팀',
      position: 'Coordinator',
      email: 'user@mymini.local',
      hireDate: '2026-03-04',
    },
  ]

  const employees = ref([])
  const loading = ref(false)
  const error = ref('')
  const usingSample = ref(false)

  async function fetchEmployees() {
    loading.value = true
    error.value = ''

    try {
      const { data } = await http.get('/employees')
      employees.value = data
      usingSample.value = false
    } catch (err) {
      employees.value = sampleEmployees
      usingSample.value = true
      error.value = 'DB 연결 전이라 임시 직원 데이터를 표시합니다.'
    } finally {
      loading.value = false
    }
  }

  async function createEmployee(payload) {
    try {
      const { data } = await http.post('/employees', payload)
      employees.value = [...employees.value, data]
      usingSample.value = false
      return data
    } catch {
      const data = {
        id: Date.now(),
        hireDate: new Date().toISOString().slice(0, 10),
        ...payload,
      }
      employees.value = [...employees.value, data]
      usingSample.value = true
      error.value = 'DB 연결 전이라 화면에만 임시 등록했습니다.'
      return data
    }
  }

  return {
    employees,
    loading,
    error,
    usingSample,
    fetchEmployees,
    createEmployee,
  }
})
