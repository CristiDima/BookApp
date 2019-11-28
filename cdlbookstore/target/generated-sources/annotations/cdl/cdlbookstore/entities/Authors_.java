package cdl.cdlbookstore.entities;

import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-09-02T23:39:26")
@StaticMetamodel(Authors.class)
public class Authors_ { 

    public static volatile CollectionAttribute<Authors, Book> booksCollection;
    public static volatile SingularAttribute<Authors, String> name;
    public static volatile SingularAttribute<Authors, String> description;
    public static volatile SingularAttribute<Authors, String> guid;
    public static volatile SingularAttribute<Authors, Integer> id;

}