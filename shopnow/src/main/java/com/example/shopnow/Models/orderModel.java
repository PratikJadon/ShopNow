package com.example.shopnow.Models;

import java.util.List;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "order")
@Slf4j
@Getter
@Setter
public class orderModel {
    @Id
    private String id;

    private String userId;

    private String userEmail;

    @NotNull(message = "Products list cannot be empty")
    private List<cartModel> products;

    @NotBlank(message = "Address cannot be null")
    private String address;
}
