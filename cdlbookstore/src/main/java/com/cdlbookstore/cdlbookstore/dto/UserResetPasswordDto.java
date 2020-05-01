package com.cdlbookstore.cdlbookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResetPasswordDto {

    private int id;

    private String token;

    private Date expiresAt;

    private int userId;
}
