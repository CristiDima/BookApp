package cdl.cdlbookstore.entities;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-11-25T22:07:10")
@StaticMetamodel(UserAccount.class)
public class UserAccount_ { 

    public static volatile SingularAttribute<UserAccount, Long> idUser;
    public static volatile SingularAttribute<UserAccount, String> password;
    public static volatile SingularAttribute<UserAccount, Boolean> isValid;
    public static volatile SingularAttribute<UserAccount, Long> id;
    public static volatile SingularAttribute<UserAccount, String> email;
    public static volatile SingularAttribute<UserAccount, Date> expirationDate;

}