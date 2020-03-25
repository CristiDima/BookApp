package com.cdlbookstore.cdlbookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanedBookDto {

    private int id;

    private int userId;

    private int bookId;

    private Date dateToReturn;
}