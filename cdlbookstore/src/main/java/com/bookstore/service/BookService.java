package com.bookstore.service;

import com.bookstore.dto.BookDto;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface BookService {

    //region books
    BookDto getBookById(int id);
    Optional<List<BookDto>> getBooks ();
    Optional<BookDto> saveBook(BookDto bookDto);
    Optional<BookDto> deleteBook (int id);
    Optional<Double> updateRating (int bookId, double rating);
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
}
