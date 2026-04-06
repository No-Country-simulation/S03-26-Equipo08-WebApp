package com.example.backend.modules.category.services;

import com.example.backend.modules.auth.models.entities.User;
import com.example.backend.modules.category.models.dtos.CategoryRequest;
import com.example.backend.modules.category.models.dtos.CategoryResponse;
import com.example.backend.modules.category.models.dtos.CategoryUpdateRequest;
import org.springframework.data.domain.Page;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface CategoryService {
    List<CategoryResponse> findAll();
    CategoryResponse findById(Long id);
    CategoryResponse create(CategoryRequest categoryRequest);
    CategoryResponse update(Long id, CategoryUpdateRequest categoryUpdateRequest, User currentUser) throws AccessDeniedException;
    void delete(Long id);
    Page<CategoryResponse> findAll(int page, int size);
}
