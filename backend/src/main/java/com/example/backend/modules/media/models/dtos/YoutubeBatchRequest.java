package com.example.backend.modules.media.models.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record YoutubeBatchRequest(
        @NotEmpty(message = "La lista de videos no puede estar vacía")
        @Valid //
        List<YoutubeRequest> videos
) {
}
