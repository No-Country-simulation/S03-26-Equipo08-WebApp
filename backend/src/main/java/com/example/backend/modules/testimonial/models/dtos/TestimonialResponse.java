package com.example.backend.modules.testimonial.models.dtos;

import java.time.LocalDateTime;
import java.util.Set;

public record TestimonialResponse(
        Long id,
        String content,
        String authorName,
        String authorRole,
        Integer rating,
        String status,
        String categoryName,
        Set<String> tags,
        Set<MediaAssetResponse> mediaAssets,
        LocalDateTime createdAt,
        LocalDateTime publishedAt
) {
    public record MediaAssetResponse(
            Long id,
            String url,
            String provider
    ) {}
}
