package com.bookstore.service.impl;

import com.bookstore.entities.Book;
import com.bookstore.repositories.BookRepository;
import com.bookstore.service.BookService;
import com.bookstore.dto.BookDto;
import com.bookstore.entities.Author;
import com.bookstore.mapper.BookMapper;
import com.google.cloud.storage.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.*;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookMapper bookMapper;

    @Override
    public BookDto getBookById(int id){
        Book book = bookRepository.findById(id).get();
        return bookMapper.bookToBookDto(book);
    }

    @Override
    public Optional<List<BookDto>> getBooks() {
        List<Book> books = new ArrayList<>();
        bookRepository.findAll().forEach(books::add);
        return Optional.ofNullable(bookMapper.bookDoBookDto(books));
    }

    @Override
    public Optional<BookDto> saveBook(BookDto bookDto) {
        bookRepository.save(bookMapper.bookDtoToBook(bookDto));
        return Optional.ofNullable(bookDto);
    }

    @Override
    public Optional<BookDto> deleteBook (int id) {
        BookDto bookDto = getBookById(id);
        bookRepository.delete(bookMapper.bookDtoToBook(bookDto));
        return Optional.ofNullable(bookDto);
    }

    @Override
    public Optional<Double> updateRating (int bookId, double rating) {
        BookDto bookDto = getBookById(bookId);
        if (bookDto == null) {
            return Optional.ofNullable(null);
        }
        double tempRating  = ((bookDto.getRating() * bookDto.getVotes()) + rating) / (bookDto.getVotes() + 1);
        bookRepository.updateBookRating(tempRating, (bookDto.getVotes() + 1), bookId);
        return Optional.ofNullable(tempRating);
    }
}
