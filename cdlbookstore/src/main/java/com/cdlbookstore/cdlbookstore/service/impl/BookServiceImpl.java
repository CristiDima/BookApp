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
    public List<BookDto> getBooks() {
        List<Book> books = new ArrayList<>();
        bookRepository.findAll().forEach(books::add);
        return bookMapper.bookDoBookDto(books);
    }

    @Override
    public void saveBook(BookDto bookDto) {
        bookRepository.save(bookMapper.bookDtoToBook(bookDto));
    }

    @Override
    public void deleteBook (BookDto bookDto){
        bookRepository.delete(bookMapper.bookDtoToBook(bookDto));
    }
}
