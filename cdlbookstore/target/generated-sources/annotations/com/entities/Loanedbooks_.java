package com.entities;

import cdl.cdlbookstore.entities.Book;
import cdl.cdlbookstore.entities.Loanedbooks;
import cdl.cdlbookstore.entities.Users;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-08-25T19:43:18")
@StaticMetamodel(Loanedbooks.class)
public class Loanedbooks_ { 

    public static volatile SingularAttribute<Loanedbooks, Users> idUser;
    public static volatile SingularAttribute<Loanedbooks, String> guid;
    public static volatile SingularAttribute<Loanedbooks, Book> idBook;
    public static volatile SingularAttribute<Loanedbooks, Integer> id;

}