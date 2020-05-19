package com.bookstore.service;

public interface EmailService {

    void sendCreateAccountEmail(String to, String lastName);
    void resetPasswordEmail(String to, String lastName, String link);
    void changePasswordEmail(String to);
}
