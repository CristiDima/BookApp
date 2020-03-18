package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.entities.BookType;
import com.cdlbookstore.cdlbookstore.service.BookTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookTypeController {

    @Autowired
    private BookTypeService bookTypeService;

    @PostMapping("/type")
    private BookType getBookTypes(@RequestBody BookType bookType) {
        this.bookTypeService.saveBookType(bookType);
        return bookType;
    }

    @GetMapping("/type")
    private List<BookType> getBookTypes() {
        return bookTypeService.getBookTypes();
    }
}
