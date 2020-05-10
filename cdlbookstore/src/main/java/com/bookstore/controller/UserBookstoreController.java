package com.bookstore.controller;

import com.bookstore.dto.UserBookstoreDto;
import com.bookstore.service.UserBookstoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class UserBookstoreController {

    @Autowired
    private UserBookstoreService userBookstoreService;


    @PutMapping("/user/{id}")
    private ResponseEntity<Map<String, String>> updateUser(@PathVariable("id") int id, @RequestBody Map<String, String> userDetails) {
        return userBookstoreService.updateUser(id, userDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{id}")
    private ResponseEntity<UserBookstoreDto> getUser(@PathVariable("id") int id) {
        return userBookstoreService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
