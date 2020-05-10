package com.bookstore.controller;

import com.bookstore.service.UserPhysicalAccountService;
import com.bookstore.dto.UserPhysicalAccountDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserPhysicalAccountController {

    @Autowired
    UserPhysicalAccountService userPhysicalAccountService;

    @GetMapping("/physicalAccount/{id}")
    private ResponseEntity<UserPhysicalAccountDto> getPhysicalAccountByUserId(@PathVariable int id) {
        return userPhysicalAccountService.getByUserId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/physicalAccount")
    private ResponseEntity<UserPhysicalAccountDto> setUserOnlineAccountDto(@RequestBody int userId) {
        return userPhysicalAccountService.setUserOnlineAccountDto(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
