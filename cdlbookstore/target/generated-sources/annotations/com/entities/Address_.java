package com.entities;

import cdl.cdlbookstore.entities.Address;
import cdl.cdlbookstore.entities.Admins;
import cdl.cdlbookstore.entities.Users;

import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-08-25T19:43:18")
@StaticMetamodel(Address.class)
public class Address_ { 

    public static volatile SingularAttribute<Address, Integer> number;
    public static volatile SingularAttribute<Address, String> city;
    public static volatile SingularAttribute<Address, String> street;
    public static volatile SingularAttribute<Address, String> district;
    public static volatile SingularAttribute<Address, String> guid;
    public static volatile SingularAttribute<Address, Integer> id;
    public static volatile CollectionAttribute<Address, Users> usersCollection;
    public static volatile CollectionAttribute<Address, Admins> adminsCollection;

}