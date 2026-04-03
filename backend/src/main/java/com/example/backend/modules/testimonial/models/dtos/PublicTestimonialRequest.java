package com.example.backend.modules.testimonial.models.dtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PublicTestimonialRequest(
        String content,

        @NotBlank(message = "El nombre del autor es obligatorio")
        String authorName,

        @NotBlank(message = "El cargo/rol es obligatorio")
        String authorRole,//ej: alumno - Curso Java

        @NotNull @Min(0) @Max(5)
        Integer rating //calificacion del 0 a 5
) {
}
