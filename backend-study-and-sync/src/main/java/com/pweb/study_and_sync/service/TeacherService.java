package com.pweb.study_and_sync.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.pweb.study_and_sync.exception.ResourceNotFoundException;
import com.pweb.study_and_sync.model.Discipline;
import com.pweb.study_and_sync.model.Student;
import com.pweb.study_and_sync.model.Teacher;
import com.pweb.study_and_sync.model.dto.DisciplineCorrelationDTO;
import com.pweb.study_and_sync.repository.TeacherRepository;

import jakarta.transaction.Transactional;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    public Teacher save(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public Page<Teacher> findAll(PageRequest pageRequest) {
        return teacherRepository.findAll(pageRequest);
    }

    public Optional<Teacher> findById(Long id) {
        return teacherRepository.findById(id);
    }

    @Transactional
public void addStudentToDiscipline(DisciplineCorrelationDTO disciplineCorrelation) {
    StudentService studentService = new StudentService();
    Student student = studentService.findById(disciplineCorrelation.idStudent()).orElseThrow(() ->
         new ResourceNotFoundException("Student not found with this ID!")
    );

    DisciplineService disciplineService = new DisciplineService();
    Discipline discipline = disciplineService.findById(disciplineCorrelation.idDiscipline()).orElseThrow(() ->
         new ResourceNotFoundException("Discipline not found with this ID!")
    );

    if (!discipline.getStudents().contains(student)) {
        discipline.addStudent(student); 
    }

    if (!student.getDisciplines().contains(discipline)) {
        student.addDiscipline(discipline);  
    }
    }

    public Optional<Teacher> findByEmail(String email) {
        return teacherRepository.findByEmail(email);
    }

    public Optional<Set<Discipline>> getDisciplines(Long id) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        return teacher.map(Teacher::getDisciplines);
    }

    public Teacher update(Long id, Teacher teacher) {
        Optional<Teacher> existingTeacher = teacherRepository.findById(id);
        if (existingTeacher.isPresent()) {
            Teacher updatedTeacher = existingTeacher.get();
            updatedTeacher.setName(teacher.getName());
            updatedTeacher.setEmail(teacher.getEmail());
            updatedTeacher.setPassword(teacher.getPassword());
            updatedTeacher.setBirthday(teacher.getBirthday());
            updatedTeacher.setQualification(teacher.getQualification());
            return teacherRepository.save(updatedTeacher);
        }
        return null;
    }

    public void delete(Long id) {
        teacherRepository.deleteById(id);
    }
}
