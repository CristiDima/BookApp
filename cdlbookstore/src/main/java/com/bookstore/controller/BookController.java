package com.bookstore.controller;

import com.bookstore.dto.BookDto;
import com.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;


    //region books
    @PostMapping("/book")
    public ResponseEntity<BookDto> saveBook(@RequestBody BookDto bookDto)
    {
        return bookService.saveBook(bookDto)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/book")
    public ResponseEntity<BookDto> updateBook(@RequestBody BookDto bookDto)
    {
        return bookService.updateBook(bookDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/book")
    public ResponseEntity<List<BookDto>> getBooks()
    {
        return bookService.getBooks()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/book/{id}")
    private ResponseEntity<BookDto> deleteGenre(@PathVariable("id") int id) {
        return  this.bookService.deleteBook(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/book/rating/{bookId}/{userId}")
    private ResponseEntity<Map<String, Double>> updateRating(@PathVariable int bookId, @PathVariable int userId, @RequestBody int rating) {
        return  this.bookService.updateRating(bookId, userId, rating)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    //endregion


    //region loanedBooks
    @PostMapping("/book/borrow/{id}")
    public ResponseEntity<BookDto> borrowBook(@RequestBody int userId, @PathVariable int id)
    {
        return bookService.borrowBook(id, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/loanedBooks/{id}")
    private ResponseEntity<List<BookDto>> getLoanedBooks(@PathVariable int id) {
        return bookService.getUnreturnedBooks(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    //endregion

    //region online books
    @GetMapping("/onlineBooks/{id}")
    private ResponseEntity<List<BookDto>> getOnlineBooks(@PathVariable int id) {
        return bookService.getOnlineBooks(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/book/online/{id}")
    public ResponseEntity<BookDto> addOnlineBook(@RequestBody int userId, @PathVariable int id)
    {
        return bookService.addOnlineBook(id, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/book/online/{bookId}/{userId}")
    public ResponseEntity<BookDto> deleteOnlineBook(@PathVariable int userId, @PathVariable int bookId)
    {
        return bookService.deleteOnlineBook(bookId, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    //endregion

    //region wishlist
    @PostMapping("/book/wishlist/{id}")
    public ResponseEntity<BookDto> addWishlistBook(@RequestBody int userId, @PathVariable int id)
    {
        return bookService.addWishlistBook(id, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/book/wishlist/{bookId}/{userId}")
    public ResponseEntity<BookDto> deleteWishlistBook(@PathVariable int userId, @PathVariable int bookId)
    {
        return bookService.deleteWishlistBook(bookId, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/book/wishlist/{userId}")
    public ResponseEntity<List<BookDto>> getWishlist(@PathVariable int userId)
    {
        return bookService.getWishlist(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    //endregion

    //region library
    @GetMapping("/book/library/{userId}")
    public ResponseEntity<List<BookDto>> getLibrary(@PathVariable int userId)
    {
        return bookService.getLibrary(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    //endregion

    //region management books
    @GetMapping("/book/expiredLoan")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getLoanedBooks()
    {
        return bookService.getUnreturnedBooks()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/book/ordered")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getOrderedBooks()
    {
        return bookService.getOrderedBooks()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/book/returned")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getReturnedBooks()
    {
        return bookService.getReturnedBooks()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/book/returned/{bookId}")
    public ResponseEntity<BookDto> returnBook(@PathVariable int bookId, @RequestBody int userId)
    {
        return bookService.returnBook(bookId, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/book/returned/{bookId}/{userId}")
    public ResponseEntity<Boolean> deleteReturnedBook(@PathVariable  int bookId, @PathVariable int userId)
    {
        return bookService.confirmBookReturn(bookId, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/book/ordered/{bookId}/{userId}")
    public ResponseEntity<Boolean> deleteOrderedBooks(@PathVariable  int bookId, @PathVariable int userId)
    {
        return bookService.deleteOrderedBooks(bookId, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    //endregion
}
