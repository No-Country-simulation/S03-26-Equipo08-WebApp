package com.example.backend.modules.media.services.provider;

import com.example.backend.modules.media.models.entities.MediaAsset;
import com.example.backend.modules.media.models.entities.MediaProvider;
import com.example.backend.modules.testimonial.models.entities.Testimonial;

public interface MediaProviderService {

    MediaProvider getProvider();

    MediaAsset upload(Object request, Testimonial testimonial);

    void delete(MediaAsset mediaAsset);

}
