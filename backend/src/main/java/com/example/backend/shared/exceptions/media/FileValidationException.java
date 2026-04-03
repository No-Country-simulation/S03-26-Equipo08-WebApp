package com.example.backend.shared.exceptions.media;

public class FileValidationException extends MediaUploadException {
    public FileValidationException(String message) {
        super(message);
    }
}