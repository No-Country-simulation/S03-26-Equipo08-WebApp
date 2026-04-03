package com.example.backend.modules.moderation.controllers;

import com.example.backend.modules.moderation.services.ModerationService;
import com.example.backend.modules.testimonial.models.dtos.TestimonialResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/testimonials")
@RequiredArgsConstructor
@Tag(name = "Moderation", description = "Moderacion de testimonios")
public class ModerationControllers {
    //Lo separo de testimonial para que la lógica de negocio
    // de moderación no ensucie el CRUD básico.

    private final ModerationService moderationService;

    @PostMapping("/approve/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Aprobar la publicacion de un testimonio")
    @PreAuthorize("hasRole('ADMIN')")
    public TestimonialResponse approve(@PathVariable Long id){
        return moderationService.approve(id);
    }

    @PostMapping("/reject/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Rechazar la publicacion de un testimonio")
    public TestimonialResponse reject(@PathVariable Long id,String rejectionReason){
        return moderationService.reject(id, rejectionReason);
    }
}
