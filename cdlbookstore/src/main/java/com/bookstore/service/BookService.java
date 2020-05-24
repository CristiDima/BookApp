package com.bookstore.service;

import com.bookstore.dto.BookDto;
import com.bookstore.entities.Book;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface BookService {

    //region books
    BookDto getBookById(int id);
    Optional<List<BookDto>> getBooks ();
    Optional<BookDto> saveBook(BookDto bookDto);
    Optional<BookDto> deleteBook (int id);
    Optional<BookDto> updateBook (BookDto bookDto);
    Optional<Map<String, Double>> updateRating (int bookId, int userId, double rating);
    //endregion

    //region loaned books
    Optional<BookDto> borrowBook(int bookId, int userId);
    Optional<List<BookDto>> getLoanedBooks(int userId);
    //endregion


    //region wishlist
    Optional<BookDto> addWishlistBook(int bookId, int userId);
    Optional<BookDto> deleteWishlistBook(int bookId, int userId);
    Optional<List<BookDto>> getWishlist(int userId);
    //endregion

    //region library
    Optional<List<BookDto>> getLibrary(int userId);
    //endregion

    //region online books
    Optional<BookDto> addOnlineBook(int bookId, int userId);
    Optional<BookDto> deleteOnlineBook(int bookId, int userId);
    Optional<List<BookDto>> getOnlineBooks(int userId);
    //endregion

    //region management books
    Optional<Map<String, Map<String, Object>>> getExpiredLoanBooks();
    Optional<Map<String, Map<String, Object>>> getOrderedBooks();
    Optional<Map<String, Map<String, Object>>> getReturnedBooks();

    Optional<Boolean> deleteOrderedBooks(int bookId, int userId);
    Optional<BookDto> returnBook(int bookId, int userId);
    Optional<Boolean> confirmBookReturn(int bookId, int userId);
    //endregion
}
