package com.cdlbookstore.cdlbookstore.service;

public interface EmailService {

    void sendCreateAccountEmail(String to);
    void resetPasswordEmail(String to);
    void changePasswordEmail(String to);
}
