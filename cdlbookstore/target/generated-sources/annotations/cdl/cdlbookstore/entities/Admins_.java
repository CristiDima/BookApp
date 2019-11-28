package cdl.cdlbookstore.entities;

import cdl.cdlbookstore.entities.Address;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-09-02T23:39:26")
@StaticMetamodel(Admins.class)
public class Admins_ { 

    public static volatile SingularAttribute<Admins, String> firstName;
    public static volatile SingularAttribute<Admins, String> lastName;
    public static volatile SingularAttribute<Admins, String> guid;
    public static volatile SingularAttribute<Admins, Integer> id;
    public static volatile SingularAttribute<Admins, Address> idAdminAddress;

}