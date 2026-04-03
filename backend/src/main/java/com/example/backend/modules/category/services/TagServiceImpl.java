package com.example.backend.modules.category.services;

import com.example.backend.modules.category.models.dtos.TagRequest;
import com.example.backend.modules.category.models.dtos.TagResponse;
import com.example.backend.modules.category.models.entities.Tag;
import com.example.backend.modules.category.repositories.TagRepository;
import com.example.backend.shared.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public List<TagResponse>findAll(){
        List<Tag> tags = tagRepository.findAll();
        return tags.stream().map(this::toResponse)
                .toList();
    }

    @Override
    public TagResponse findById(Long id){
        Tag tag = tagRepository.findById(id)
                .orElseThrow(()->new RuntimeException("no se encontro el id "+id));
        return toResponse(tag);
    }

    @Override
    public TagResponse create(TagRequest t){
        Tag tag=tagRepository.save(toEntity(t));
        return toResponse(tag);
    }

    @Override
    public void delete(Long id){
        tagRepository.deleteById(id);
    }

    @Override
    public Page<TagResponse>findAll(int page, int size ){
        Pageable pageable=PageRequest.of(page,size);
        return tagRepository.findAll(pageable)
                .map(this::toResponse);
    }

    public Set<Tag> applyTags(Set<Long> tags){
        Set<Tag> tagSet=new HashSet<>();
        for(Long id:tags){
            Tag tag=tagRepository.findById(id)
                    .orElseThrow(()->new ResourceNotFoundException("no se encontro el tag con id "+id));
            tagSet.add(tag);
        }
        return tagSet;
    }

    public TagResponse toResponse(Tag t) {
        return new TagResponse(
                t.getId(),
                t.getName()
        );
    }

    private Tag toEntity(TagRequest request) {
        return Tag.builder()
                .name(request.name())
                .build();
    }

}
