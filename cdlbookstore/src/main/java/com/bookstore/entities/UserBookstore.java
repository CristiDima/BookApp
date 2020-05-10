package com.bookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Entity
@Table( name = "user_bookstore")
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableGenerator(name = "user_bookstore_val", initialValue = 2)
public class UserBookstore {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "user_bookstore_val")
    private int id;

    @Column(name = "first_name")
    @NotNull
    private String firstName;

    @Column(name = "last_name")
    @NotNull
    private String lastName;

    @Column(name = "address_id")
    @NotNull
    private int addressId;

    @Column(name = "phone_number")
    @NotNull
    private  String phoneNumber;

    @Column(name = "is_admin")
    @NotNull
    private boolean isAdmin;

    @Column(name = "total_books")
    private int totalBooks;
}
