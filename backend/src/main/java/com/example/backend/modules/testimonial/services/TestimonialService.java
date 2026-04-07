package com.example.backend.modules.testimonial.services;

import com.example.backend.modules.testimonial.models.dtos.*;
import com.example.backend.modules.testimonial.models.entities.TestimonialStatus;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TestimonialService {
    TestimonialResponse getById(Long id);

    TestimonialResponse create(TestimonialRequest t);

    TestimonialResponse update(Long id, TestimonialUpdateRequest t);

    void delete(Long id);

    PublicTestimonialInfoResponse getPublicInfo(String publicToken);

    TestimonialResponse createPublic(String publicToken, PublicTestimonialRequest t);

    Page<TestimonialResponse> findByFilters(Integer rating, Long categoryId, Long tagId, TestimonialStatus status, int page, int size);
}
