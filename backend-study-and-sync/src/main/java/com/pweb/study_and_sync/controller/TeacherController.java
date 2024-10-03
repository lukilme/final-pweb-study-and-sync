package com.pweb.study_and_sync.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pweb.study_and_sync.exception.ResourceNotFoundException;
import com.pweb.study_and_sync.model.Discipline;
import com.pweb.study_and_sync.model.Teacher;
import com.pweb.study_and_sync.model.dto.DisciplineCorrelationDTO;
import com.pweb.study_and_sync.service.TeacherService;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @PostMapping
    public ResponseEntity<Teacher> create(@RequestBody Teacher teacher) {
        try {
            Teacher savedTeacher = teacherService.save(teacher);
            return ResponseEntity.ok(savedTeacher);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/add-student")
    public ResponseEntity<Void> addStudentToDiscipline(@RequestBody DisciplineCorrelationDTO disciplineCorrelation) {
        try {
            teacherService.addStudentToDiscipline(disciplineCorrelation);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body(null); 
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping
    public ResponseEntity<Page<Teacher>> listAll(@RequestParam int page, @RequestParam int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Teacher> teachers = teacherService.findAll(pageRequest);
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/{id}/disciplines")
    public ResponseEntity<Set<Discipline>> getDisciplines(@PathVariable Long id) {
        try {
            Optional<Set<Discipline>> disciplines = teacherService.getDisciplines(id);
            return disciplines.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Teacher> findById(@PathVariable Long id) {
        Optional<Teacher> teacher = teacherService.findById(id);
        return teacher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Teacher> update(@PathVariable Long id, @RequestBody Teacher teacher) {
        try {
            Teacher updatedTeacher = teacherService.update(id, teacher);
            return ResponseEntity.ok(updatedTeacher);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            teacherService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
