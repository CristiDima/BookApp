/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cdl.cdlbookstore;

import javax.persistence.EntityManagerFactory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Cristian Dima
 */
@RestController
public class Test {
    
    private EntityManagerFactory emf = null;
    
    @GetMapping(path="/test")
    private String test(){
//        AddressJpaController tst = new AddressJpaController(this.emf);
//        return tst.findAddressEntities();
        return "my fucking test";
    }
}
