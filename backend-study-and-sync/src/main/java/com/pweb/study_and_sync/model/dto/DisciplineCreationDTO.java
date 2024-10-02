package com.pweb.study_and_sync.model.dto;

import java.time.LocalDateTime;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;  


public record DisciplineCreationDTO(
    @NotNull Long idTeacher,
    @NotEmpty @Size(max = 100) String name,
    @NotNull String description,
    @NotNull String color,
    @NotNull LocalDateTime creationDate
) {
}