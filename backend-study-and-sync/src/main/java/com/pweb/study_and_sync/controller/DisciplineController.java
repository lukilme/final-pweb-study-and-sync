package com.pweb.study_and_sync.controller;

import com.pweb.study_and_sync.model.Discipline;
import com.pweb.study_and_sync.service.DisciplineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/disciplines")
public class DisciplineController {

    @Autowired
    private DisciplineService disciplineService;

    @GetMapping
    public ResponseEntity<List<Discipline>> getAllDisciplines() {
        List<Discipline> disciplines = disciplineService.findAll();
        return ResponseEntity.ok(disciplines);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Discipline> getDisciplineById(@PathVariable Long id) {
        Optional<Discipline> discipline = disciplineService.findById(id);
        return discipline.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Discipline> createDiscipline(@RequestBody Discipline discipline) {
        Discipline savedDiscipline = disciplineService.save(discipline);
        return ResponseEntity.ok(savedDiscipline);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Discipline> updateDiscipline(@PathVariable Long id, @RequestBody Discipline updatedDiscipline) {
        Optional<Discipline> existingDiscipline = disciplineService.findById(id);
        if (existingDiscipline.isPresent()) {
            updatedDiscipline.setId(id); 
            Discipline savedDiscipline = disciplineService.save(updatedDiscipline);
            return ResponseEntity.ok(savedDiscipline);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiscipline(@PathVariable Long id) {
        disciplineService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
