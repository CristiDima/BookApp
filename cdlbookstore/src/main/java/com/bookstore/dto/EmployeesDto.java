package com.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeesDto {

    private int id;

    private String email;

    private int businessId;

    private String name;

    private String token;

    private Date expiresAt;
}
