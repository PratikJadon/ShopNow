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
    ResponseEntity signup(@Valid @RequestBody userModel user) {
        if (userService.isEmailUnique(user.getEmail())) {
            log.warn("User with this email already exists.");
            return ResponseEntity.ok().body(new HashMap<String, Object>() {{
                put("Success", false);
                put("Message", "User with this email already exists.");
            }});
        }
        if (userService.isUsernameUnique(user.getUsername())) {
            log.warn("User with this username already exists.");
            return ResponseEntity.ok().body(new HashMap<String, Object>() {{
                put("Success", false);
                put("Message", "User with this username already exists.");
            }});
        }
        userModel newUser = userService.registerUser(user);
        log.info("User Signup successful");
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            log.info("User Successfully Registered.");
            put("Success",true);
            put("Message", "User Successfully Registered");
            put("Id", newUser.getId());
            put("Token", userService.tokenGen(newUser.getId()));
        }});
    }
}
