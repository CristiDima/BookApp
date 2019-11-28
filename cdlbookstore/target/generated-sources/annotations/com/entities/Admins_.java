package com.entities;

import cdl.cdlbookstore.entities.Address;
import cdl.cdlbookstore.entities.Admins;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-08-25T19:43:18")
@StaticMetamodel(Admins.class)
public class Admins_ { 

    public static volatile SingularAttribute<Admins, String> firstName;
    public static volatile SingularAttribute<Admins, String> lastName;
    public static volatile SingularAttribute<Admins, String> guid;
    public static volatile SingularAttribute<Admins, Integer> id;
    public static volatile SingularAttribute<Admins, Address> idAdminAddress;

}