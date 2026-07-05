package com.work.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private final long EXPIRATION_TIME = 1000 * 60 ;
    private final String key = "Handloom application JWT token for my internal purpose";
    private final SecretKey hashKey = Keys.hmacShaKeyFor(key.getBytes());

    public String generateToken(String emailId){
        Date currentDate = new Date();
        Date expireDateTime = new Date(System.currentTimeMillis() + EXPIRATION_TIME);
        return Jwts.builder()
            .subject(emailId)
            .issuedAt(currentDate)
            .expiration(expireDateTime)
            .signWith(hashKey)
            .compact();

    }

}
