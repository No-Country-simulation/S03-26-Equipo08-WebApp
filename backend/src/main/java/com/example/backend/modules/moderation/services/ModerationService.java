package com.example.backend.modules.moderation.services;

import com.example.backend.modules.testimonial.models.dtos.TestimonialResponse;

public interface ModerationService {
    TestimonialResponse approve(Long id);
    TestimonialResponse reject(Long id,String rejectionReason);
}