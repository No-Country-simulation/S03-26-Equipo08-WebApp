package com.example.backend.modules.testimonial.repositories;

import com.example.backend.modules.testimonial.models.entities.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TestimonialRepository extends JpaRepository<Testimonial,Long>,
        JpaSpecificationExecutor<Testimonial>{

}
