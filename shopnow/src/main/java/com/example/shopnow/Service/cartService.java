//package com.example.shopnow.Service;
//
//import com.example.shopnow.Models.cartModel;
//import com.example.shopnow.Models.userModel;
//import com.example.shopnow.Repository.cartRepository;
//import com.example.shopnow.Repository.userRepository;
//import com.example.shopnow.utils.jwtHelper;
//import lombok.extern.slf4j.Slf4j;
//import org.mindrot.jbcrypt.BCrypt;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//
//
//@Slf4j
//@Service
//public class cartService {
//    @Autowired
//    private cartRepository cartRepo;
//
//    public cartModel findCart(String user){
//        return cartRepo.findByUser(user);
//    }
//
//    public void updateCart(cartModel cart){
//        cartRepo.save(cart);
//    }
//}