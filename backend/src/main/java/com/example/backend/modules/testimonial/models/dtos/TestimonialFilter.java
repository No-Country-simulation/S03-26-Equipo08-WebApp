package com.example.backend.modules.testimonial.models.dtos;

import com.example.backend.modules.testimonial.models.entities.TestimonialStatus;

public record TestimonialFilter(
        Integer rating,
        Long categoryId,
        Long tagId,
        TestimonialStatus status
) {
}
