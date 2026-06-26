package aaa.model_p;

import java.time.LocalDate;
import lombok.Data;

@Data
public class EmployeeDTO {

	// 직원 기본키입니다. DB에서는 employees.id와 연결됩니다.
	private Long id;

	// 직원 기본정보입니다.
	private String name;
	private String department;
	private String position;
	private String email;
	private LocalDate hireDate;

	// 직원 상세정보 화면에서 수정할 개인정보입니다.
	// 나중에 DB 컬럼을 만들 때 employees 테이블에 둘지 employee_profiles로 분리할지 정하면 됩니다.
	private String phone;
	private LocalDate birthDate;
	private String address;
	private String emergencyContact;
	private String employmentStatus;
}
