package com.cdlbookstore.cdlbookstore.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping(value = "/hello")
    @ResponseBody
    public String getResponse(){
        return "It works";
    }
}
