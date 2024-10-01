package com.pweb.study_and_sync.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pweb.study_and_sync.model.Discipline;

public interface DisciplineRepository extends JpaRepository<Discipline, Long> {
    
}
