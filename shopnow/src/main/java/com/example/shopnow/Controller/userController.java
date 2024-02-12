package com.example.shopnow.Controller;

import com.example.shopnow.Models.userModel;
import com.example.shopnow.Service.userService;
import io.micrometer.common.util.StringUtils;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
        if (userService.isEmailExist(user.getEmail())) {
            log.warn("User with this email already exists.");
            return ResponseEntity.ok().body(new HashMap<String, Object>() {{
                put("Success", false);
                put("Message", "User with this email already exists.");
            }});
        }
        if (userService.isUsernameExist(user.getUsername())) {
            log.warn("User with this username already exists.");
            return ResponseEntity.ok().body(new HashMap<String, Object>() {{
                put("Success", false);
                put("Message", "User with this username already exists.");
            }});
        }
        userModel newUser = userService.registerUser(user);
        log.info("User Signup successful with id " + newUser.getId());
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            log.info("User Successfully Registered.");
            put("Success",true);
            put("Message", "User Successfully Registered");
            put("Id", newUser);
            put("Token", userService.tokenGen(newUser));
        }});
    }

    @PostMapping("/login")
    ResponseEntity login(@RequestBody userModel user){
        if(StringUtils.isEmpty(user.getEmail()) || StringUtils.isEmpty(user.getPassword())){
            log.warn("Please provide Username and Password");
            return ResponseEntity.badRequest().body(new HashMap<String,Object>(){{
                put("Success",false);
                put("Message","Please provide Username and Password");
            }});
        }
        if(!userService.isEmailExist(user.getEmail())){
            log.warn("User Doesn't Exists");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new HashMap<String,Object>(){{
                put("Success",false);
                put("Message","User Doesn't Exists");
            }});
        }
        userModel loggedUser = userService.loginAuthPass(user);
        if(userService.loginAuthPass(user) == null){
            log.warn("Please provide correct password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new HashMap<String,Object>(){{
                put("Success",false);
                put("Message","Please provide correct password");
            }});
        }
        log.info("User logged in successfully with id " + loggedUser.getId());
        return ResponseEntity.ok().body(new HashMap<String,Object>(){{
            put("Success",true);
            put("Message","Logged in Successfully");
            put("Token",userService.tokenGen(loggedUser));
        }});

    }
}
