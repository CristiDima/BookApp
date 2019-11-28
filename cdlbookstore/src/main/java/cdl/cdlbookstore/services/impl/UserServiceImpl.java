package cdl.cdlbookstore.services.impl;

import cdl.cdlbookstore.entities.User;
import cdl.cdlbookstore.repository.UserRepository;
import cdl.cdlbookstore.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUser(int id) {
//        return userRepository.findAll();
        return userRepository.findUsersById( id );
    }

    @Override
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

}
