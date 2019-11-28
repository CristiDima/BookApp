package com.entities;

import cdl.cdlbookstore.entities.Useraccount;
import cdl.cdlbookstore.entities.Users;

import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-08-25T19:43:18")
@StaticMetamodel(Useraccount.class)
public class Useraccount_ { 

    public static volatile SingularAttribute<Useraccount, String> password;
    public static volatile SingularAttribute<Useraccount, Integer> id;
    public static volatile CollectionAttribute<Useraccount, Users> usersCollection;
    public static volatile SingularAttribute<Useraccount, String> username;

}