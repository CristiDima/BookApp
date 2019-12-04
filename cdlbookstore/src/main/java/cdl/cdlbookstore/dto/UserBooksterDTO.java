package cdl.cdlbookstore.dto;

import lombok.Data;

@Data
public class UserBooksterDTO {

    private int id;

    private String firstName;

    private String lastName;

    private int addressId;

    private boolean isAdmin;
}
