package com.bookstore.controller;

import com.bookstore.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class BusinessController {

    @Autowired
    BusinessService businessService;

    @PostMapping("/businessSignup")
    private ResponseEntity<Map<String, String>> signUp(@RequestBody Map<String, String> userDetails) {
        return businessService.signUp(userDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
