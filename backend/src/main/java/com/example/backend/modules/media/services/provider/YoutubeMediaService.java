package com.example.backend.modules.media.services.provider;

import com.example.backend.modules.media.models.entities.MediaAsset;
import com.example.backend.modules.media.models.entities.MediaProvider;
import com.example.backend.modules.testimonial.models.entities.Testimonial;
import com.example.backend.shared.exceptions.media.FileValidationException;
import org.springframework.stereotype.Service;

@Service
public class YoutubeMediaService implements MediaProviderService {

    @Override
    public MediaProvider getProvider() {
        return MediaProvider.YOUTUBE;
    }

    @Override
    public MediaAsset upload(Object request, Testimonial testimonial) {

        if (!(request instanceof String url)) {
            throw new IllegalArgumentException("El proveedor de YouTube requiere una URL en formato String.");
        }

        if (url.isBlank()) {
            throw new FileValidationException("La URL de YouTube no puede estar vacía.");
        }

        return MediaAsset.builder()
                .url(url)
                .provider(MediaProvider.YOUTUBE)
                .testimonial(testimonial)
                .build();
    }

    @Override
    public void delete(MediaAsset mediaAsset) {

    }

}
