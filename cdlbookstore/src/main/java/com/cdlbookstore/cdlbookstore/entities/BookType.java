package com.cdlbookstore.cdlbookstore.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table( name = "book_type" )
@Data
public class BookType {

    @Id
    @GeneratedValue ( strategy = GenerationType.AUTO )
    private int id;

    @Column
    private String name;

    @Column
    private String description;

    public BookType() {
    }

    public BookType(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
