package com.example.backend.modules.media.Repositories;

import com.example.backend.modules.media.models.entities.MediaAsset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<MediaAsset,Long> {

}
