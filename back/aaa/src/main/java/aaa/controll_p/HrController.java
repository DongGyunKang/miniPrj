package aaa.controll_p;

import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hr")
public class HrController {

	// 대시보드 상단 숫자 카드에 사용할 요약 정보입니다.
	// DB 연결 뒤에는 부서 수, 출근 인원, 승인대기 휴가 수를 쿼리해서 반환하면 됩니다.
	@GetMapping("/summary")
	public Map<String, Object> summary() {
		return Map.of(
				"modules", 5,
				"departments", 3,
				"todayAttendance", 4,
				"pendingLeaves", 2
		);
	}

	// 인사관리시스템의 메뉴/모듈 목록입니다.
	// 프론트 대시보드 카드와 네비게이션 설계의 기준 데이터입니다.
	@GetMapping("/modules")
	public List<Map<String, Object>> modules() {
		return List.of(
				Map.of(
						"key", "employees",
						"name", "직원 관리",
						"description", "직원 기본정보와 개인정보 변경을 관리합니다.",
						"route", "/employees",
						"status", "진행"
				),
				Map.of(
						"key", "departments",
						"name", "부서 관리",
						"description", "부서장, 소속 인원, 주요업무, 아침 보고서를 관리합니다.",
						"route", "/departments",
						"status", "진행"
				),
				Map.of(
						"key", "attendance",
						"name", "근태 관리",
						"description", "부서별 출근/결원 현황과 직원별 근태를 확인합니다.",
						"route", "/attendance",
						"status", "진행"
				),
				Map.of(
						"key", "leave",
						"name", "휴가 관리",
						"description", "휴가 종류를 선택해 신청하고 사용 현황을 확인합니다.",
						"route", "/leave",
						"status", "진행"
				),
				Map.of(
						"key", "admin",
						"name", "관리자 설정",
						"description", "권한, 공통코드, 시스템 기준값을 관리합니다.",
						"route", "/admin",
						"status", "예정"
				)
		);
	}

	// 부서 관리 샘플 데이터입니다.
	// members, mainTasks, morningReports 구조를 DB 테이블로 나누면:
	// departments, department_members, department_reports 정도로 분리할 수 있습니다.
	@GetMapping("/departments")
	public List<Map<String, Object>> departments() {
		return List.of(
				Map.of(
						"id", 1,
						"name", "인사팀",
						"manager", "Kim Admin",
						"members", List.of("Kim Admin", "Han Recruiter", "Choi HR", "Yoon Clerk"),
						"mainTasks", "채용 일정 관리, 인사기록 정리, 평가 운영",
						"morningReports", List.of(
								Map.of("id", 1, "date", "2026-06-26", "content", "신규 입사자 서류 점검과 휴가 신청 건 확인 예정")
						)
				),
				Map.of(
						"id", 2,
						"name", "개발팀",
						"manager", "Lee Staff",
						"members", List.of("Lee Staff", "Jung Dev", "Moon QA", "Seo Front"),
						"mainTasks", "인사관리 시스템 화면 개발, API 연동, 오류 수정",
						"morningReports", List.of(
								Map.of("id", 1, "date", "2026-06-26", "content", "직원 상세 화면과 부서 관리 화면 구조 점검")
						)
				),
				Map.of(
						"id", 3,
						"name", "운영팀",
						"manager", "Park User",
						"members", List.of("Park User", "Oh Operator", "Lim Support"),
						"mainTasks", "근태 데이터 확인, 사용자 문의 대응, 월간 운영 리포트 준비",
						"morningReports", List.of(
								Map.of("id", 1, "date", "2026-06-26", "content", "결원 인원 확인 후 부서장에게 공유")
						)
				)
		);
	}

	// 근태 관리 샘플 데이터입니다.
	// 프론트에서 department 기준으로 묶어서 출근/결원 숫자를 계산합니다.
	@GetMapping("/attendance")
	public List<Map<String, Object>> attendance() {
		return List.of(
				Map.of("id", 1, "employee", "Kim Admin", "department", "인사팀", "checkIn", "09:01", "checkOut", "18:04", "status", "출근"),
				Map.of("id", 2, "employee", "Han Recruiter", "department", "인사팀", "checkIn", "-", "checkOut", "-", "status", "결원"),
				Map.of("id", 3, "employee", "Lee Staff", "department", "개발팀", "checkIn", "09:18", "checkOut", "-", "status", "출근"),
				Map.of("id", 4, "employee", "Jung Dev", "department", "개발팀", "checkIn", "08:55", "checkOut", "18:10", "status", "출근"),
				Map.of("id", 5, "employee", "Park User", "department", "운영팀", "checkIn", "08:57", "checkOut", "18:02", "status", "출근"),
				Map.of("id", 6, "employee", "Oh Operator", "department", "운영팀", "checkIn", "-", "checkOut", "-", "status", "결원")
		);
	}

	// 휴가 관리 샘플 데이터입니다.
	// 휴가 종류, 시작일, 종료일, 사유, 승인상태를 표시합니다.
	@GetMapping("/leaves")
	public List<Map<String, Object>> leaves() {
		return List.of(
				Map.of("id", 1, "employee", "Kim Admin", "type", "연차", "startDate", "2026-07-03", "endDate", "2026-07-03", "reason", "개인 일정", "status", "승인대기"),
				Map.of("id", 2, "employee", "Lee Staff", "type", "오전반차", "startDate", "2026-07-08", "endDate", "2026-07-08", "reason", "병원 방문", "status", "승인"),
				Map.of("id", 3, "employee", "Park User", "type", "병가", "startDate", "2026-07-12", "endDate", "2026-07-13", "reason", "치료", "status", "검토")
		);
	}

	// 관리자 설정은 아직 세부 기능을 만들기 전이라 기본 작업 목록만 반환합니다.
	@GetMapping("/admin-tasks")
	public List<Map<String, Object>> adminTasks() {
		return List.of(
				Map.of("id", 1, "name", "직급 코드 관리", "owner", "인사팀", "status", "예정"),
				Map.of("id", 2, "name", "권한 그룹 관리", "owner", "관리자", "status", "설계"),
				Map.of("id", 3, "name", "휴가 기준일 설정", "owner", "인사팀", "status", "예정")
		);
	}

	// 부서 추가 API의 뼈대입니다.
	// 지금은 받은 값을 그대로 돌려주고 id만 임시로 붙입니다.
	@PostMapping("/departments")
	@ResponseStatus(HttpStatus.CREATED)
	public Map<String, Object> createDepartment(@RequestBody Map<String, Object> body) {
		return withGeneratedId(body);
	}

	// 부서 주요업무 수정 API의 뼈대입니다.
	// DB 연결 뒤에는 departments.main_tasks 같은 컬럼을 update하면 됩니다.
	@PostMapping("/departments/{id}/tasks")
	public Map<String, Object> updateDepartmentTasks(@PathVariable Long id, @RequestBody Map<String, Object> body) {
		return Map.of("id", id, "mainTasks", body.getOrDefault("mainTasks", ""));
	}

	// 아침 보고서 등록 API의 뼈대입니다.
	// DB 연결 뒤에는 department_reports 테이블에 insert하면 됩니다.
	@PostMapping("/departments/{id}/morning-reports")
	@ResponseStatus(HttpStatus.CREATED)
	public Map<String, Object> createMorningReport(@PathVariable Long id, @RequestBody Map<String, Object> body) {
		return Map.of(
				"id", System.currentTimeMillis(),
				"departmentId", id,
				"date", body.getOrDefault("date", ""),
				"content", body.getOrDefault("content", ""),
				"updateTasks", body.getOrDefault("updateTasks", false)
		);
	}

	// 휴가 신청 API의 뼈대입니다.
	// DB 연결 뒤에는 leave_requests 테이블에 insert하고 기본 상태를 '승인대기'로 두면 됩니다.
	@PostMapping("/leaves")
	@ResponseStatus(HttpStatus.CREATED)
	public Map<String, Object> createLeave(@RequestBody Map<String, Object> body) {
		Map<String, Object> result = withGeneratedId(body);
		result.put("status", "승인대기");
		return result;
	}

	// 아직 DB가 없으므로 임시 id를 붙여서 등록 결과처럼 반환하는 helper입니다.
	private Map<String, Object> withGeneratedId(Map<String, Object> body) {
		body.put("id", System.currentTimeMillis());
		return body;
	}
}
