package com.example.shopnow.Service;

import com.example.shopnow.Models.userModel;
import com.example.shopnow.Repository.userRepository;
import lombok.extern.slf4j.Slf4j;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Slf4j
@Service
public class userService {
    @Autowired
    private userRepository userRepo;

    public boolean registerUser(userModel user) {
        if (userRepo.findByEmail(user.getEmail()) != null) {
            log.warn("User already exists with this Email.");
            return true;
        }
        String hashpass = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashpass);
        System.out.println(userRepo.save(user).getId());
        user.setPassword(null);
        return false;
    }
}