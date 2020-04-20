package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.UserPhysicalAccountDto;
import com.cdlbookstore.cdlbookstore.service.UserPhysicalAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserPhysicalAccountController {

    @Autowired
    UserPhysicalAccountService userPhysicalAccountService;

    @GetMapping("/physicalAccount/{id}")
    private UserPhysicalAccountDto getPhysicalAccountByUserId(@PathVariable int id) {
        return userPhysicalAccountService.getByUserId(id);
    }

    @PutMapping("/physicalAccount")
    private UserPhysicalAccountDto setUserOnlineAccountDto(@RequestBody int userId) {
        return userPhysicalAccountService.setUserOnlineAccountDto(userId);
    }
}
