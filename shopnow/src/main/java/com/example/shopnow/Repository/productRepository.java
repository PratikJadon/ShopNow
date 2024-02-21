package com.example.shopnow.Repository;

import com.example.shopnow.Models.productModel;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface productRepository extends MongoRepository<productModel, String> {
    productModel findByTitle(String title);
}
