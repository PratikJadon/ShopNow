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

import java.util.ArrayList;
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

    // Get products endpoint
    @GetMapping
    public ResponseEntity getProduct(@RequestParam(required = false) String sortPrice, @RequestParam(required = false) String gender,@RequestParam(required = false) String category, @RequestParam(required = false) String searchKey, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<productModel> products = prodService.findProducts(sortPrice,gender, category, searchKey, pageable);
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            put("Success", true);
            put("Data", products);
            put("Size", products.size());
        }});
    }

    // Add to cart endpoint
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
            put("Message","Item added in cart with id -> " + productId);
        }});
    }

    // Delete from cart endpoint to decrease products quantity in cart.
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
            log.warn("Item you are removing doesn't exists in cart with id ->" + productId);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new HashMap<String,Object>(){{
                put("Success",true);
                put("Message","Item doesn't exists in cart.");
            }});
        }
        userService.updateUser(user.get());
        log.info("Item removed from cart with id ->" + productId);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new HashMap<String,Object>(){{
            put("Success",true);
            put("Message","Item removed from cart.");
        }});
    }

    // Get cart endpoint
    @GetMapping("/getcart")
    public ResponseEntity getCart(ServletRequest request){
        String userid = request.getAttribute("user").toString();
        Optional<userModel> user = userService.findById(userid);
        List<cartModel> cart = user.get().getCart();

        List<productModel> populatedCart = new ArrayList<>();
        List<Integer> populatedCartQuantity = new ArrayList<>();

        // Error handling: Ensure cart is not empty and handle potential failures
        if (cart != null && !cart.isEmpty()) {
            for (cartModel cartItem : cart) {
                try {
                    // Fetch product details using product ID
                    Optional<productModel> product = prodService.findById(cartItem.getProductId());
                    if (product.isEmpty()) {
                        // Handle missing product (log, skip, or provide default values)
                        System.out.println("Product with ID " + cartItem.getProductId() + " not found. Skipping...");
                        continue;
                    }
                    populatedCart.add(product.get());
                    populatedCartQuantity.add(cartItem.getQuantity());
                } catch (Exception e) {
                    // Handle other exceptions (network errors, invalid data, etc.)
                    System.err.println("Error fetching product details for ID " + cartItem.getProductId() + ": " + e.getMessage());
                }
            }
        }
        log.info("Cart is fetched with size ->" + populatedCart.size());
        return ResponseEntity.ok().body(new HashMap<String,Object>(){{
            put("Products",populatedCart);
            put("Quantity",populatedCartQuantity);
        }}); // Return empty list with informative message
    }

    // Clear cart endpoint
    @GetMapping("/clearcart")
    public ResponseEntity clearCart(ServletRequest req){
        String userid = req.getAttribute("user").toString();
        Optional<userModel> user = userService.findById(userid);
        List<cartModel> cart = new ArrayList<>();
        user.get().setCart(cart);
        userService.updateUser(user.get());
        log.info("User cart is successfully cleared.");
        return ResponseEntity.ok().body(new HashMap<String,Object>(){{
            put("Success",true);
            put("Message","Purchase done.");
        }});
    }

    // Remove item from cart endpoint
    @GetMapping("/removeitem")
    public ResponseEntity removeItem(@RequestParam String productId,ServletRequest req){
        String userid = req.getAttribute("user").toString();
        Optional<userModel> user = userService.findById(userid);
        List<cartModel> cart=  user.get().getCart();
        Optional<cartModel> existingCartItem = cart.stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();
        existingCartItem.ifPresent(cart::remove);

        userService.updateUser(user.get());
        log.info("All Items are removed from cart successfully with id -> "+ productId);
        return ResponseEntity.ok().body(new HashMap<String,Object>(){{
            put("Success",true);
            put("Message","Item removed.");
        }});
    }
}
