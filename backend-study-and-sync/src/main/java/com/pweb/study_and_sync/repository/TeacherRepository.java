package com.pweb.study_and_sync.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pweb.study_and_sync.model.Teacher;

@Repository
public interface TeacherRepository  extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByEmail(String email);    
}
