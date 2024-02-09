package com.example.shopnow.Controller;

import com.example.shopnow.Models.userModel;
import com.example.shopnow.Service.userService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class userController {

    @Autowired
    private userService userService;

    @PostMapping("/signup")
    void signup(@Valid @RequestBody userModel user) {
        if (userService.isEmailUnique(user.getEmail())) {
            ResponseEntity.ok("User with this email already exists.");
            return;
        }
        if (userService.isUsernameUnique(user.getUsername())) {
            ResponseEntity.ok("User with this username already exists.");
            return;
        }
        userModel newUser = userService.registerUser(user);
        log.info("User Signup successful");
        ResponseEntity.ok().body(new HashMap<String,String>(){{
            put("Message","User Registered with id " + newUser.getId());
        }});
    }
}
