package com.example.shopnow.Repository;

import com.example.shopnow.Models.productModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface productRepository extends MongoRepository<productModel, String> {
    // Additional custom queries can be added here if needed
    Page<productModel> findByCategory(String category, Pageable page);
}
