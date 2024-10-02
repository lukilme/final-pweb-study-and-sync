INSERT INTO tb_teacher (name, email, password, birthday, qualification) VALUES
('John Smith', 'john.smith@school.com', 'password123', '1980-05-14', 'PhD in Mathematics'),
('Anna Johnson', 'anna.johnson@school.com', 'securePass', '1978-11-23', 'MSc in Physics'),
('Paul Brown', 'paul.brown@school.com', 'paulBrownPass', '1985-03-30', 'PhD in Chemistry'),
('Susan Green', 'susan.green@school.com', 'susGreenPass', '1990-07-22', 'MSc in Computer Science'),
('Michael White', 'michael.white@school.com', 'whiteSecure123', '1975-09-12', 'PhD in History');

INSERT INTO tb_student (name, email, password, birthday, course, semester) VALUES
('Alice Walker', 'alice.walker@student.com', 'alicePass123', '2001-01-15', 'Computer Science', 3),
('Bob Miller', 'bob.miller@student.com', 'bobStrongPassword', '1999-08-29', 'Physics', 5),
('Catherine Taylor', 'catherine.taylor@student.com', 'catTaylorPass', '2000-06-20', 'Mathematics', 4),
('David Harris', 'david.harris@student.com', 'davidSuperPass', '2002-03-11', 'History', 2),
('Emily Scott', 'emily.scott@student.com', 'emilyPass', '2001-12-02', 'Chemistry', 6);

INSERT INTO tb_discipline (id_teacher, name, description, color, creationDate) VALUES
(1, 'Mathematics 101', 'Introduction to Algebra and Geometry', '#FF5733', '2023-10-01'),
(2, 'Physics 201', 'Advanced Physics - Thermodynamics', '#33FF57', '2023-10-01'),
(3, 'Chemistry 102', 'Basic Organic Chemistry', '#3357FF', '2023-10-01'),
(4, 'Computer Science 301', 'Algorithms and Data Structures', '#FF33A1', '2023-10-01'),
(5, 'History 101', 'World History from 1800', '#57FF33', '2023-10-01');
