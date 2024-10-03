package com.pweb.study_and_sync.controller;

import com.pweb.study_and_sync.model.Discipline;
import com.pweb.study_and_sync.model.dto.DisciplineCreationDTO;
import com.pweb.study_and_sync.service.DisciplineService;
import com.pweb.study_and_sync.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/discipline")
public class DisciplineController {
    private static final Logger logger = LoggerFactory.getLogger(DisciplineController.class);

    @Autowired
    private DisciplineService disciplineService;

    @GetMapping
    public ResponseEntity<List<Discipline>> getAllDisciplines() {
        logger.info("Buscando todas as disciplinas");
        List<Discipline> disciplines = disciplineService.findAll();
        return ResponseEntity.ok(disciplines);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Discipline> getDisciplineById(@PathVariable Long id) {
        logger.info("Buscando disciplina com id: {}", id);
        Discipline discipline = disciplineService.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Disciplina não encontrada para o id: " + id));
        return ResponseEntity.ok(discipline);
    }

    @PostMapping
    public ResponseEntity<Discipline> createDiscipline(@RequestBody DisciplineCreationDTO discipline) {
        logger.info("Criando nova disciplina: {}", discipline.name());
        Discipline savedDiscipline = disciplineService.save(discipline);
        return ResponseEntity.ok(savedDiscipline);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Discipline> updateDiscipline(@PathVariable Long id, @RequestBody DisciplineCreationDTO updatedDiscipline) {
        logger.info("Atualizando disciplina com id: {}", id);
        Discipline discipline = disciplineService.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Disciplina não encontrada para o id: " + id));

        Discipline savedDiscipline = disciplineService.update(discipline);

        return ResponseEntity.ok(savedDiscipline);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiscipline(@PathVariable Long id) {
        logger.info("Deletando disciplina com id: {}", id);
        disciplineService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
