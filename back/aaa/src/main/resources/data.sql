insert into employees (name, department, position, email, hire_date)
values
    ('Kim Admin', 'HR', 'Manager', 'admin@mymini.local', '2026-01-02'),
    ('Lee Staff', 'Development', 'Engineer', 'staff@mymini.local', '2026-02-03'),
    ('Park User', 'Operations', 'Coordinator', 'user@mymini.local', '2026-03-04')
on conflict (email) do nothing;
