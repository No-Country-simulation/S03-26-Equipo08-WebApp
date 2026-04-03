package com.example.backend.modules.testimonial.services;

import com.example.backend.modules.testimonial.models.dtos.*;
import com.example.backend.modules.testimonial.models.entities.TestimonialStatus;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TestimonialService {
    TestimonialResponse getById(Long id);

    TestimonialResponse create(TestimonialRequest t);

    TestimonialResponse createPublic(Long categoryId, PublicTestimonialRequest t);

    TestimonialResponse update(Long id, TestimonialUpdateRequest t);

    void delete(Long id);

    Page<TestimonialResponse> findByFilters(Integer rating, Long categoryId, Long tagId, TestimonialStatus status, int page, int size);
}
