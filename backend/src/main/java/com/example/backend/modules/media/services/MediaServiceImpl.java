package com.example.backend.modules.media.services;


import com.example.backend.modules.media.Repositories.MediaRepository;
import com.example.backend.modules.media.models.dtos.MediaUploadResponse;
import com.example.backend.modules.media.models.dtos.YoutubeBatchRequest;
import com.example.backend.modules.media.models.dtos.YoutubeRequest;
import com.example.backend.modules.media.models.entities.MediaAsset;
import com.example.backend.modules.media.models.entities.MediaProvider;
import com.example.backend.modules.media.services.provider.MediaProviderService;
import com.example.backend.modules.testimonial.models.entities.Testimonial;
import com.example.backend.modules.testimonial.repositories.TestimonialRepository;
import com.example.backend.shared.exceptions.ResourceNotFoundException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class MediaServiceImpl implements MediaService {

    private final Map<MediaProvider, MediaProviderService> providers;
    private final TestimonialRepository testimonialRepository;
    private final MediaRepository mediaRepository;

    public MediaServiceImpl(
            List<MediaProviderService> providerList,
            TestimonialRepository testimonialRepository,
            MediaRepository mediaRepository
    ) {

        this.testimonialRepository = testimonialRepository;
        this.mediaRepository = mediaRepository;

        this.providers = providerList.stream()
                .collect(Collectors.toMap(
                        MediaProviderService::getProvider,
                        Function.identity()
                ));
    }

    private MediaProviderService getProvider(MediaProvider provider) {

        MediaProviderService service = this.providers.get(provider);

        if (service == null) {
            throw new RuntimeException("Provider no soportado: " + provider);
        }

        return service;
    }

    @Override
    //@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
    public MediaUploadResponse uploadCloudinary(MultipartFile file, Long testimonialId) {
        Testimonial testimonial = this.testimonialRepository.findById(testimonialId)
                .orElseThrow(() -> new ResourceNotFoundException(("Testimonial no encontrado")));

        MediaProviderService provider = getProvider(MediaProvider.CLOUDINARY);

        MediaAsset media = provider.upload(file, testimonial);

        MediaAsset savedAsset = this.mediaRepository.save(media);

        return new MediaUploadResponse(
            savedAsset.getId(),
            savedAsset.getUrl(),
            savedAsset.getProvider().toString()
        );
    }

    @Override
    //@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
    @Transactional
    public List<MediaUploadResponse> uploadMultipleCloudinary(List<MultipartFile> files, Long testimonialId) {

        Testimonial testimonial = this.testimonialRepository.findById(testimonialId)
                .orElseThrow(() -> new ResourceNotFoundException(("Testimonial no encontrado")));

        MediaProviderService provider = getProvider(MediaProvider.CLOUDINARY);
        List<MediaAsset> uploadedAssets = new ArrayList<>();

        try {
            for (MultipartFile file : files) {
                MediaAsset asset = provider.upload(file, testimonial);
                uploadedAssets.add(asset);
            }

            List<MediaAsset> savedAssets = this.mediaRepository.saveAll(uploadedAssets);

            return savedAssets.stream()
                    .map(asset -> new MediaUploadResponse(
                            asset.getId(),
                            asset.getUrl(),
                            asset.getProvider().toString()
                    ))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            for (MediaAsset asset : uploadedAssets) {
                provider.delete(asset);
            }
            throw new RuntimeException("Error en la subida múltiple. Se canceló todo el proceso: " + e.getMessage());
        }
    }

    @Override
    //@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
    public MediaUploadResponse addYoutube(YoutubeRequest request, Long testimonialId) {
        Testimonial testimonial = this.testimonialRepository.findById(testimonialId)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial no encontrado"));

        MediaProviderService provider = getProvider(MediaProvider.YOUTUBE);

        MediaAsset mediaAsset = provider.upload(request.youtubeUrl(), testimonial);

        MediaAsset savedAsset = this.mediaRepository.save(mediaAsset);

        return new MediaUploadResponse(
            savedAsset.getId(),
            savedAsset.getUrl(),
            savedAsset.getProvider().toString()
        );
    }

    @Override
    //@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
    @Transactional
    public List<MediaUploadResponse> addMultipleYoutube(YoutubeBatchRequest request, Long testimonialId) {

        Testimonial testimonial = this.testimonialRepository.findById(testimonialId)
                .orElseThrow(() -> new ResourceNotFoundException(("Testimonial no encontrado")));

        MediaProviderService provider = getProvider(MediaProvider.YOUTUBE);

        List<MediaAsset> assetsToSave = request.videos().stream()
                .map(video -> provider.upload(video.youtubeUrl(), testimonial))
                .toList();

        List<MediaAsset> savedAssets = this.mediaRepository.saveAll(assetsToSave);

        return savedAssets.stream()
                .map(asset -> new MediaUploadResponse(
                        asset.getId(),
                        asset.getUrl(),
                        asset.getProvider().toString()
                ))
                .toList();
    }

    @Override
    //@PreAuthorize("hasRole('ADMIN')")
    public void deleteMedia(Long mediaId) {
        MediaAsset media = this.mediaRepository.findById(mediaId)
                .orElseThrow(() -> new ResourceNotFoundException(("Media no encontrada")));

        MediaProviderService provider = getProvider(media.getProvider());

        provider.delete(media);

        this.mediaRepository.delete(media);
    }

    @Override
    public List<MediaAsset> getByTestimonial(Long testimonialId) {
        return List.of();
    }

}
