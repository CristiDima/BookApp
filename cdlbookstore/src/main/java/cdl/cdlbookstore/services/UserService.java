package cdl.cdlbookstore.services;

import cdl.cdlbookstore.entities.User;

public interface UserService {

    User getUser( int id );

    Iterable<User> getUsers();
}
