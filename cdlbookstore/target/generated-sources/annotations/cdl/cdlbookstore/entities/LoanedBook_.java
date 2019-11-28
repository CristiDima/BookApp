package cdl.cdlbookstore.entities;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-11-25T22:07:10")
@StaticMetamodel(LoanedBook.class)
public class LoanedBook_ { 

    public static volatile SingularAttribute<LoanedBook, Date> dateToReturn;
    public static volatile SingularAttribute<LoanedBook, Long> id;
    public static volatile SingularAttribute<LoanedBook, Long> userId;
    public static volatile SingularAttribute<LoanedBook, Long> bookId;

}