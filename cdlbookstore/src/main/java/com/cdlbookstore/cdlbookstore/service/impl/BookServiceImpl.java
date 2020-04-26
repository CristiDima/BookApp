package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.BookDto;
import com.cdlbookstore.cdlbookstore.entities.Book;
import com.cdlbookstore.cdlbookstore.mapper.BookMapper;
import com.cdlbookstore.cdlbookstore.repositories.BookRepository;
import com.cdlbookstore.cdlbookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
}
