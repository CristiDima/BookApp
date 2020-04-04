package com.cdlbookstore.cdlbookstore.dto;

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

    private Date expirationDate;

    private boolean isValid;

    private int userId;
}
