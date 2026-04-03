package com.example.backend.modules.category.repositories;

import com.example.backend.modules.category.models.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag,Long> {

}
