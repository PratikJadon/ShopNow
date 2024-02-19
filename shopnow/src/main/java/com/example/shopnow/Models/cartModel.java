package com.example.shopnow.Models;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cart")
@Slf4j
@Getter
@Setter
public class cartModel {
    @NotBlank(message = "Cart must have amount of products in it.")
    private int quantity;

    private String productId;

    public cartModel(String productId,int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }
}
