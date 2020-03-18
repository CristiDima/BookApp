package com.cdlbookstore.cdlbookstore.entities;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table( name = "read_books")
@Data
public class ReadBook {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column (name = "book_id")
    private int bookId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "read_pages")
    private int readPages;

    public ReadBook() {
    }

    public ReadBook(@NotNull int bookId, @NotNull int userId, @NotNull int readPages) {
        this.bookId = bookId;
        this.userId = userId;
        this.readPages = readPages;
    }

    public int getId() {
        return id;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getReadPages() {
        return readPages;
    }

    public void setReadPages(int readPages) {
        this.readPages = readPages;
    }
}
