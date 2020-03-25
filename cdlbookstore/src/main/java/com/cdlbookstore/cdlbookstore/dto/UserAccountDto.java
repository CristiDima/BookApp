package com.cdlbookstore.cdlbookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAccountDto {

    private int id;

    private String email;

    private String password;

    private boolean isValid;

    private Date expirationDate;

    private int userId;
}
