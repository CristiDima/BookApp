package com.cdlbookstore.cdlbookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCredentialsDto {

    private int id;

    private String email;

    private String password;

    private int userId;
}
