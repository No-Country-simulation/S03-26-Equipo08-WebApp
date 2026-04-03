package com.example.backend.modules.category.services;

import com.example.backend.modules.category.models.dtos.CategoryRequest;
import com.example.backend.modules.category.models.dtos.CategoryResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> findAll();
    CategoryResponse findById(Long id);
    CategoryResponse create(CategoryRequest categoryRequest);
    void delete(Long id);
    Page<CategoryResponse> findAll(int page, int size);
}
