package com.example.backend.modules.media.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record YoutubeRequest(
        @NotBlank String youtubeUrl
) {
}
