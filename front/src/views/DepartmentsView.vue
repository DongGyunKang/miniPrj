<script setup>
import { reactive, watchEffect } from 'vue'

import { useHrStore } from '@/stores/hrStore'

const hrStore = useHrStore()

// 부서 추가 폼입니다.
// members는 쉼표로 입력받고, hrStore에서 배열로 변환합니다.
const departmentForm = reactive({
  name: '',
  manager: '',
  members: '',
  mainTasks: '',
})

// 부서별 주요업무 수정 textarea의 값을 보관합니다.
const taskForms = reactive({})

// 부서별 아침 보고서 입력값을 보관합니다.
const reportForms = reactive({})

// 부서 카드가 화면에 표시될 때 필요한 폼 기본값을 준비합니다.
function ensureDepartmentForms(department) {
  if (!taskForms[department.id]) {
    taskForms[department.id] = department.mainTasks
  }

  if (!reportForms[department.id]) {
    reportForms[department.id] = {
      date: new Date().toISOString().slice(0, 10),
      content: '',
      updateTasks: true,
    }
  }
}

// 부서 목록이 바뀔 때마다 폼 기본값도 맞춰둡니다.
watchEffect(() => {
  hrStore.departments.forEach(ensureDepartmentForms)
})

// 새 부서를 추가하고 입력값을 초기화합니다.
function submitDepartment() {
  hrStore.addDepartment({ ...departmentForm })
  departmentForm.name = ''
  departmentForm.manager = ''
  departmentForm.members = ''
  departmentForm.mainTasks = ''
}

// 부서의 주요업무만 따로 저장합니다.
function saveTasks(department) {
  hrStore.updateDepartmentTasks(department.id, taskForms[department.id])
}

// 아침 보고서를 등록합니다.
// 체크박스가 켜져 있으면 보고 내용이 부서 주요업무에도 반영됩니다.
function submitReport(department) {
  hrStore.addMorningReport(department.id, { ...reportForms[department.id] })
  reportForms[department.id].content = ''
  taskForms[department.id] = department.mainTasks
}
</script>

<template>
  <section class="content-stack">
    <!-- 부서 관리 화면 제목 -->
    <div class="section-header">
      <div>
        <p class="eyebrow">Organization</p>
        <h1>부서 관리</h1>
      </div>
    </div>

    <!-- 부서 추가 폼 -->
    <form class="detail-panel" @submit.prevent="submitDepartment">
      <div class="form-grid four">
        <label>
          부서명
          <input v-model="departmentForm.name" required placeholder="예: 회계팀">
        </label>
        <label>
          부서장
          <input v-model="departmentForm.manager" required placeholder="예: Hong Lead">
        </label>
        <label class="wide">
          소속 인원
          <input v-model="departmentForm.members" placeholder="쉼표로 구분: Kim, Lee, Park">
        </label>
        <label class="wide">
          주요업무
          <textarea v-model="departmentForm.mainTasks" required rows="3" placeholder="부서의 핵심 업무를 입력"></textarea>
        </label>
      </div>
      <div class="form-actions">
        <button type="submit">부서 추가</button>
      </div>
    </form>

    <!-- 부서별 상세 카드: 부서장, 인원, 주요업무, 아침 보고서 -->
    <article
      v-for="department in hrStore.departments"
      :key="department.id"
      class="department-card"
    >
      <div class="department-head">
        <div>
          <h2>{{ department.name }}</h2>
          <p class="muted">부서장: {{ department.manager }} / 인원 {{ department.members.length }}명</p>
        </div>
      </div>

      <div class="split-grid">
        <!-- 부서 소속 인원 목록 -->
        <section>
          <h3>소속 인원</h3>
          <div class="chip-list">
            <span v-for="member in department.members" :key="member" class="chip">{{ member }}</span>
          </div>
        </section>

        <!-- 부서 주요업무 직접 수정 영역 -->
        <section>
          <h3>주요업무 업데이트</h3>
          <textarea v-model="taskForms[department.id]" rows="4"></textarea>
          <button type="button" class="ghost-button top-gap" @click="saveTasks(department)">
            주요업무 저장
          </button>
        </section>
      </div>

      <!-- 아침 보고서 입력 및 기존 보고서 목록 -->
      <section class="report-box">
        <h3>아침 보고서</h3>
        <div class="form-grid report">
          <input v-model="reportForms[department.id].date" type="date" aria-label="보고일">
          <textarea v-model="reportForms[department.id].content" rows="3" placeholder="오늘 아침 보고 내용을 입력"></textarea>
          <label class="check-line">
            <input v-model="reportForms[department.id].updateTasks" type="checkbox">
            보고 내용으로 주요업무도 갱신
          </label>
          <button type="button" @click="submitReport(department)">보고서 등록</button>
        </div>

        <ul class="report-list">
          <li v-for="report in department.morningReports" :key="report.id">
            <strong>{{ report.date }}</strong>
            <span>{{ report.content }}</span>
          </li>
        </ul>
      </section>
    </article>
  </section>
</template>
