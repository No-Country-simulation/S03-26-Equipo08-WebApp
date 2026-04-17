package com.example.backend.modules.media.models.entities;

import com.example.backend.modules.testimonial.models.entities.Testimonial;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "media_assets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaAsset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String url;

    private String publicId; // ID en Cloudinary para poder eliminarlo

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MediaProvider provider;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "testimonial_id", nullable = false)
    private Testimonial testimonial;
}
