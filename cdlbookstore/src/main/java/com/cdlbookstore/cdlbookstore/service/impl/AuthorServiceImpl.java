package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.AuthorDto;
import com.cdlbookstore.cdlbookstore.entities.Author;
import com.cdlbookstore.cdlbookstore.mapper.AuthorMapper;
import com.cdlbookstore.cdlbookstore.repositories.AuthorRepository;
import com.cdlbookstore.cdlbookstore.service.AuthorService;
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
    public void saveAuthor(Author author) {
        authorRepository.save(author);
    }

    @Override
    public List<AuthorDto> getAuthors() {
        List<Author> authors = new ArrayList<>();
        authorRepository.findAll().forEach(authors::add);
        return authorMapper.authorToAuthorDto(authors);
    }

    @Override
    public void deleteAuthor(Author author){
        authorRepository.delete(author);
    }

    @Override
    public AuthorDto getAuthorById(int id) {
        Optional<Author> authorOpt = this.authorRepository.findById(id);
        Author author = authorOpt.get();
        return authorMapper.authorToAuthorDto(author);
    }

}
