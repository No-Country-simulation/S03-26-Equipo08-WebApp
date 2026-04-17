package com.example.backend.modules.category.services;

import com.example.backend.modules.category.models.dtos.TagRequest;
import com.example.backend.modules.category.models.dtos.TagResponse;
import com.example.backend.modules.category.models.entities.Tag;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Set;

public interface TagService {
    List<TagResponse> findAll();
    TagResponse findById(Long id);
    TagResponse create(TagRequest t);
    void delete(Long id);
    Page<TagResponse> findAll(int page, int size );
    Set<Tag> applyTags(Set<Long> tags);
}
