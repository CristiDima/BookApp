package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.service.EmailService;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import java.util.Properties;

@Component
public class EmailServiceImpl implements EmailService {

    @Override
    public void sendCreateAccountEmail(String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Bookstore account");
        message.setText("Your bookster account was created");
        this.getJavaMailSender().send(message);
    }

    @Override
    public void resetPasswordEmail(String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Reset password");
        message.setText("To reset your password click on the following link:");
        this.getJavaMailSender().send(message);
    }

    @Override
    public void changePasswordEmail(String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Changed password");
        message.setText("Your password was changed");
        this.getJavaMailSender().send(message);
    }

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername("cdl.cristiandima@gmail.com");
        mailSender.setPassword("crddb1948");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}