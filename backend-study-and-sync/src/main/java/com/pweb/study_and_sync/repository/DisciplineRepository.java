package com.pweb.study_and_sync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pweb.study_and_sync.model.Discipline;

@Repository
public interface DisciplineRepository extends JpaRepository<Discipline, Long> {
    
}
