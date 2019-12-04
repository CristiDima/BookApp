package cdl.cdlbookstore;

import cdl.cdlbookstore.entities.UserBookster;
import cdl.cdlbookstore.repository.UserBooksterRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryIntegrationUserBooksterBookster {

    @Autowired
    private UserBooksterRepository userBooksterRepository;

    @Test
    public void whenCalledSave_thenCorrectNumberOfUsers() {
        userBooksterRepository.save(new UserBookster("Bob", "James", false));
        List<UserBookster> userBooksters = (List<UserBookster>) userBooksterRepository.findAll();

        assertEquals(userBooksters.size(), 1);
    }
}
