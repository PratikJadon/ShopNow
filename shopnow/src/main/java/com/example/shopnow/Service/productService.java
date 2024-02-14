package com.example.shopnow.Service;

import com.example.shopnow.Models.productModel;
import com.example.shopnow.Repository.productRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Slf4j
@Service
public class productService {
    @Autowired
    private productRepository productRepo;
    @Autowired
    private MongoTemplate mongoTemplate;

    public Optional<productModel> findById(String prodid){
        return productRepo.findById(prodid);
    }

    public List<productModel> findProducts(String sortByPrice, String category, String searchKeyword, Pageable pageable) {
        Criteria criteria = new Criteria();
        MatchOperation matchOps = null;
        // Apply filtering based on category and searchKeyword
        if (category != null) {
            criteria.and("category").is(category);
        }
        if (searchKeyword != null) {
            criteria.and("title").regex(searchKeyword, "i"); // Case-insensitive search
        }

        matchOps = Aggregation.match(criteria);
        SortOperation sortOperation = Aggregation.sort(Sort.Direction.ASC,"price");
        if (sortByPrice != null &&  sortByPrice.equals("desc")) {
            sortOperation = Aggregation.sort( Sort.Direction.DESC, "price");
        }
        Aggregation aggregation = Aggregation.newAggregation(matchOps, sortOperation,
                Aggregation.skip((long) pageable.getPageNumber() * pageable.getPageSize()),
                Aggregation.limit(pageable.getPageSize())
        );
        List<productModel> products = mongoTemplate.aggregate(aggregation, "products", productModel.class).getMappedResults();
        log.info("Products feched with condtions: Category->" + category + ", sort->" + sortByPrice + " and searchkey->" + searchKeyword + " and got result of size " + products.size());

        return products;
    }
}