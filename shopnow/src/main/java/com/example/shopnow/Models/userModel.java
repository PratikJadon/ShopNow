package com.example.shopnow.Models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
@Slf4j
@Getter
@Setter
public class userModel {

    @Id
    private String id;

    @NotBlank(message = "FullName cannot be blank.")
    private String fullname;

    @NotBlank(message = "Password cannot be blank.")
    private String password;

    @Email(message = "Please provide correct email.")
    @NotBlank(message = "Email cannot be blank.")
    private String email;

    @NotBlank(message = "Username cannot be blank.")
    private String username;

    public userModel(String username, String fullname, String email, String password) {
        this.fullname = fullname;
        this.password = password;
        this.username = username;
        this.email = email;
    }
}
