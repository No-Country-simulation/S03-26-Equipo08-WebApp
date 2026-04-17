package com.example.backend.shared.exceptions.media;

public class MediaUploadException extends RuntimeException {
    public MediaUploadException(String message) {
        super(message);
    }
    public MediaUploadException(String message, Throwable cause) {
        super(message, cause);
    }
}