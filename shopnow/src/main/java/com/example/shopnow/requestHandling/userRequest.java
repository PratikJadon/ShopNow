//package com.example.shopnow.requestHandling;
//
//import com.example.shopnow.Models.userModel;
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotBlank;
//import lombok.Getter;
//
//public class userRequest {
//
//    // Nested class for signup request
//    @Getter
//    public static class signupRequest {
//        @NotBlank(message = "Fullname cannot be blank.")
//        private String fullname;
//        @NotBlank(message = "Username cannot be blank.")
//        private String username;
//        @Email(message = "Please provide correct email.")
//        private String email;
//        @NotBlank(message = "Password cannot be blank.")
//        private String password;
//
//        // Constructor for signup request
//        public signupRequest(String fullname, String username, String email, String password) {
//            this.fullname = fullname;
//            this.username = username;
//            this.email = email;
//            this.password = password;
//        }
//
//        // Method to convert signup request to userModel object
//        public userModel toUserModel(){
//            return new userModel(fullname,username,email,password);
//        }
//    }
//
//    // Nested class for login request
//    public static class loginRequest {
//        @NotBlank(message = "Please provide email.")
//        private String password;
//
//        @NotBlank(message = "Please provide password.")
//        private String email;
//
//        // Constructor for login request
//        public loginRequest(String email, String password) {
//            this.email = email;
//            this.password = password;
//        }
//    }
//}
