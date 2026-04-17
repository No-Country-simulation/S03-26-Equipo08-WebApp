package com.example.backend.modules.media.services;

import com.example.backend.modules.media.models.dtos.MediaUploadResponse;
import com.example.backend.modules.media.models.dtos.YoutubeBatchRequest;
import com.example.backend.modules.media.models.dtos.YoutubeRequest;
import com.example.backend.modules.media.models.entities.MediaAsset;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MediaService {

    MediaUploadResponse uploadCloudinary(MultipartFile file, Long testimonialId);
    List<MediaUploadResponse> uploadMultipleCloudinary(List<MultipartFile> files, Long testimonialId);

    MediaUploadResponse addYoutube(YoutubeRequest request, Long testimonialId);
    List<MediaUploadResponse> addMultipleYoutube(YoutubeBatchRequest request, Long testimonialId);

    void deleteMedia(Long mediaId);

    List<MediaAsset> getByTestimonial(Long testimonialId);

}
