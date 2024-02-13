package com.example.shopnow.Controller;

import com.example.shopnow.Models.productModel;
import com.example.shopnow.Service.productService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity getProduct(@RequestParam(required = false) String category,@RequestParam(required = false) String searchKey,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        List<productModel> products =  prodService.findProducts(category,searchKey,pageable);
        return ResponseEntity.ok().body(new HashMap<String,Object>(){{
            put("Success",true);
            put("Data",products);
            put("Size",products.size());
        }});
    }
}
