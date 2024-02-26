package com.example.shopnow.Controller;

import com.example.shopnow.Models.cartModel;
import com.example.shopnow.Models.productModel;
import com.example.shopnow.Models.userModel;
import com.example.shopnow.Service.orderService;
import com.example.shopnow.Service.productService;
import com.example.shopnow.Service.userService;
import jakarta.servlet.ServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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


    @Autowired
    private orderService orderService;

    // Get products endpoint
    @GetMapping
    public ResponseEntity<HashMap<String,Object>> getProducts(@RequestParam(required = false) String sortPrice, @RequestParam(required = false) String gender, @RequestParam(required = false) String category, @RequestParam(required = false) String searchKey, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<productModel> products = prodService.findProducts(sortPrice, gender, category, searchKey, pageable);
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            put("Success", true);
            put("Data", products.getContent());
            put("totalPages", products.getTotalPages());
            put("pageNumber", products.getPageable().getPageNumber());
            put("size", products.getSize());
        }});
    }

//    Get cart size endpoint
    @GetMapping("/cartsize")
    ResponseEntity<HashMap<String,Object>> getCartSize(ServletRequest request) {
        String userid = request.getAttribute("user").toString();
        Optional<userModel> user = userService.findById(userid);
        List<cartModel> cart = user.get().getCart();
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            put("Success", true);
            put("CartSize", cart.size());
        }});
    }

    // Increase an item in cart by 1 endpoint
    @GetMapping("/addcart")
    public ResponseEntity<HashMap<String,Object>> addToCart(ServletRequest request, @RequestParam String productId) {
        String userid = request.getAttribute("user").toString();
        Optional<userModel> user = userService.findById(userid);
        List<cartModel> cart = user.get().getCart();
        boolean result = prodService.addtoCart(cart, productId);

        if (!result) {
            log.warn("Maximum amount for this products is already added.");
            return ResponseEntity.ok().body(new HashMap<String, Object>() {{
                put("Success", false);
                put("Message", "Max stock already added.");
                put("CartSize", cart.size());
            }});
        }

        user.get().setCart(cart);
        userService.updateUser(user.get());
        log.info("Item added to cart");
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            put("Success", true);
            put("Message", "Item added in cart.");
            put("CartSize", cart.size());
        }});
    }

    // Decrease an item from cart by 1endpoint to decrease products quantity in cart.
    @GetMapping("/deletecart")
    public ResponseEntity<HashMap<String,Object>> deleteFromCart(ServletRequest request, @RequestParam String productId) {
        String userid = request.getAttribute("user").toString();
        Optional<userModel> user = userService.findById(userid);
        List<cartModel> cart = user.get().getCart();
        boolean result = prodService.deleteFromCart(cart, productId);

        if (!result) {
            log.warn("Item you are removing doesn't exists in cart with id ->" + productId);
            return ResponseEntity.ok().body(new HashMap<String, Object>() {{
                put("Success", false);
                put("Message", "Item doesn't exists in cart.");
                put("CartSize", cart.size());
            }});
        }

        userService.updateUser(user.get());
        log.info("Item removed from cart with id ->" + productId);
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            put("Success", true);
            put("Message", "Item removed from cart.");
            put("CartSize", cart.size());
        }});
    }

    // Get cart with populated data endpoint
    @GetMapping("/getcart")
    public ResponseEntity<HashMap<String,Object>> getCart(ServletRequest request) {
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
        log.info("Cart is fetched with size -> " + populatedCart.size());
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            put("Products", populatedCart);
            put("Quantity", populatedCartQuantity);
        }}); // Return empty list with informative message
    }

    // Clear whole cart endpoint
    @GetMapping("/clearcart")
    public ResponseEntity<HashMap<String,Object>> clearCart(ServletRequest req) {
        String userid = req.getAttribute("user").toString();
        Optional<userModel> user = userService.findById(userid);
        List<cartModel> cart = new ArrayList<>();
        List<cartModel> oldCart = user.get().getCart();
        user.get().setCart(cart);
        userService.updateUser(user.get());
        log.info("User cart is successfully cleared.");
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            put("Success", true);
            put("Message", "Purchase done.");
            put("Cart",oldCart);
        }});
    }

    // Remove whole item from cart endpoint
    @GetMapping("/removeitem")
    public ResponseEntity<HashMap<String,Object>> removeItem(@RequestParam String productId, ServletRequest req) {
        String userid = req.getAttribute("user").toString();
        Optional<userModel> user = userService.findById(userid);
        List<cartModel> cart = user.get().getCart();
        Optional<cartModel> existingCartItem = cart.stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();
        existingCartItem.ifPresent(cart::remove);

        userService.updateUser(user.get());
        log.info("All Items are removed from cart successfully with id -> " + productId);
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            put("Success", true);
            put("Message", "Item removed.");
        }});
    }

//    Increase stock of a product by 1 endpoint
    @GetMapping("/incstock")
    public ResponseEntity<HashMap<String,Object>> increaseStock(@RequestParam String productId) throws Exception {
        Optional<productModel> prod = prodService.findById(productId);
        if (prod.isEmpty()) {
            log.error("Product stock cannot be increased.");
            return ResponseEntity.ok().body(new HashMap<String, Object>() {{
                put("Success", false);
                put("Message", "Product stock cannot be increased.");
            }});
        }
        prod.get().setTotalQuantity(prod.get().getTotalQuantity() + 1);
        prodService.save(prod.get());
        log.info("Product stock increased.");
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            put("Success", true);
            put("Message", "Product stock increased.");
        }});
    }

//    Decrease product stock by 1 endpoint
    @GetMapping("/decstock")
    public ResponseEntity<HashMap<String,Object>> decreaseStock(@RequestParam String productId) {
        Optional<productModel> prod = prodService.findById(productId);
        if (prod.isEmpty()) {
            log.error("Product stock cannot be decreased.");
            return ResponseEntity.ok().body(new HashMap<String, Object>() {{
                put("Success", false);
                put("Message", "Product stock cannot be decreased.");
            }});
        }
        if (prod.get().getTotalQuantity() <= 1) {
            prodService.delete(prod.get());
            log.info("Product stock decreased to 0 and removed.");
        } else {
            prod.get().setTotalQuantity(prod.get().getTotalQuantity() - 1);
            prodService.save(prod.get());
            log.info("Product stock decreased.");
        }
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            put("Success", true);
            put("Message", "Product stock decreased.");
        }});
    }

//    Remove all stocks of product endpoint
    @GetMapping("/remstock")
    public ResponseEntity<HashMap<String,Object>> removeStock(@RequestParam String productId) {
        Optional<productModel> prod = prodService.findById(productId);
        if (prod.isEmpty()) {
            log.error("Product stock cannot be removed.");
            return ResponseEntity.ok().body(new HashMap<String, Object>() {{
                put("Success", false);
                put("Message", "Product stock cannot be removed.");
            }});
        }
        prodService.delete(prod.get());
        log.info("Product stock removed.");
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            put("Success", true);
            put("Message", "Product stock removed.");
        }});
    }


//    Add a new product stock, and it doesn't let you add products that are already there endpoint
    @PostMapping("/addstock")
    public ResponseEntity<HashMap<String,Object>> addStock(@RequestBody @Valid productModel prod) {
        productModel checkprod = prodService.findbyTitle(prod.getTitle());
        if (checkprod != null) {
            log.info("Product already exists so cannot be re-added.");
            return ResponseEntity.ok().body(new HashMap<String, Object>() {{
                put("Success", false);
                put("Message", "Product already exists so cannot be re-added.");
            }});
        }

        log.info("Product added.");
        prodService.save(prod);
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            put("Success", true);
            put("Message", "Product added.");
        }});
    }
}
