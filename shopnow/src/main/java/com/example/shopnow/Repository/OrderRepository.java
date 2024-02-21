package com.example.shopnow.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.shopnow.Models.orderModel;

public interface OrderRepository extends MongoRepository<orderModel,String> {

}
