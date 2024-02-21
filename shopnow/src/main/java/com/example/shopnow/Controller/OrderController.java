package com.example.shopnow.Controller;

import com.example.shopnow.Models.orderModel;
import com.example.shopnow.Repository.OrderRepository;
import com.example.shopnow.Service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/order")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody orderModel order) {
        try {
            // Validate and process the order data as needed
            orderService.placeOrder(order);

            // For simplicity, we'll just print the order details
            System.out.println("Received order: " + order);

            return new ResponseEntity<>("Order placed successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to place order", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<orderModel>> getAllOrders() {
        List<orderModel> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }



}

