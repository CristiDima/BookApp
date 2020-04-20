package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.UserBooksterDto;
import com.cdlbookstore.cdlbookstore.service.UserBooksterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserBooksterController {

    @Autowired
    private UserBooksterService userBooksterService;


    @PutMapping("/user/{id}")
    private Map<String, String> deleteGenre(@PathVariable("id") int id, @RequestBody Map<String, String> userDetails) throws Exception {
        try {
            return userBooksterService.updateUser(id, userDetails);
        } catch (Exception e) {
            throw e;
        }
    }
}
