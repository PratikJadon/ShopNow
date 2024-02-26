package com.example.shopnow.Controller;

// Importing necessary classes
import com.example.shopnow.Models.orderModel;
import com.example.shopnow.Models.userModel;
import com.example.shopnow.Service.orderService;
import com.example.shopnow.Service.userService;
import jakarta.servlet.ServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@Slf4j // Annotation for logging
@RestController // Annotation to indicate that this class is a REST controller
@CrossOrigin(origins = "*") // Allowing requests from any origin, can be more restrictive in production
@RequestMapping("/api/order") // Base mapping for all endpoints in this controller
public class orderController {

    @Autowired // Autowiring userService bean
    private userService userService;

    @Autowired // Autowiring orderService bean
    private orderService orderService;

    // POST endpoint to create an order
    @PostMapping("/create")
    public ResponseEntity<HashMap<String,Object>> createOrder(ServletRequest request, @Valid @RequestBody orderModel order) {

        // Extracting user id from the request
        String userid = request.getAttribute("user").toString();

        // Finding the user by id
        Optional<userModel> user = userService.findById(userid);

        // Setting user id and email to the order
        order.setUserId(user.get().getId());
        order.setUserEmail(user.get().getEmail());

        // Saving the order
        orderService.save(order);

        // Returning success response
        return ResponseEntity.ok().body(new HashMap<String, Object>() {{
            put("Success", true);
            put("Message", "Order created.");
        }});
    }
}
