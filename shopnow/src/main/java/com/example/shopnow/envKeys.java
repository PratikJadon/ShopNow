package com.example.shopnow;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class envKeys {
    // Value annotated fields to load environment properties
    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.tokenExpiry}")
    private long tokenExpiry;
}
