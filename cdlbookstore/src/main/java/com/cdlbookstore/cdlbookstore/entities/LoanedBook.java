package com.cdlbookstore.cdlbookstore.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "loaned_books")
public class LoanedBook {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "book_id")
    private int bookId;

    @Column(name = "date_to_return")
    private Date dateToReturn;

    public LoanedBook() {
    }

    public LoanedBook(int userId, int bookId, Date dateToReturn) {
        this.userId = userId;
        this.bookId = bookId;
        this.dateToReturn = dateToReturn;
    }

    public int getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public Date getDateToReturn() {
        return dateToReturn;
    }

    public void setDateToReturn(Date dateToReturn) {
        this.dateToReturn = dateToReturn;
    }
}
