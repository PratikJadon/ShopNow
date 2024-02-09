package com.example.shopnow.Controller;

import com.example.shopnow.Models.userModel;
import com.example.shopnow.requestHandling.userRequest;
import com.example.shopnow.Service.userService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class userController {

    @Autowired
    private userService userService;

    @PostMapping("/signup")
    ResponseEntity<String> signup(@RequestBody userModel user) {
        if(userService.registerUser(user)){
            return ResponseEntity.ok("User already exists with this Email.");
        }
        log.info("User Signup successful");
        return ResponseEntity.ok("Sign Up Successful for user: " + user.getFullname());
    }

//    @PostMapping("/login")
//    ResponseEntity<String> login(@RequestBody userModel user){
//
//    }
}
