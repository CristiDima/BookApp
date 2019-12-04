package cdl.cdlbookstore.services.impl;

import cdl.cdlbookstore.dto.UserBooksterDTO;
import cdl.cdlbookstore.entities.UserBookster;
import cdl.cdlbookstore.repository.UserBooksterRepository;
import cdl.cdlbookstore.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserBooksterRepository userBooksterRepository;

    @Override
    public UserBookster getUser(int id) {
        UserBooksterDTO user = new UserBooksterDTO();
        return userBooksterRepository.findUsersById( id );
    }

    @Override
    public Iterable<UserBookster> getUsers() {
        return userBooksterRepository.findAll();
    }

}
