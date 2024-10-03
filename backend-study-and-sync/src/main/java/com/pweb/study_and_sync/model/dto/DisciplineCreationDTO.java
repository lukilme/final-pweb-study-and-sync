
package com.pweb.study_and_sync.model.dto;
import java.time.LocalDateTime;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DisciplineCreationDTO(
    @NotNull Long idTeacher,
    @NotNull String name,
    @NotNull String description,
    @NotNull @Pattern(regexp = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", message = "Color format invalid") 
    String color,
    @NotNull LocalDateTime creationDate 
) {

}