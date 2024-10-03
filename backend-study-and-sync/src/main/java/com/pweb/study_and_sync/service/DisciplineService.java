package com.pweb.study_and_sync.service;

import com.pweb.study_and_sync.model.Discipline;
import com.pweb.study_and_sync.model.Teacher;
import com.pweb.study_and_sync.model.dto.DisciplineCreationDTO;
import com.pweb.study_and_sync.repository.DisciplineRepository;
import com.pweb.study_and_sync.validator.DisciplineValidator;
import com.pweb.study_and_sync.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class DisciplineService {
    
    private final DisciplineRepository disciplineRepository;
    
    private final TeacherService teacherService;

    @SuppressWarnings("unused")
    private final StudentService studentService;
    
    @Autowired
    public DisciplineService(DisciplineRepository disciplineRepository,@Lazy TeacherService teacherService, @Lazy StudentService studentService) {
        this.disciplineRepository = disciplineRepository;
        this.teacherService = teacherService;
        this.studentService = studentService;
    }
    
    private static final Logger logger = LoggerFactory.getLogger(DisciplineService.class);
    public List<Discipline> findAll() {
        logger.info("Buscando todas as disciplinas");
        return disciplineRepository.findAll();
    }

    public Optional<Discipline> findById(Long id) {
        logger.info("Buscando disciplina com id: {}", id);
        return disciplineRepository.findById(id);
    }

    @Transactional
    public Discipline update(Discipline disciplineToUpdate) {
        logger.info("Atualizando disciplina com id: {}", disciplineToUpdate.getId());
        
        Optional<Discipline> existingDiscipline = disciplineRepository.findById(disciplineToUpdate.getId());
        if (existingDiscipline.isEmpty()) {
            logger.warn("Disciplina com id: {} não encontrada", disciplineToUpdate);
            throw new ResourceNotFoundException("Disciplina não encontrada para o id: " + disciplineToUpdate.getId());
        }
      
        teacherService.findById(disciplineToUpdate.getTeacher().getId())
            .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado para o id: " + disciplineToUpdate.getTeacher().getId()));

        DisciplineValidator.validateDiscipline(disciplineToUpdate);
        return disciplineRepository.save(disciplineToUpdate);
    }

    @Transactional
    public Discipline save(DisciplineCreationDTO disciplineToCreate) {
        logger.info("Salvando nova disciplina: {}", disciplineToCreate.name());

        Teacher teacherOfDiscipline = teacherService.findById(disciplineToCreate.idTeacher())
            .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado para o id: " + disciplineToCreate.idTeacher()));

        Discipline newDiscipline = new Discipline(
            teacherOfDiscipline,
            disciplineToCreate.name(),
            disciplineToCreate.description(),
            disciplineToCreate.color(),
            disciplineToCreate.creationDate()
        );
        DisciplineValidator.validateDiscipline(newDiscipline);
        return disciplineRepository.save(newDiscipline);
    }

    public void deleteById(Long id) {
        logger.info("Deletando disciplina com id: {}", id);
        if (!disciplineRepository.existsById(id)) {
            logger.warn("Tentativa de deletar disciplina com id: {} que não existe", id);
            throw new ResourceNotFoundException("Disciplina não encontrada para o id: " + id);
        }
        disciplineRepository.deleteById(id);
    }
}
