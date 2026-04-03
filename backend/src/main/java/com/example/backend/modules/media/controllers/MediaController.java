package com.example.backend.modules.media.controllers;

import com.example.backend.modules.media.models.dtos.MediaUploadResponse;
import com.example.backend.modules.media.models.dtos.YoutubeBatchRequest;
import com.example.backend.modules.media.models.dtos.YoutubeRequest;
import com.example.backend.modules.media.services.MediaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
@Tag(name = "Media", description = "Gestión de archivos multimedia y enlaces externos para testimonios")
public class MediaController {

    private final MediaService mediaService;

    @PostMapping("/upload/{testimonialId}")
    @Operation(summary = "Subir archivo individual a Cloudinary")
    @PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
    public ResponseEntity<MediaUploadResponse> uploadFile(
            @RequestParam("file") MultipartFile file,
            @PathVariable Long testimonialId) {

        return ResponseEntity.ok(this.mediaService.uploadCloudinary(file, testimonialId));
    }

    @PostMapping("/youtube/{testimonialId}")
    @Operation(summary = "Registrar un video de YouTube")
    @PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
    public ResponseEntity<MediaUploadResponse> addYoutube(
            @RequestBody @Valid YoutubeRequest request,
            @PathVariable Long testimonialId) {

        return ResponseEntity.ok(this.mediaService.addYoutube(request, testimonialId));
    }

    @PostMapping("/upload-batch/{testimonialId}")
    @Operation(summary = "Subida de múltiles archivos a Cloudinary")
    @PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
    public ResponseEntity<List<MediaUploadResponse>> uploadBatch(
            @RequestParam("files") List<MultipartFile> files,
            @PathVariable Long testimonialId) {
        return ResponseEntity.ok(mediaService.uploadMultipleCloudinary(files, testimonialId));
    }

    @PostMapping("/youtube-batch/{testimonialId}")
    @Operation(summary = "Registro de múltiples videos de YouTube")
    @PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
    public ResponseEntity<List<MediaUploadResponse>> addYoutubeBatch(
            @RequestBody @Valid YoutubeBatchRequest request,
            @PathVariable Long testimonialId) {
        return ResponseEntity.ok(mediaService.addMultipleYoutube(request, testimonialId));
    }


}
