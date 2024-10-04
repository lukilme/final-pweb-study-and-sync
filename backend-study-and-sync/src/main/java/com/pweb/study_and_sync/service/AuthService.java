package com.pweb.study_and_sync.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pweb.study_and_sync.model.Student;
import com.pweb.study_and_sync.model.Teacher;
import com.pweb.study_and_sync.model.User;
import com.pweb.study_and_sync.model.dto.LoginDTO;
import com.pweb.study_and_sync.repository.StudentRepository;
import com.pweb.study_and_sync.repository.TeacherRepository;

import jakarta.persistence.NoResultException;

@Service
public class AuthService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired 
    private StudentRepository studentRepository;

    public User loginWithFallback(LoginDTO loginData) throws NoResultException, IllegalArgumentException {
        System.out.println(loginData);
        try {
            return loginTeacher(loginData);
        } catch (NoResultException e) {
            return loginStudent(loginData); 
        }
    }

    public User loginTeacher(LoginDTO loginData) throws NoResultException, IllegalArgumentException {
        return teacherRepository.findByEmail(loginData.emailLoginField())
            .map(teacher -> validatePassword(loginData.passwordLoginField(), teacher.getPassword(), "teacher"))
            .orElseThrow(() -> new NoResultException("No teacher account registered with this email"));
    }

    public User loginStudent(LoginDTO loginData) throws NoResultException, IllegalArgumentException {
        return studentRepository.findByEmail(loginData.emailLoginField())
            .map(student -> validatePassword(loginData.passwordLoginField(), student.getPassword(), "student"))
            .orElseThrow(() -> new NoResultException("No student account registered with this email"));
    }

    private User validatePassword(String rawPassword, String storedPassword, String userType) {
        if (!checkPassword(rawPassword, storedPassword)) {
            throw new IllegalArgumentException("Incorrect password for " + userType);
        }
        return userType.equals("teacher") ? new Teacher() : new Student();  // exemplo de retorno
    }

    private boolean checkPassword(String rawPassword, String storedPassword) {
        return rawPassword.equals(storedPassword);  // Substitua por hash de senha se necessário
    }
}
