package com.bookstore.service;

public interface EmailService {

    void sendCreateAccountEmail(String to, String lastName);
    void resetPasswordEmail(String to, String lastName, String link);
    void createBusinessAccountEmail(String to, String companyName, String link);
    void updateBusinessAccountEmail(String to, String companyName, String userName);
    void changePasswordEmail(String to);
}
