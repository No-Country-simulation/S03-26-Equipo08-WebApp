package com.example.backend.modules.category.controllers;

import com.example.backend.modules.category.models.dtos.TagRequest;
import com.example.backend.modules.category.models.dtos.TagResponse;
import com.example.backend.modules.category.services.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
@Tag(name = "Tags", description = "Gestion de Tags")
public class TagController {

    private final TagService tagService;

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Obtener tag por id")
    public TagResponse getById(@PathVariable Long id){
        return tagService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crear un tag nuevo")
    @PreAuthorize("hasRole('ADMIN')")
    TagResponse create(@Valid @RequestBody TagRequest tagRequest){
        return tagService.create(tagRequest);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Obtener todos los tags")
    public Page<TagResponse> findAll(
            @RequestParam(defaultValue = "0")int page,
            @RequestParam(defaultValue = "10")int size
    ){
        return tagService.findAll(page, size);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Borrar tag por id")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id){
        tagService.delete(id);
    }
}
