<script setup>
import { ref } from 'vue'

import { useHrStore } from '@/stores/hrStore'

const hrStore = useHrStore()

// 펼쳐진 부서명을 Set으로 관리합니다.
// 여러 부서를 동시에 펼칠 수 있게 배열보다 Set이 편합니다.
const openDepartments = ref(new Set())

// 부서 카드 오른쪽 화살표를 눌렀을 때 펼침/접힘을 바꿉니다.
function toggleDepartment(name) {
  const next = new Set(openDepartments.value)
  if (next.has(name)) {
    next.delete(name)
  } else {
    next.add(name)
  }
  openDepartments.value = next
}
</script>

<template>
  <section class="content-stack">
    <!-- 근태 관리 화면 제목 -->
    <div class="section-header">
      <div>
        <p class="eyebrow">Time Tracking</p>
        <h1>근태 관리</h1>
      </div>
    </div>

    <!-- 부서별 근태 요약 카드 -->
    <article
      v-for="group in hrStore.attendanceByDepartment"
      :key="group.department"
      class="accordion-card"
    >
      <!-- 클릭하면 직원별 근태 목록이 펼쳐지는 카드 헤더 -->
      <button type="button" class="accordion-head" @click="toggleDepartment(group.department)">
        <span class="arrow" :class="{ open: openDepartments.has(group.department) }">›</span>
        <strong>{{ group.department }}</strong>
        <span>부서장 {{ group.manager }}</span>
        <span>전체 {{ group.total }}명</span>
        <span class="good">출근 {{ group.present }}명</span>
        <span class="bad">결원 {{ group.absent }}명</span>
      </button>

      <!-- 펼쳐진 부서의 직원별 출근/퇴근/상태 목록 -->
      <table v-if="openDepartments.has(group.department)" class="data-table nested-table">
        <thead>
          <tr>
            <th>직원</th>
            <th>출근</th>
            <th>퇴근</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in group.records" :key="record.id">
            <td>{{ record.employee }}</td>
            <td>{{ record.checkIn }}</td>
            <td>{{ record.checkOut }}</td>
            <td><span class="table-badge">{{ record.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </article>
  </section>
</template>
