package com.pweb.study_and_sync.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pweb.study_and_sync.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByEmail(String email);
    
}