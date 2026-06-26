<script setup>
import { onMounted, reactive } from 'vue'
import { RouterLink } from 'vue-router'

import { useEmployeeStore } from '@/stores/employeeStore'

const employeeStore = useEmployeeStore()

// 직원 신규 등록 폼 데이터입니다.
// DB가 생기면 employees 테이블의 기본 컬럼과 연결됩니다.
const form = reactive({
  name: '',
  department: '',
  position: '',
  email: '',
  hireDate: '',
})

// 화면 진입 시 직원 목록을 먼저 불러옵니다.
// 이미 다른 화면에서 불러온 직원 목록이 있으면 중복 호출하지 않습니다.
onMounted(() => {
  if (!employeeStore.employees.length) {
    employeeStore.fetchEmployees()
  }
})

// 직원 등록 버튼을 눌렀을 때 실행됩니다.
// 등록 후에는 다음 입력을 위해 폼을 비웁니다.
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
    <!-- 화면 상단 제목과 새로고침 버튼 -->
    <div class="section-header">
      <div>
        <p class="eyebrow">Directory</p>
        <h1>직원 관리</h1>
      </div>
      <button type="button" class="ghost-button" @click="employeeStore.fetchEmployees">
        새로고침
      </button>
    </div>

    <!-- 직원 기본정보 등록 폼 -->
    <form class="employee-form" @submit.prevent="submitEmployee">
      <input v-model="form.name" required placeholder="이름">
      <input v-model="form.department" required placeholder="부서">
      <input v-model="form.position" required placeholder="직급/직책">
      <input v-model="form.email" type="email" required placeholder="이메일">
      <input v-model="form.hireDate" type="date" aria-label="입사일">
      <button type="submit">등록</button>
    </form>

    <p v-if="employeeStore.loading" class="muted">불러오는 중...</p>
    <p v-if="employeeStore.error" class="notice">{{ employeeStore.error }}</p>

    <!-- 직원 목록. 이름 또는 보기 버튼을 누르면 상세정보 화면으로 이동합니다. -->
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>이름</th>
          <th>부서</th>
          <th>직급/직책</th>
          <th>이메일</th>
          <th>입사일</th>
          <th>상세</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employeeStore.employees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>
            <RouterLink class="text-link" :to="`/employees/${employee.id}`">
              {{ employee.name }}
            </RouterLink>
          </td>
          <td>{{ employee.department }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.hireDate }}</td>
          <td>
            <RouterLink class="small-button" :to="`/employees/${employee.id}`">
              보기
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
