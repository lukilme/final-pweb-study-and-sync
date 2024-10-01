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

    @Autowired
    private StudentRepository studentRepository;

    // Método para salvar um estudante
    public Student save(Student student) {
        return studentRepository.save(student);
    }

    // Método para listar todos os estudantes com paginação
    public Page<Student> findAll(PageRequest pageRequest) {
        return studentRepository.findAll(pageRequest);
    }

    // Método para buscar um estudante pelo ID
    public Optional<Student> findById(Long id) {
        return studentRepository.findById(id);
    }

    // Método para buscar um estudante pelo email
    public Optional<Student> findByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    // Método para atualizar os dados de um estudante
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

    // Método para deletar um estudante
    public void delete(Long id) {
        studentRepository.deleteById(id);
    }
}
