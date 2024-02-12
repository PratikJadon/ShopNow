package com.example.shopnow.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.shopnow.Models.userModel;
import com.example.shopnow.Repository.userRepository;
import lombok.extern.slf4j.Slf4j;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import com.example.shopnow.envKeys;

import java.util.Date;


@Slf4j
@Service
public class userService {
    @Autowired
    private userRepository userRepo;
    @Autowired
    private envKeys envkey;

    public userModel loginAuthPass(userModel user) {
        if(BCrypt.checkpw(user.getPassword(), userRepo.findByEmail(user.getEmail()).getPassword())){
            return userRepo.findByEmail(user.getEmail());
        }
        return null;
    }

    public userModel registerUser(userModel user) {
        String hashpass = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashpass);
        userModel newUser = userRepo.save(user);
        user.setPassword(null);
        newUser.setPassword(null);
        return newUser;
    }

    public String tokenGen(userModel user) {
        String key = envkey.getSecretKey();
        Algorithm algo = Algorithm.HMAC256(key);
        return JWT.create().withSubject(user.getId()).withIssuer(user.getFullname()).withExpiresAt(new Date(System.currentTimeMillis() + 300_000)).sign(algo);
    }

    public boolean isEmailExist(String email) {
        return userRepo.findByEmail(email) != null;
    }

    public boolean isUsernameExist(String username) {
        return userRepo.findByUsername(username) != null;
    }
}