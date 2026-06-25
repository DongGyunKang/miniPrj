package aaa.model_p;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class EmployeeDAO {

	private final JdbcTemplate jdbcTemplate;

	public EmployeeDAO(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public List<EmployeeDTO> list() {
		return jdbcTemplate.query("""
				select id, name, department, position, email, hire_date
				from employees
				order by id
				""", this::mapRow);
	}

	public Optional<EmployeeDTO> detail(Long id) {
		List<EmployeeDTO> result = jdbcTemplate.query("""
				select id, name, department, position, email, hire_date
				from employees
				where id = ?
				""", this::mapRow, id);

		return result.stream().findFirst();
	}

	public EmployeeDTO insert(EmployeeDTO dto) {
		LocalDate hireDate = dto.getHireDate() == null ? LocalDate.now() : dto.getHireDate();

		return jdbcTemplate.queryForObject("""
				insert into employees (name, department, position, email, hire_date)
				values (?, ?, ?, ?, ?)
				returning id, name, department, position, email, hire_date
				""",
				this::mapRow,
				dto.getName(),
				dto.getDepartment(),
				dto.getPosition(),
				dto.getEmail(),
				Date.valueOf(hireDate)
		);
	}

	private EmployeeDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
		EmployeeDTO dto = new EmployeeDTO();
		dto.setId(rs.getLong("id"));
		dto.setName(rs.getString("name"));
		dto.setDepartment(rs.getString("department"));
		dto.setPosition(rs.getString("position"));
		dto.setEmail(rs.getString("email"));
		dto.setHireDate(rs.getObject("hire_date", LocalDate.class));
		return dto;
	}
}
