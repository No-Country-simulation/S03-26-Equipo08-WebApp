package com.example.backend.modules.testimonial.services;

import com.example.backend.modules.testimonial.models.entities.Testimonial;
import com.example.backend.modules.testimonial.models.entities.TestimonialStatus;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

public class TestimonialSpecification {

    //esta clase usa specifaction de jpa para armar consulta sql.
    //sirve para crear filtros dinamicamente segun lo que mande el usuario.

    public static Specification<Testimonial> hasRating(Integer rating) {
        return (root, query, cb) ->
                rating == null ? null : cb.equal(root.get("rating"), rating);
    }

    public static Specification<Testimonial> hasStatus(TestimonialStatus status) {
        return (root, query, cb) ->
                status == null ? null : cb.equal(root.get("status"), status);
    }

    public static Specification<Testimonial> hasCategory(Long categoryId) {
        return (root, query, cb) ->
                categoryId == null ? null :
                        cb.equal(root.get("category").get("id"), categoryId);
    }

    public static Specification<Testimonial> hasTag(Long tagId) {
        return (root, query, cb) -> {
            if (tagId == null) return null;

            query.distinct(true);
            Join<Object, Object> tags = root.join("tags");
            return cb.equal(tags.get("id"), tagId);
        };
    }
}
