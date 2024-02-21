package com.example.shopnow.Models;
import java.util.List;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "order")
@Slf4j
@Getter
@Setter
public class orderModel {
    @Id
    private String id;

    private Shipping shipping;

        private Payment payment;
        private List<Product> products;

        // getters and setters

}
@Setter@Getter
class Shipping {
    private String address;
    private String zipcode;
    private String city;
    private String state;
}
@Setter@Getter
class Payment {
    private String cardNumber;}
@Setter@Getter
class Product {
    private String name;
    private double price;
    private int quantity;
}