package com.cdlbookstore.cdlbookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserBooksterDto {

    private int id;

    private String firstName;

    private String lastName;

    private int addressId;

    private boolean isAdmin;
}