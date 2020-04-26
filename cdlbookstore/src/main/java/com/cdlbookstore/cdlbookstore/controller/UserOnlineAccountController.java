package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.UserOnlineAccountDto;
import com.cdlbookstore.cdlbookstore.service.UserOnlineAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserOnlineAccountController {

    @Autowired
    UserOnlineAccountService userOnlineAccountService;

    @GetMapping("/onlineAccount/{id}")
    private ResponseEntity<UserOnlineAccountDto> getOnlineAccountByUserId(@PathVariable int id) {
        return userOnlineAccountService.getByUserId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/onlineAccount")
    private ResponseEntity<UserOnlineAccountDto> setUserOnlineAccountDto(@RequestBody int userId) {
        return userOnlineAccountService.setUserOnlineAccountDto(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
