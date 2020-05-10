package com.bookstore.controller;

import com.bookstore.dto.BookDto;
import com.bookstore.service.OnlineBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OnlineBookController {

    @Autowired
    private OnlineBookService onlineBookService;

    @GetMapping("/onlineBooks/{id}")
    private ResponseEntity<List<BookDto>> getOnlineBooks(@PathVariable int id) {
        return onlineBookService.getOnlineBooks(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
