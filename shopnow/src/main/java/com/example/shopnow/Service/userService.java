package com.example.shopnow.Service;

import com.example.shopnow.Models.userModel;
import com.example.shopnow.Repository.userRepository;
import com.example.shopnow.utils.jwtHelper;
import lombok.extern.slf4j.Slf4j;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Slf4j
@Service
public class userService {
    @Autowired
    private userRepository userRepo;

    @Autowired
    private jwtHelper jwtHelper;

    public Optional<userModel> findById(String id){
        return userRepo.findById(id);
    }

    public void updateUser(userModel user){
        userRepo.save(user);
    }

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
        return jwtHelper.tokenGen(user);
    }

    public boolean isEmailExist(String email) {
        return userRepo.findByEmail(email) != null;
    }

    public boolean isUsernameExist(String username) {
        return userRepo.findByUsername(username) != null;
    }
}