package com.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserBookstoreDto {

    private int id;

    private String firstName;

    private String lastName;

    private int addressId;

    private  String phoneNumber;

    private boolean isAdmin;

    private int totalBooks;
}
