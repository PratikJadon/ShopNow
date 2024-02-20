package com.example.shopnow.Service;

import com.example.shopnow.Models.cartModel;
import com.example.shopnow.Models.productModel;
import com.example.shopnow.Repository.productRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.web.PageableArgumentResolver;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
public class productService {
    @Autowired
    private productRepository productRepo;
    @Autowired
    private MongoTemplate mongoTemplate;

    // Method to find a product by its ID
    public Optional<productModel> findById(String prodid) {
        return productRepo.findById(prodid);
    }

    // Method to find products based on various criteria
    public Page<productModel> findProducts(String sortByPrice, String gender, String category, String searchKeyword, Pageable pageable) {
        Criteria criteria = new Criteria();
        String[] withGenderCategory = {"clothes", "watches", "accessories"};
        MatchOperation matchOps = null;

        // Apply filtering based on category and searchKeyword
        if (category != null) {
            criteria.and("category").is(category);
        }
        if (gender != null && (category == null || Arrays.stream(withGenderCategory).anyMatch(category::contains))) {
            criteria.and("gender").is(gender);
        }
        if (searchKeyword != null) {
            criteria.and("title").regex(searchKeyword, "i"); // Case-insensitive search
        }

        matchOps = Aggregation.match(criteria);
        SortOperation sortOperation = Aggregation.sort(Sort.Direction.ASC, "price");
        if (sortByPrice != null && sortByPrice.equals("desc")) {
            sortOperation = Aggregation.sort(Sort.Direction.DESC, "price");
        }

        // Apply aggregation pipeline to filter, sort, skip, and limit results
        Aggregation aggregation = Aggregation.newAggregation(matchOps, sortOperation,
                Aggregation.skip((long) pageable.getPageNumber() * pageable.getPageSize()),
                Aggregation.limit(pageable.getPageSize())
        );

        // Execute aggregation query and return the results
        List<productModel> products = mongoTemplate.aggregate(aggregation, "products", productModel.class).getMappedResults();
        log.info("Products fetched with conditions: Category->" + category + ", sort->" + sortByPrice + ", gender ->" + gender + " and search key->" + searchKeyword + " and got result of size " + products.size());

        // Count total documents matching the criteria
        long totalElements = mongoTemplate.count(Query.query(criteria), "products");
        return new PageImpl<>(products, PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()), totalElements);
    }

    public boolean addtoCart(List<cartModel> cart, String productId) {
        Optional<cartModel> existingCartItem = cart.stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();

        if (productRepo.findById(productId).isEmpty() || productRepo.findById(productId).get().getTotalQuantity() <= 0 || (existingCartItem.isPresent() && existingCartItem.get().getQuantity() == productRepo.findById(productId).get().getTotalQuantity())) {
            return false;
        }

        if (existingCartItem.isPresent()) {
            // Increase quantity of existing item
            existingCartItem.get().setQuantity(existingCartItem.get().getQuantity() + 1);
        } else {
            // Add new item to cart
            cart.add(new cartModel(productId, 1));
        }
        return true;
    }

    public boolean deleteFromCart(List<cartModel> cart, String productId) {
        Optional<cartModel> existingCartItem = cart.stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();

        if (existingCartItem.isPresent()) {
            if (existingCartItem.get().getQuantity() > 1) {
                existingCartItem.get().setQuantity(existingCartItem.get().getQuantity() - 1);
            } else {
                cart.remove(existingCartItem.get());
            }
            return true;
        }
        return false;
    }
}
