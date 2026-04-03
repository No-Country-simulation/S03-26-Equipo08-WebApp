package com.example.backend.modules.category.controllers;

import com.example.backend.modules.category.models.dtos.CategoryRequest;
import com.example.backend.modules.category.models.dtos.CategoryResponse;
import com.example.backend.modules.category.models.dtos.TagResponse;
import com.example.backend.modules.category.services.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Tag(name = "Categories", description = "Gestion de Categories")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Obtener category por id")
    public CategoryResponse getById(@PathVariable Long id){
        return categoryService.findById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Obtener todas las categories")
    public Page<CategoryResponse> findAll(
            @RequestParam(defaultValue = "0")int page,
            @RequestParam(defaultValue = "10")int size
    ){
        return categoryService.findAll(page, size);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crear una category nueva")
    @PreAuthorize("hasRole('ADMIN')")
    public CategoryResponse create(@Valid @RequestBody CategoryRequest categoryRequest){
        return categoryService.create(categoryRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Borrar category por id")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id){
        categoryService.delete(id);
    }

}
