<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.List" %>
<%@ page import="aaa.model_p.EmployeeDTO" %>
<%
    List<EmployeeDTO> employees = (List<EmployeeDTO>) request.getAttribute("employees");
%>
<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Employees</title>
</head>
<body>
    <h1>Employees</h1>
    <nav>
        <a href="/">Home</a>
        <a href="/api/employees">Employees API</a>
    </nav>

    <table border="1" cellpadding="8" cellspacing="0">
        <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Email</th>
            <th>Hire Date</th>
        </tr>
        </thead>
        <tbody>
        <% if (employees != null) { %>
            <% for (EmployeeDTO employee : employees) { %>
                <tr>
                    <td><%= employee.getId() %></td>
                    <td><%= employee.getName() %></td>
                    <td><%= employee.getDepartment() %></td>
                    <td><%= employee.getPosition() %></td>
                    <td><%= employee.getEmail() %></td>
                    <td><%= employee.getHireDate() %></td>
                </tr>
            <% } %>
        <% } %>
        </tbody>
    </table>
</body>
</html>
