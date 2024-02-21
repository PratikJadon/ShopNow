package com.example.shopnow.CustomExecption;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
class ExpectionHanlder {

    // Exception handler for MethodArgumentNotValidException
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        log.warn("Validation Error");
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        log.warn("ArgumentNotValid -> " + errors);
        return ResponseEntity.badRequest().body(errors);
    }

    // Exception handler for IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgException(IllegalArgumentException er) {
        return ResponseEntity.badRequest().body(er.getMessage());
    }

    // Exception handler for HttpMessageNotReadableException
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity handleHttpMessageNotReadableException(HttpMessageNotReadableException er){
        return ResponseEntity.badRequest().body(new HashMap<String,String>(){{
            put("Message",er.getLocalizedMessage());
        }});
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity customException(Exception er){
        return ResponseEntity.badRequest().body(new HashMap<String,Object>(){{
            put("Success",false);
            put("ErrorType",er.getClass());
            put("Message",er.getLocalizedMessage());
        }});
    }
}
