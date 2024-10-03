package com.pweb.study_and_sync.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        try {
            return loginTeacher(loginData);
        } catch (IllegalArgumentException e) {
            try {
                return loginStudent(loginData);
            } catch (NoResultException e2) {
                throw new NoResultException("No registered account with this email");
            }
        }
    }

    public User loginTeacher(LoginDTO loginData) throws NoResultException, IllegalArgumentException {
        return teacherRepository.findByEmail(loginData.email())
            .map(teacher -> {
                if (!checkPassword(loginData.password(), teacher.getPassword())) {
                    throw new IllegalArgumentException("Incorrect password for teacher");
                }
                return teacher;
            })
            .orElseThrow(() -> new NoResultException("No registered account with this email"));
    }

    public User loginStudent(LoginDTO loginData) throws NoResultException, IllegalArgumentException {
        return studentRepository.findByEmail(loginData.email())
            .map(student -> {
                if (!checkPassword(loginData.password(), student.getPassword())) {
                    throw new IllegalArgumentException("Incorrect password for student");
                }
                return student;
            })
            .orElseThrow(() -> new NoResultException("No registered account with this email"));
    }

    private boolean checkPassword(String rawPassword, String storedPassword) {
        return rawPassword.equals(storedPassword); 
    }
}
