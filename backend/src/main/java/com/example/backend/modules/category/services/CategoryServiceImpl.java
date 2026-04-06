package com.example.backend.modules.category.services;

import com.example.backend.modules.auth.models.entities.Role;
import com.example.backend.modules.auth.models.entities.User;
import com.example.backend.modules.auth.services.AuthService;
import com.example.backend.modules.category.models.dtos.CategoryRequest;
import com.example.backend.modules.category.models.dtos.CategoryResponse;
import com.example.backend.modules.category.models.dtos.CategoryUpdateRequest;
import com.example.backend.modules.category.models.entities.Category;
import com.example.backend.modules.category.repositories.CategoryRepository;
import com.example.backend.shared.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final AuthService authService;

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
        User user=authService.findById(categoryRequest.ownerId());
        Category category=categoryRepository.save(toEntity(categoryRequest,user));
        return toResponse(category);
    }

    @Override
    public CategoryResponse update(Long id, CategoryUpdateRequest categoryUpdateRequest, User currentUser) throws AccessDeniedException {

        Category c=categoryRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("category not found"));

        if(!currentUser.getRole().equals(Role.ADMIN)
                && !c.getOwner().getId().equals(currentUser.getId())){
            throw new AccessDeniedException("Acceso denegado.");
        }

        c.setName(categoryUpdateRequest.name());
        c.setSlug(categoryUpdateRequest.slug());
        c.setType(categoryUpdateRequest.type());

        return toResponse(categoryRepository.save(c));
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
                c.getType().name(),
                c.getOwner().getId()
        );
    }
    private Category toEntity(CategoryRequest request,User user) {

        return Category.builder()
                .name(request.name())
                .slug(request.slug())
                .type(request.type())
                .owner(user)
                .build();
    }
}
