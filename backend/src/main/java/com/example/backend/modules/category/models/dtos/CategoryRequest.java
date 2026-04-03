package com.example.backend.modules.category.models.dtos;

import com.example.backend.modules.category.models.entities.CategoryType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CategoryRequest(
        @NotBlank String name,
        @NotBlank String slug,//por ej: marketing-digital o bootcamp-frontend. Esto es mas que nada para urls mas legibles
        @NotNull CategoryType type
) {
}
