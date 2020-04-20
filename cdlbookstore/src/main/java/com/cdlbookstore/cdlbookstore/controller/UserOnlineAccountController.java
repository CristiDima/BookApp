package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.UserOnlineAccountDto;
import com.cdlbookstore.cdlbookstore.service.UserOnlineAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserOnlineAccountController {

    @Autowired
    UserOnlineAccountService userOnlineAccountService;

    @GetMapping("/onlineAccount/{id}")
    private UserOnlineAccountDto getOnlineAccountByUserId(@PathVariable int id) {
        return userOnlineAccountService.getByUserId(id);
    }

    @PutMapping("/onlineAccount")
    private UserOnlineAccountDto setUserOnlineAccountDto(@RequestBody int userId) {
        return userOnlineAccountService.setUserOnlineAccountDto(userId);
    }
}
