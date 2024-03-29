package com.example.shopnow.Repository;

import com.example.shopnow.Models.userModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface userRepository extends MongoRepository<userModel, String> {
    // Additional custom queries can be added here if needed
    userModel findByEmail(String email);
    userModel findByUsername(String username);
}
