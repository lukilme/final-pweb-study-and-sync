package com.pweb.study_and_sync.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pweb.study_and_sync.model.Teacher;

public interface TeacherRepository  extends JpaRepository<Teacher, Long> {

    Optional<Teacher> findByEmail(String email);
    
}
