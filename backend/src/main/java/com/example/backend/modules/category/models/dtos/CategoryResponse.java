package com.example.backend.modules.category.models.dtos;

public record CategoryResponse(
        Long id,
        String name,
        String slug,
        String hexColor,
        String type,
        Long ownerId
) {
}
