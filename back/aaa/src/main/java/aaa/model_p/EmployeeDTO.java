package aaa.model_p;

import java.time.LocalDate;
import lombok.Data;

@Data
public class EmployeeDTO {

	private Long id;
	private String name;
	private String department;
	private String position;
	private String email;
	private LocalDate hireDate;
}
