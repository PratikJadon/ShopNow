package com.example.shopnow.Models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
