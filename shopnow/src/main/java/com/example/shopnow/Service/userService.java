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

    // Method to find a user by its ID
    public Optional<userModel> findById(String id){
        return userRepo.findById(id);
    }

    // Method to update user details
    public void updateUser(userModel user){
        userRepo.save(user);
    }

    // Method to authenticate user login by password
    public userModel loginAuthPass(userModel user) {
        if(BCrypt.checkpw(user.getPassword(), userRepo.findByEmail(user.getEmail()).getPassword())){
            return userRepo.findByEmail(user.getEmail());
        }
        return null;
    }

    // Method to register a new user
    public userModel registerUser(userModel user) {
        String hashpass = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashpass);
        userModel newUser = userRepo.save(user);
        user.setPassword(null); // Clear sensitive information before returning
        newUser.setPassword(null); // Clear sensitive information before returning
        return newUser;
    }

    // Method to generate JWT token for user authentication
    public String tokenGen(userModel user) {
        return jwtHelper.tokenGen(user);
    }

    // Method to check if an email already exists in the system
    public boolean isEmailExist(String email) {
        return userRepo.findByEmail(email) != null;
    }

    // Method to check if a username already exists in the system
    public boolean isUsernameExist(String username) {
        return userRepo.findByUsername(username) != null;
    }
}
