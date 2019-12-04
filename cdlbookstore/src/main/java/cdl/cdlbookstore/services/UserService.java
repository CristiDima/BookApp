package cdl.cdlbookstore.services;

import cdl.cdlbookstore.entities.UserBookster;

public interface UserService {

    UserBookster getUser(int id );

    Iterable<UserBookster> getUsers();
}
