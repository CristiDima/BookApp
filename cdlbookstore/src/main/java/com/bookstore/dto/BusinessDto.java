package com.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessDto {

    private int id;

    private String companyName;

    private int addressId;

    private  String phoneNumber;
}
