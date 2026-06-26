import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import http from '@/api/http'

export const useHrStore = defineStore('hr', () => {
  const modules = ref([
    {
      key: 'employees',
      name: '직원 관리',
      description: '직원 기본정보, 부서, 직급, 입사일을 관리합니다.',
      route: '/employees',
      status: '진행',
    },
    {
      key: 'departments',
      name: '부서 관리',
      description: '조직도, 부서장, 소속 인원을 정리합니다.',
      route: '/departments',
      status: '설계',
    },
    {
      key: 'attendance',
      name: '근태 관리',
      description: '출근, 퇴근, 지각, 결근 내역을 확인합니다.',
      route: '/attendance',
      status: '설계',
    },
    {
      key: 'leave',
      name: '휴가 관리',
      description: '연차 신청, 승인, 잔여 휴가를 관리합니다.',
      route: '/leave',
      status: '설계',
    },
    {
      key: 'admin',
      name: '관리자 설정',
      description: '권한, 공통코드, 시스템 기준값을 관리합니다.',
      route: '/admin',
      status: '예정',
    },
  ])

  const departments = ref([
    { id: 1, name: '인사팀', manager: 'Kim Admin', headcount: 4, role: '채용, 인사기록, 평가 운영' },
    { id: 2, name: '개발팀', manager: 'Lee Staff', headcount: 12, role: '서비스 개발, 유지보수' },
    { id: 3, name: '운영팀', manager: 'Park User', headcount: 7, role: '고객 운영, 정산, 현장 대응' },
  ])

  const attendance = ref([
    { id: 1, employee: 'Kim Admin', department: '인사팀', checkIn: '09:01', checkOut: '18:04', status: '정상' },
    { id: 2, employee: 'Lee Staff', department: '개발팀', checkIn: '09:18', checkOut: '-', status: '지각' },
    { id: 3, employee: 'Park User', department: '운영팀', checkIn: '08:55', checkOut: '18:10', status: '정상' },
  ])

  const leaveRequests = ref([
    { id: 1, employee: 'Kim Admin', type: '연차', period: '2026-07-03', status: '승인대기' },
    { id: 2, employee: 'Lee Staff', type: '오전반차', period: '2026-07-08', status: '승인' },
    { id: 3, employee: 'Park User', type: '병가', period: '2026-07-12 ~ 2026-07-13', status: '검토' },
  ])

  const adminTasks = ref([
    { id: 1, name: '직급 코드 관리', owner: '인사팀', status: '예정' },
    { id: 2, name: '권한 그룹 관리', owner: '관리자', status: '설계' },
    { id: 3, name: '휴가 기준일 설정', owner: '인사팀', status: '예정' },
  ])

  const loading = ref(false)

  const summary = computed(() => ({
    modules: modules.value.length,
    departments: departments.value.length,
    todayAttendance: attendance.value.length,
    pendingLeaves: leaveRequests.value.filter((item) => item.status !== '승인').length,
  }))

  async function loadHrData() {
    loading.value = true

    try {
      const [modulesRes, departmentsRes, attendanceRes, leavesRes, adminTasksRes] = await Promise.all([
        http.get('/hr/modules'),
        http.get('/hr/departments'),
        http.get('/hr/attendance'),
        http.get('/hr/leaves'),
        http.get('/hr/admin-tasks'),
      ])

      modules.value = modulesRes.data
      departments.value = departmentsRes.data
      attendance.value = attendanceRes.data
      leaveRequests.value = leavesRes.data
      adminTasks.value = adminTasksRes.data
    } catch {
      // Keep the local sample data when the backend is not running yet.
    } finally {
      loading.value = false
    }
  }

  return {
    modules,
    departments,
    attendance,
    leaveRequests,
    adminTasks,
    loading,
    summary,
    loadHrData,
  }
})
