package com.example.backend.modules.category.repositories;

import com.example.backend.modules.category.models.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Optional<Category> findByPublicToken(String publicToken);
}
