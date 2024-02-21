package com.example.shopnow.Models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
@Slf4j
@Getter
@Setter
public class productModel {

    @Id
    private String id;

    @NotBlank(message = "Title cannot be blank.")
    private String title;

    @NotBlank(message = "Photo url cannot be blank.")
    private String photos;

    private Object attributes;

    private String rating;
    @NotNull(message = "Price cannot be blank.")
    private int price;

    private String category;
    private String gender;
    
    @NotNull(message = "Quantity cannot be blank.")
    private int totalQuantity;

    public productModel(String title,String photos,Object attributes,String rating,int price,String category,String gender,int totalQuantity){
        this.title = title;
        this.photos = photos;
        this.attributes = attributes;
        this.rating = rating;
        this.price = price;
        this.category  = category;
        this.gender = gender;
        this.totalQuantity = totalQuantity;
    }


}
