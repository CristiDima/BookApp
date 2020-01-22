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

    @Column
    private int author_id;

    @Column
    private int type_id;

    @Column
    private String description;

    @Column
    private double rating;

    public Book(){
    }

    public Book(String name, int authorId, int typeId, String description, double rating) {
        this.name = name;
        this.author_id = authorId;
        this.type_id = typeId;
        this.description = description;
        this.rating = rating;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAuthor_id() {
        return author_id;
    }

    public int getType_id() {
        return type_id;
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

    public void setAuthor_id(int authorId) {
        this.author_id = authorId;
    }

    public void setType_id(int typeId) {
        this.type_id = typeId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
}
