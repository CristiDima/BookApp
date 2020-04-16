package com.cdlbookstore.cdlbookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "loaned_books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanedBook {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "user_id")
    @NotNull
    private int userId;

    @Column(name = "book_id")
    @NotNull
    private int bookId;

    @Column(name = "loaned_at")
    @NotNull
    private Date loanedAt;

    @Column(name = "date_to_return")
    @NotNull
    private Date dateToReturn;

}
