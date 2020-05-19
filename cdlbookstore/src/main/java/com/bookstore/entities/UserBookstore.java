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
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "address_id")
    @NotNull
    private int addressId;

    @Column(name = "phone_number")
    @NotNull
    private  String phoneNumber;

    @Column(name = "is_admin")
    @NotNull
    private boolean isAdmin;

    @Column(name = "is_business")
    private boolean isBusiness;

    @Column(name = "is_from_business")
    private boolean isFromBusiness;

    @Column(name = "total_books")
    private int totalBooks;
}
