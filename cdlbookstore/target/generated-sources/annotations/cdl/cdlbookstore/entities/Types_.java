package cdl.cdlbookstore.entities;

import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-09-02T23:39:26")
@StaticMetamodel(Types.class)
public class Types_ { 

    public static volatile CollectionAttribute<Types, Book> booksCollection;
    public static volatile SingularAttribute<Types, String> name;
    public static volatile SingularAttribute<Types, String> guid;
    public static volatile SingularAttribute<Types, String> description;
    public static volatile SingularAttribute<Types, Integer> id;

}