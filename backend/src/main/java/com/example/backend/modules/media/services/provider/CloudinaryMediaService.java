package com.example.backend.modules.media.services.provider;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.backend.modules.media.models.entities.MediaAsset;
import com.example.backend.modules.media.models.entities.MediaProvider;
import com.example.backend.modules.testimonial.models.entities.Testimonial;
import com.example.backend.shared.exceptions.media.FileValidationException;
import com.example.backend.shared.exceptions.media.MediaUploadException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CloudinaryMediaService implements MediaProviderService {

    private final Cloudinary cloudinary;
    static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of("jpg", "jpeg", "png", "pdf", "doc", "docx", "xls", "xlsx", "mp4");

    @Override
    public MediaProvider getProvider() {
        return MediaProvider.CLOUDINARY;
    }

    private String getExtension(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        return StringUtils.getFilenameExtension(originalFilename);
    }

    private void validateFile(MultipartFile file) {

        if (file.isEmpty()) {
            throw new FileValidationException("El archivo no puede estar vacío");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new FileValidationException("El archivo excede el límite permitido de 10MB");
        }

        String extension = getExtension(file);
        if (extension == null || !ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new FileValidationException("Extensión de archivo no permitida: ." + extension);
        }
    }

    @Override
    public MediaAsset upload(Object request, Testimonial testimonial) {

        if (!(request instanceof MultipartFile file)) {
            throw new FileValidationException("No se recibió un archivo válido para procesar.");
        }

        validateFile(file);

        try {
            Map options = ObjectUtils.asMap(
                    "resource_type", "auto",
                    "type", "upload",
                    "folder", "testimonials/id_" + testimonial.getId() ,
                    "public_id", "file_" + System.currentTimeMillis()
            );

            Map uploadResult = this.cloudinary.uploader().upload(
                    file.getBytes(),
                    options
            );

            String url = (String) uploadResult.get("secure_url");
            String publicId = (String) uploadResult.get("public_id");

            return MediaAsset.builder()
                    .url(url)
                    .publicId(publicId)
                    .provider(MediaProvider.CLOUDINARY)
                    .testimonial(testimonial)
                    .build();
        } catch (IOException e) {
            throw new MediaUploadException("Error técnico al procesar el archivo para Cloudinary", e);
        }

    }

    @Override
    public void delete(MediaAsset mediaAsset) {
        try {
            this.cloudinary.uploader().destroy(
                    mediaAsset.getPublicId(),
                    ObjectUtils.emptyMap()
            );
        } catch (IOException e) {
            throw new MediaUploadException("No se pudo eliminar el archivo en Cloudinary", e);
        }
    }
}
