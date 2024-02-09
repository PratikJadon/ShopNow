package com.example.shopnow;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class envKeys {
    @Value("${jwt.secretKey}")
    private String secretKey;

    public String getSecretKey() {
        return secretKey;
    }
}
