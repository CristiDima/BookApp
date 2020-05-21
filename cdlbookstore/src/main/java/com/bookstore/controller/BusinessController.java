package com.bookstore.controller;

import com.bookstore.dto.BusinessAccountDto;
import com.bookstore.dto.EmployeesDto;
import com.bookstore.service.BusinessAccountService;
import com.bookstore.service.EmployeesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class BusinessController {

    @Autowired
    private EmployeesService employeesService;

    @Autowired
    private BusinessAccountService businessAccountService;

    @GetMapping("/employees/{id}")
    private ResponseEntity<List<EmployeesDto>> getAllEmployees(@PathVariable int id) {
        return employeesService.getByBusinessId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/employees/{id}")
    private ResponseEntity<EmployeesDto> saveEmployee(@RequestBody String email, @PathVariable int id) {
        return employeesService.saveEmployee(email, id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/employees")
    private ResponseEntity<Boolean> deleteEmployee(@RequestBody Map<String, List<String>> emailsMap) {
        return employeesService.deleteByEmail(emailsMap)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/businessAccount/{id}")
    private ResponseEntity<BusinessAccountDto> getBusinessAccountByUserId(@PathVariable int id) {
        return businessAccountService.getByUserId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/businessAccount/set")
    private ResponseEntity<BusinessAccountDto> setBusinessAccountDto(@RequestBody int userId) {
        return businessAccountService.setUserBusinessAccountDto(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/businessAccount/update")
    private ResponseEntity<BusinessAccountDto> updateBusinessAccountDto(@RequestBody int userId) {
        return businessAccountService.updateBusinessAccountDto(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
