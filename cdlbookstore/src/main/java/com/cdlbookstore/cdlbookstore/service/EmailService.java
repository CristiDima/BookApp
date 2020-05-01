package com.cdlbookstore.cdlbookstore.service;

public interface EmailService {

    void sendCreateAccountEmail(String to);
    void resetPasswordEmail(String to, String lastName, String link);
    void changePasswordEmail(String to);
}
