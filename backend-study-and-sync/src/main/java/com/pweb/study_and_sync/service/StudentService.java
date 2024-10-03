package com.pweb.study_and_sync.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.pweb.study_and_sync.model.Student;
import com.pweb.study_and_sync.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    
    @SuppressWarnings("unused")
    private final DisciplineService disciplineService;

    @Autowired
    public StudentService(StudentRepository studentRepository, DisciplineService disciplineService) {
        this.studentRepository = studentRepository;
        this.disciplineService = disciplineService;
    }

    public Student save(Student student) {
        return studentRepository.save(student);
    }

    public Page<Student> findAll(PageRequest pageRequest) {
        return studentRepository.findAll(pageRequest);
    }

    public Optional<Student> findById(Long id) {
        return studentRepository.findById(id);
    }

    public Optional<Student> findByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    public Student update(Long id, Student student) {
        Optional<Student> existingStudent = studentRepository.findById(id);
        if (existingStudent.isPresent()) {
            Student updatedStudent = existingStudent.get();
            updatedStudent.setName(student.getName());
            updatedStudent.setEmail(student.getEmail());
            updatedStudent.setPassword(student.getPassword());
            updatedStudent.setBirthday(student.getBirthday());
            updatedStudent.setCourse(student.getCourse());
            updatedStudent.setSemester(student.getSemester());
            return studentRepository.save(updatedStudent);
        }
        return null;
    }

    public void delete(Long id) {
        studentRepository.deleteById(id);
    }
}
