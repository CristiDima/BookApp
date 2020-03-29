package com.cdlbookstore.cdlbookstore.dto;

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

    private Set<AuthorDto> authors;

    private Set<GenreDto> genres;
}
