package com.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessCredentialsDto {

    private int id;

    private String email;

    private String password;

    private int businessId;
}
