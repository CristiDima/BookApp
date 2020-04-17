package com.cdlbookstore.cdlbookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPhysicalAccountDto {

    private int id;

    private boolean isValid;

    private Date activatedAt;

    private Date expiresAt;

    private int accountId;
}
