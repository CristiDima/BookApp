package cdl.cdlbookstore.controller;

import cdl.cdlbookstore.entities.UserBookster;
import cdl.cdlbookstore.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(path="/user")
    public UserBookster getUserDTO(){
        UserBookster userBookster = userService.getUser(1);
        return userBookster;
    }
}
