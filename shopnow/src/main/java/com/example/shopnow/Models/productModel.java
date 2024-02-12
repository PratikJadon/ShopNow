package com.example.shopnow.Models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
    import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
@Slf4j
@Getter
@Setter
public class productModel {

    @Id
    private String id;

    @NotBlank(message = "Title cannot be blank.")
    private String title;

    @NotBlank(message = "Photo url cannot be blank.")
    private String photos;

    private Object attributes;

    private String rating;
    @NotBlank(message = "Price cannot be blank.")
    private int price;

    private String category;
    private String gender;

//    public productModel(String username, String fullname, String email, String password) {
//        this.fullname = fullname;
//        this.password = password;
//        this.username = username;
//        this.email = email;
//    }
}
