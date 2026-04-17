package com.example.backend.modules.moderation.services;

import com.example.backend.modules.testimonial.models.dtos.TestimonialResponse;
import com.example.backend.modules.testimonial.models.entities.Testimonial;
import com.example.backend.modules.testimonial.models.entities.TestimonialStatus;
import com.example.backend.modules.testimonial.repositories.TestimonialRepository;
import com.example.backend.modules.testimonial.services.TestimonialServiceImpl;
import com.example.backend.shared.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ModerationServiceImpl implements ModerationService {

    private final TestimonialRepository testimonialRepository;
    private final TestimonialServiceImpl testimonialServiceImpl;

    @Override
    public TestimonialResponse approve(Long id) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Testimonio no encontrado."));

        switch (testimonial.getStatus()) {
            case PENDING:
                testimonial.setStatus(TestimonialStatus.PUBLISHED);
                testimonial.setPublishedAt(LocalDateTime.now());
                break;
            case PUBLISHED:
                throw new IllegalStateException("Este testimonio ya esta aprobado.");
            case REJECTED:
                throw new IllegalStateException("Este testimonio esta rechazado.");
        }
        Testimonial approveTestimonial=testimonialRepository.save(testimonial);

        return testimonialServiceImpl.toResponse(approveTestimonial);
    }

    @Override
    public TestimonialResponse reject(Long id,String rejectionReason) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Testimonio no encontrado."));

        switch (testimonial.getStatus()) {
            case PENDING:
                testimonial.setStatus(TestimonialStatus.REJECTED);
                testimonial.setRejectionReason(rejectionReason);
                break;
            case PUBLISHED:
                throw new IllegalStateException("Este testimonio ya esta aprobado.");
            case REJECTED:
                throw new IllegalStateException("Este testimonio esta rechazado.");
        }
        Testimonial rejectTestimonial=testimonialRepository.save(testimonial);

        return testimonialServiceImpl.toResponse(rejectTestimonial);
    }

}
