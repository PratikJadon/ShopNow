package com.example.shopnow.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.shopnow.Models.userModel;
import com.example.shopnow.envKeys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
@Slf4j
@Component
public class jwtHelper {
    private static jwtHelper instance;
    private Algorithm algorithm;
    @Autowired
    private envKeys envkey;
    public static jwtHelper getInstance(){
        if(instance == null){
            instance = new jwtHelper();
        }
        return instance;
    }
    @PostConstruct
    public void init(){
        this.algorithm = Algorithm.HMAC256(envkey.getSecretKey());
    }
    public String tokenGen(userModel user) {
        return JWT.create().withSubject(user.getId()).withIssuer(user.getFullname()).withExpiresAt(new Date(System.currentTimeMillis() + 300_000)).sign(algorithm);
    }

    public String verifyJWT(String token){
        try{
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(token);
            Date expirationDate = decodedJWT.getExpiresAt();
            Date now = new Date();
            if (expirationDate != null && expirationDate.before(now)) {
                log.warn("Token is expired");
                return null;
            }
            return decodedJWT.getSubject();
        }catch (JWTVerificationException e){
            log.error("Token is invalid");
            return null;
        }

    }
}
