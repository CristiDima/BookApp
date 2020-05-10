package com.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSessionDto {

    private int id;

    private String token;

    private Date created;

    private boolean isValid;

    private int userId;
}
