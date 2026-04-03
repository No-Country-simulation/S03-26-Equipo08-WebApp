package com.example.backend.modules.category.services;

import com.example.backend.modules.category.models.dtos.CategoryRequest;
import com.example.backend.modules.category.models.dtos.CategoryResponse;
import com.example.backend.modules.category.models.entities.Category;
import com.example.backend.modules.category.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponse>findAll(){
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(this::toResponse)
                .toList();
    }

    @Override
    public CategoryResponse findById(Long id){
        Category category=categoryRepository.findById(id)
                .orElseThrow(()->new RuntimeException("no se encontro id "+id));
        return toResponse(category);
    }

    @Override
    public CategoryResponse create(CategoryRequest categoryRequest){
        Category category=categoryRepository.save(toEntity(categoryRequest));
        return toResponse(category);
    }

    @Override
    public void delete(Long id){
        categoryRepository.deleteById(id);
    }

    public Category applyCategory(Long id){
        return categoryRepository.findById(id)
                .orElseThrow(()->new RuntimeException("no se encontro id "+id));
    }

    @Override
    public Page<CategoryResponse> findAll(int page, int size){
        Pageable pageable= PageRequest.of(page,size);
        return categoryRepository.findAll(pageable)
                .map(this::toResponse);
    }

    public CategoryResponse toResponse(Category c) {
        return new CategoryResponse(
                c.getId(),
                c.getName(),
                c.getSlug(),
                c.getType().name()
        );
    }
    private Category toEntity(CategoryRequest request) {
        return Category.builder()
                .name(request.name())
                .slug(request.slug())
                .type(request.type())
                .build();
    }
}
