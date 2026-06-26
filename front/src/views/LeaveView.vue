<script setup>
import { onMounted, reactive } from 'vue'

import { useEmployeeStore } from '@/stores/employeeStore'
import { useHrStore } from '@/stores/hrStore'

const hrStore = useHrStore()
const employeeStore = useEmployeeStore()

// 휴가 신청 폼입니다.
// type은 다른 입력값과 같은 톤으로 select에서 선택합니다.
const form = reactive({
  employee: '',
  type: '연차',
  startDate: '',
  endDate: '',
  reason: '',
})

// 직원 선택 박스에 표시할 직원 목록을 준비합니다.
onMounted(() => {
  if (!employeeStore.employees.length) {
    employeeStore.fetchEmployees()
  }
})

// 휴가 신청 내역을 추가하고 폼을 초기화합니다.
function submitLeave() {
  hrStore.addLeaveRequest({ ...form })
  form.employee = ''
  form.type = '연차'
  form.startDate = ''
  form.endDate = ''
  form.reason = ''
}
</script>

<template>
  <section class="content-stack">
    <!-- 휴가 관리 화면 제목 -->
    <div class="section-header">
      <div>
        <p class="eyebrow">Leave</p>
        <h1>휴가 관리</h1>
      </div>
    </div>

    <!-- 휴가 신청 추가 폼 -->
    <form class="detail-panel" @submit.prevent="submitLeave">
      <div class="form-grid two">
        <label>
          직원
          <select v-model="form.employee" required>
            <option value="" disabled>직원 선택</option>
            <option
              v-for="employee in employeeStore.employeeOptions"
              :key="employee.id"
              :value="employee.name"
            >
              {{ employee.name }} / {{ employee.department }}
            </option>
          </select>
        </label>
        <label>
          휴가 종류
          <select v-model="form.type">
            <option v-for="type in hrStore.leaveTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </label>
        <label>
          시작일
          <input v-model="form.startDate" type="date" required>
        </label>
        <label>
          종료일
          <input v-model="form.endDate" type="date" required>
        </label>
        <label class="wide">
          사유
          <textarea v-model="form.reason" rows="3" placeholder="휴가 사유를 입력"></textarea>
        </label>
      </div>
      <div class="form-actions">
        <button type="submit">휴가 신청 추가</button>
      </div>
    </form>

    <!-- 휴가 신청/사용 현황 목록 -->
    <table class="data-table">
      <thead>
        <tr>
          <th>직원</th>
          <th>종류</th>
          <th>기간</th>
          <th>사유</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in hrStore.leaveRequests" :key="request.id">
          <td>{{ request.employee }}</td>
          <td>{{ request.type }}</td>
          <td>{{ request.startDate }} ~ {{ request.endDate }}</td>
          <td>{{ request.reason }}</td>
          <td><span class="table-badge">{{ request.status }}</span></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
