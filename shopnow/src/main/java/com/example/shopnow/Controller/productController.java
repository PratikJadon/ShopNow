package com.example.shopnow.Controller;

import com.example.shopnow.Models.productModel;
import com.example.shopnow.Service.productService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
public class productController {
    @Autowired
    private productService prodService;
    @GetMapping
    public ResponseEntity getProduct(@RequestParam(required = false) String category,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        if(category != null){
            log.info("Products fetched as per category");
            Page<productModel> products = prodService.getProductByCategory(category,pageable);
            return ResponseEntity.ok().body(new HashMap<String,Object>(){{
                put("Success",true);
                put("Data",products);
            }});
        }
        log.info("Default Products fetched.");
        Page<productModel> products =  prodService.getProduct(pageable);
        return ResponseEntity.ok().body(new HashMap<String,Object>(){{
            put("Success",true);
            put("Data",products);
        }});
    }
}
