package cdl.cdlbookstore;

import cdl.cdlbookstore.entities.User;
import cdl.cdlbookstore.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryIntegrationUser {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void whenCalledSave_thenCorrectNumberOfUsers() {
        userRepository.save(new User("Bob", "James", false));
        List<User> users = (List<User>) userRepository.findAll();

        assertEquals(users.size(), 1);
    }
}
