package com.pweb.study_and_sync.model.dto;

import jakarta.validation.constraints.NotNull;


public record LoginDTO(
    @NotNull String email,
    @NotNull String password
) {
    
}
