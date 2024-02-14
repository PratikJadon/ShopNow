package com.example.shopnow.Controller;

import com.example.shopnow.Models.cartModel;
import com.example.shopnow.Models.productModel;
import com.example.shopnow.Models.userModel;
import com.example.shopnow.Service.productService;
import com.example.shopnow.Service.userService;
import jakarta.servlet.ServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
public class productController {
    @Autowired
    private productService prodService;
    @Autowired
    private userService userService;

    @GetMapping
    public ResponseEntity getProduct(@RequestParam(required = false) String sortPrice, @RequestParam(required = false) String category, @RequestParam(required = false) String searchKey, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<productModel> products = prodService.findProducts(sortPrice, category, searchKey, pageable);
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            put("Success", true);
            put("Data", products);
            put("Size", products.size());
        }});
    }

    @GetMapping("/addcart")
    public ResponseEntity addToCart(ServletRequest request, @RequestParam String productId) {
        String userid = request.getAttribute("user").toString();
        Optional<userModel> user = userService.findById(userid);
        List<cartModel> cart = user.get().getCart();

        Optional<cartModel> existingCartItem = cart.stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();

        if (existingCartItem.isPresent()) {
            // Increase quantity of existing item
            existingCartItem.get().setQuantity(existingCartItem.get().getQuantity() + 1);
        } else {
            // Add new item to cart
            cart.add(new cartModel(productId, 1));
        }
        userService.updateUser(user.get());
        log.info("Item added to cart");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new HashMap<String,Object>(){{
            put("Success",true);
            put("Message","Item added in cart.");
        }});
    }

    @GetMapping("/deletecart")
    public ResponseEntity deleteFromCart(ServletRequest request, @RequestParam String productId) {
        String userid = request.getAttribute("user").toString();
        Optional<userModel> user = userService.findById(userid);
        List<cartModel> cart = user.get().getCart();

        Optional<cartModel> existingCartItem = cart.stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();
        if (existingCartItem.isPresent()) {
            if (existingCartItem.get().getQuantity() > 1) {
                existingCartItem.get().setQuantity(existingCartItem.get().getQuantity() - 1);
            } else {
                cart.remove(existingCartItem.get());
            }
        } else {
            log.warn("Item you are removing doesn't exists in cart.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new HashMap<String,Object>(){{
                put("Success",true);
                put("Message","Item doesn't exists in cart.");
            }});
        }
        userService.updateUser(user.get());
        log.info("Item removed from cart.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new HashMap<String,Object>(){{
            put("Success",true);
            put("Message","Item removed from cart.");
        }});
    }

}
