package com.example.backend.modules.category.models.dtos;

import jakarta.validation.constraints.NotBlank;

public record TagRequest(
        @NotBlank String name
) {
}
