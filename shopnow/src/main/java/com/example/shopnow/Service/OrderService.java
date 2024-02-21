package com.example.shopnow.Service;

import com.example.shopnow.Models.orderModel;
import com.example.shopnow.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class OrderService {
    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public void placeOrder(orderModel order) {
        orderRepository.save(order);
    }

    public List<orderModel> getAllOrders() {
        return orderRepository.findAll();
    }
}
