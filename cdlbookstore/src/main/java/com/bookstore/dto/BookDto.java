package com.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {

    private int id;

    private String name;

    private String description;

    private double rating;

    private double votes;

    private int pages;

    private int year;

    private String photo;

    private String file;

    private int total;

    private int loaned;

    private Set<AuthorDto> authors;

    private Set<GenreDto> genres;
}
