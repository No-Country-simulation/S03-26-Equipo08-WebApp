package com.example.backend.modules.testimonial.models.entities;

import com.example.backend.modules.category.models.entities.Category;
import com.example.backend.modules.category.models.entities.Tag;
import com.example.backend.modules.media.models.entities.MediaAsset;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "testimonials")
@Builder
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String authorName;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String authorRole; // ej: "Alumno - Curso de Java"

    @Min(0)
    @Max(5)
    private Integer rating;//de 0 a 5

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default //estado del testimonio(pendiente, borrador, publicado o rechazado)
    private TestimonialStatus status = TestimonialStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany
    @JoinTable(
            name = "testimonial_tags",
            joinColumns = @JoinColumn(name = "testimonial_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    @Builder.Default
    private Set<Tag> tags = new HashSet<>();

    @OneToMany(mappedBy = "testimonial", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<MediaAsset> mediaAssets = new HashSet<>();

    private String rejectionReason;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime publishedAt;
}
