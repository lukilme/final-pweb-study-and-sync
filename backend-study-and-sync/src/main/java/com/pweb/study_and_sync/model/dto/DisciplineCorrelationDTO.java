package com.pweb.study_and_sync.model.dto;

import jakarta.validation.constraints.NotNull;

public record DisciplineCorrelationDTO (
    @NotNull Long idTeacher,
    @NotNull Long idStudent,
    @NotNull Long idDiscipline
) {

}