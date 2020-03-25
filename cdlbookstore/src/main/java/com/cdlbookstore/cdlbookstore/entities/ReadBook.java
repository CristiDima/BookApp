package com.cdlbookstore.cdlbookstore.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table( name = "read_books")
@Data
@NoArgsConstructor
@AllArgsConstructor
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

}
