package com.example.shopnow.requestHandling;

import com.example.shopnow.Models.userModel;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

public class userRequest {
    @Getter
    public static class signupRequest {
        @NotBlank(message = "Fullname cannot be blank.")
        private String fullname;
        @NotBlank(message = "Username cannot be blank.")
        private String username;
        @Email(message = "Please provide correct email.")
        private String email;
        @NotBlank(message = "Password cannot be blank.")
        private String password;

        public signupRequest(String fullname, String username, String email, String password) {
            this.fullname = fullname;
            this.username = username;
            this.email = email;
            this.password = password;
        }

        public userModel toUserModel(){
            return new userModel(fullname,username,email,password);
        }
    }


    public static class loginRequest {

        @NotBlank(message = "Please provide email.")
        private String password;

        @NotBlank(message = "Please provide password.")
        private String email;

        public loginRequest(String email, String password) {
            this.email = email;
            this.password = password;
        }
    }
}
