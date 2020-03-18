package com.cdlbookstore.cdlbookstore.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "book")
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    private String name;

    @Column(name = "author_id")
    private int authorId;

    @Column(name = "type_id")
    private int typeId;

    @Column
    private String description;

    @Column
    private double rating;

    public Book(){
    }

    public Book(String name, int authorId, int typeId, String description, double rating) {
        this.name = name;
        this.authorId = authorId;
        this.typeId = typeId;
        this.description = description;
        this.rating = rating;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAuthorId() {
        return authorId;
    }

    public int getTypeId() {
        return typeId;
    }

    public String getDescription() {
        return description;
    }

    public double getRating() {
        return rating;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
}
