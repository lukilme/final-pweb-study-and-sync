package com.pweb.study_and_sync.validator;

import com.pweb.study_and_sync.exception.BadRequestException;
import com.pweb.study_and_sync.model.Discipline;

import java.time.LocalDateTime;

public class DisciplineValidator {
    private static final Integer NAME_MIN = 5;
    private static final Integer NAME_MAX = 64;
    private static final Integer DESCRIPTION_MAX = 64;
    private static final String COLOR_REGEX = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";

    public static void validateDiscipline(Discipline disciplinaToValidate){
        DisciplineValidator.checkName(disciplinaToValidate.getName());
        DisciplineValidator.checkColor(disciplinaToValidate.getColor());
        DisciplineValidator.checkDescription(disciplinaToValidate.getDescription());
        DisciplineValidator.checkCreationDate(disciplinaToValidate.getCreationDate());
    }

    private static void checkName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new BadRequestException("The name cannot be empty or null!");
        }
        if (name.length() < DisciplineValidator.NAME_MIN) {
            throw new BadRequestException("The name is too short! Minimum size is " + DisciplineValidator.NAME_MIN + " characters.");
        }
        if (name.length() > DisciplineValidator.NAME_MAX) {
            throw new BadRequestException("The name is too long! Maximum size is " + DisciplineValidator.NAME_MAX + " characters.");
        }
    }

    private static void checkColor(String color) {
        if (color == null || color.trim().isEmpty()) {
            throw new BadRequestException("The color cannot be empty or null!");
        }

        if (color == null || !color.matches(DisciplineValidator.COLOR_REGEX)) {
            throw new BadRequestException("The color must be a valid hexadecimal code, e.g., #FFFFFF or #FFF.");
        }
    }

    private static void checkDescription(String description) {
        if (description != null && description.length() > DESCRIPTION_MAX) {
            throw new BadRequestException("The description is too long! Maximum size is 255 characters.");
        }
    }

    private static void checkCreationDate(LocalDateTime creationDate) {
        if (creationDate == null) {
            throw new BadRequestException("The creation date cannot be null!");
        }
        if (creationDate.isAfter(LocalDateTime.now())) {
            throw new BadRequestException("The creation date cannot be in the future!");
        }
    }
}
