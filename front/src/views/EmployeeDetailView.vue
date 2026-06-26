<script setup>
import { computed, onMounted, reactive, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { useEmployeeStore } from '@/stores/employeeStore'

const route = useRoute()
const employeeStore = useEmployeeStore()

// 상세정보 수정 폼입니다.
// 목록 화면보다 개인정보 필드를 더 많이 다룹니다.
const form = reactive({
  name: '',
  department: '',
  position: '',
  email: '',
  hireDate: '',
  phone: '',
  birthDate: '',
  address: '',
  emergencyContact: '',
  employmentStatus: '재직',
})

// 현재 주소의 직원 id로 직원 한 명을 찾습니다.
const employee = computed(() => employeeStore.findEmployee(route.params.id))

// 상세 페이지로 바로 들어왔을 때도 직원 목록을 먼저 준비합니다.
onMounted(() => {
  if (!employeeStore.employees.length) {
    employeeStore.fetchEmployees()
  }
})

// 직원 데이터가 준비되면 form에 복사합니다.
// 원본 객체를 직접 수정하지 않고 저장 버튼을 눌렀을 때 updateEmployee()를 호출합니다.
watchEffect(() => {
  if (!employee.value) {
    return
  }

  Object.assign(form, {
    name: employee.value.name || '',
    department: employee.value.department || '',
    position: employee.value.position || '',
    email: employee.value.email || '',
    hireDate: employee.value.hireDate || '',
    phone: employee.value.phone || '',
    birthDate: employee.value.birthDate || '',
    address: employee.value.address || '',
    emergencyContact: employee.value.emergencyContact || '',
    employmentStatus: employee.value.employmentStatus || '재직',
  })
})

// 개인정보 저장 버튼을 눌렀을 때 실행됩니다.
// 현재는 화면 상태 중심이고, DB가 붙으면 PATCH API가 실제 저장을 담당합니다.
async function saveProfile() {
  await employeeStore.updateEmployee(route.params.id, { ...form })
}
</script>

<template>
  <section class="content-stack">
    <!-- 상세 화면 제목과 목록 이동 링크 -->
    <div class="section-header">
      <div>
        <p class="eyebrow">Employee Profile</p>
        <h1>직원 상세정보</h1>
      </div>
      <RouterLink class="ghost-link" to="/employees">목록</RouterLink>
    </div>

    <p v-if="!employee" class="notice">직원 정보를 불러오는 중입니다.</p>

    <!-- 직원 개인정보 수정 폼 -->
    <form v-else class="detail-panel" @submit.prevent="saveProfile">
      <div class="form-grid two">
        <label>
          이름
          <input v-model="form.name" required>
        </label>
        <label>
          재직상태
          <select v-model="form.employmentStatus">
            <option>재직</option>
            <option>휴직</option>
            <option>퇴사</option>
          </select>
        </label>
        <label>
          부서
          <input v-model="form.department" required>
        </label>
        <label>
          직급/직책
          <input v-model="form.position" required>
        </label>
        <label>
          이메일
          <input v-model="form.email" type="email" required>
        </label>
        <label>
          휴대폰
          <input v-model="form.phone" placeholder="010-0000-0000">
        </label>
        <label>
          생년월일
          <input v-model="form.birthDate" type="date">
        </label>
        <label>
          입사일
          <input v-model="form.hireDate" type="date">
        </label>
        <label class="wide">
          주소
          <input v-model="form.address">
        </label>
        <label class="wide">
          비상연락처
          <input v-model="form.emergencyContact">
        </label>
      </div>

      <div class="form-actions">
        <button type="submit">개인정보 저장</button>
      </div>
    </form>
  </section>
</template>
