import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import http from '@/api/http'

// 직원 상세정보에서 공통으로 사용할 기본 개인정보 값입니다.
// DB 컬럼을 나중에 만들 때도 이 필드들을 기준으로 생각하면 됩니다.
const defaultProfile = {
  phone: '',
  birthDate: '',
  address: '',
  emergencyContact: '',
  employmentStatus: '재직',
}

export const useEmployeeStore = defineStore('employees', () => {
  // DB 연결 전에도 화면을 확인할 수 있게 임시 직원 데이터를 둡니다.
  // fetchEmployees()에서 백엔드 호출이 실패하면 이 데이터가 화면에 표시됩니다.
  const sampleEmployees = [
    {
      id: 1,
      name: 'Kim Admin',
      department: '인사팀',
      position: 'Manager',
      email: 'admin@mymini.local',
      hireDate: '2026-01-02',
      phone: '010-1111-2222',
      birthDate: '1992-03-14',
      address: '서울시 마포구',
      emergencyContact: '010-9000-1111',
      employmentStatus: '재직',
    },
    {
      id: 2,
      name: 'Lee Staff',
      department: '개발팀',
      position: 'Engineer',
      email: 'staff@mymini.local',
      hireDate: '2026-02-03',
      phone: '010-2222-3333',
      birthDate: '1996-08-21',
      address: '경기도 성남시',
      emergencyContact: '010-9000-2222',
      employmentStatus: '재직',
    },
    {
      id: 3,
      name: 'Park User',
      department: '운영팀',
      position: 'Coordinator',
      email: 'user@mymini.local',
      hireDate: '2026-03-04',
      phone: '010-3333-4444',
      birthDate: '1994-11-02',
      address: '인천시 연수구',
      emergencyContact: '010-9000-3333',
      employmentStatus: '재직',
    },
  ]

  const employees = ref([])
  const loading = ref(false)
  const error = ref('')
  const usingSample = ref(false)

  // 휴가 신청 화면의 직원 선택 박스에서 쓰기 좋은 형태로 직원 목록을 가공합니다.
  const employeeOptions = computed(() => employees.value.map((employee) => ({
    id: employee.id,
    name: employee.name,
    department: employee.department,
  })))

  // 백엔드에서 일부 필드만 내려와도 상세 화면이 깨지지 않게 기본값을 합칩니다.
  function normalizeEmployee(employee) {
    return {
      ...defaultProfile,
      ...employee,
    }
  }

  // 직원 목록 조회입니다.
  // 성공하면 DB/API 데이터, 실패하면 sampleEmployees를 사용합니다.
  async function fetchEmployees() {
    loading.value = true
    error.value = ''

    try {
      const { data } = await http.get('/employees')
      employees.value = data.map(normalizeEmployee)
      usingSample.value = false
    } catch {
      employees.value = sampleEmployees.map(normalizeEmployee)
      usingSample.value = true
      error.value = 'DB 연결 전이라 임시 직원 데이터를 표시합니다.'
    } finally {
      loading.value = false
    }
  }

  // 라우터의 id 값으로 직원 한 명을 찾습니다.
  // EmployeeDetailView.vue에서 상세정보를 보여줄 때 사용합니다.
  function findEmployee(id) {
    return employees.value.find((employee) => String(employee.id) === String(id))
  }

  // 직원 등록입니다.
  // DB가 준비되면 POST /api/employees 결과를 사용하고,
  // 아직 DB가 없으면 화면 상태에만 임시로 추가합니다.
  async function createEmployee(payload) {
    const employee = normalizeEmployee({
      id: Date.now(),
      hireDate: payload.hireDate || new Date().toISOString().slice(0, 10),
      ...payload,
    })

    try {
      const { data } = await http.post('/employees', employee)
      employees.value = [...employees.value, normalizeEmployee(data)]
      usingSample.value = false
      return data
    } catch {
      employees.value = [...employees.value, employee]
      usingSample.value = true
      error.value = 'DB 연결 전이라 화면에만 임시 등록했습니다.'
      return employee
    }
  }

  // 직원 개인정보 수정입니다.
  // 지금은 PATCH /api/employees/{id}를 시도하고 실패하면 화면 상태만 수정합니다.
  // 나중에 DB가 생기면 백엔드의 update SQL과 연결하면 됩니다.
  async function updateEmployee(id, payload) {
    const index = employees.value.findIndex((employee) => String(employee.id) === String(id))
    if (index < 0) {
      return null
    }

    const updated = normalizeEmployee({
      ...employees.value[index],
      ...payload,
      id: employees.value[index].id,
    })

    try {
      const { data } = await http.patch(`/employees/${id}`, updated)
      employees.value[index] = normalizeEmployee(data)
      usingSample.value = false
      return data
    } catch {
      employees.value[index] = updated
      usingSample.value = true
      error.value = 'DB 연결 전이라 화면에만 임시 수정했습니다.'
      return updated
    }
  }

  return {
    employees,
    employeeOptions,
    loading,
    error,
    usingSample,
    fetchEmployees,
    findEmployee,
    createEmployee,
    updateEmployee,
  }
})
