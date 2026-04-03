package com.example.backend.modules.media.models.dtos;

public record MediaUploadResponse(
        Long id,
        String url,
        String provider
) {
}
