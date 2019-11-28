package com.entities;

import cdl.cdlbookstore.entities.Address;
import cdl.cdlbookstore.entities.Loanedbooks;
import cdl.cdlbookstore.entities.Useraccount;
import cdl.cdlbookstore.entities.Users;

import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-08-25T19:43:18")
@StaticMetamodel(Users.class)
public class Users_ { 

    public static volatile SingularAttribute<Users, String> firstName;
    public static volatile SingularAttribute<Users, String> lastName;
    public static volatile CollectionAttribute<Users, Loanedbooks> loanedbooksCollection;
    public static volatile SingularAttribute<Users, Useraccount> idUserAccount;
    public static volatile SingularAttribute<Users, String> guid;
    public static volatile SingularAttribute<Users, Integer> id;
    public static volatile SingularAttribute<Users, Address> idUserAddress;

}