package com.bookstore.service.impl;

import com.bookstore.dto.AuthorDto;
import com.bookstore.entities.Author;
import com.bookstore.mapper.AuthorMapper;
import com.bookstore.repositories.AuthorRepository;
import com.bookstore.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private AuthorMapper authorMapper;

    @Override
    public AuthorDto getAuthorById(int id) {
        Optional<Author> authorOpt = this.authorRepository.findById(id);
        Author author = authorOpt.get();
        return authorMapper.authorToAuthorDto(author);
    }

    @Override
    public Optional<List<AuthorDto>> getAuthors() {
        List<Author> authors = new ArrayList<>();
        authorRepository.findAll().forEach(authors::add);
        return Optional.ofNullable(authorMapper.authorToAuthorDto(authors));
    }

    @Override
    public Optional<AuthorDto> saveAuthor(AuthorDto authorDto) {
        authorRepository.save(authorMapper.authorDtoToAuthor(authorDto));
        return Optional.ofNullable(authorDto);
    }

    @Override
    public Optional<AuthorDto> deleteAuthor(int id){
        AuthorDto authorDto = getAuthorById(id);
        authorRepository.delete(authorMapper.authorDtoToAuthor(authorDto));
        return Optional.ofNullable(authorDto);
    }



}
