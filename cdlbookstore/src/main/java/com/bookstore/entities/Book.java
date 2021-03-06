package com.bookstore.entities;

import com.google.common.base.MoreObjects;
import lombok.*;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name = "book")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    @NotNull
    private String name;

    @ManyToMany( cascade = CascadeType.ALL )
    @JoinTable(
            name = "book_authors",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id"))
    @EqualsAndHashCode.Exclude @ToString.Exclude
    private Set<Author> authors;

    @ManyToMany()
    @JoinTable(
            name = "book_genres",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))
    @EqualsAndHashCode.Exclude @ToString.Exclude
    private Set<Genre> genres;

    @Column
    @NotNull
    private String description;

    @Column
    private double rating;

    @Column
    private double votes;

    @Column
    private int pages;

    @Column
    private int year;

    @Column
    private String photo;

    @Column
    private String file;

    @Column
    @NotNull
    private int total;

    @Column
    private int loaned;



    @Override
    public String toString() {
        return "Book [id=" + id + ", name=" + name + "]";
    }
}
