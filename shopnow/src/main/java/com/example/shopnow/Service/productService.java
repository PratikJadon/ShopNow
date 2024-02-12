package com.example.shopnow.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.shopnow.Models.productModel;
import com.example.shopnow.Models.userModel;
import com.example.shopnow.Repository.productRepository;
import com.example.shopnow.Repository.userRepository;
import lombok.extern.slf4j.Slf4j;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;


@Slf4j
@Service
public class productService {
    @Autowired
    private productRepository productRepo;

    public Page<productModel> getProduct(Pageable page){
        return productRepo.findAll(page);
    }

    public Page<productModel> getProductByCategory(String category,Pageable page){
        return productRepo.findByCategory(category,page);
    }
}