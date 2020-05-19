package com.bookstore.service.impl;

import com.bookstore.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;

@Component
public class EmailServiceImpl implements EmailService {

    @Autowired
    private TemplateEngine templateEngine;

    @Override
    public void sendCreateAccountEmail(String to, String lastName) {
        MimeMessage message = this.getJavaMailSender().createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(to);
            helper.setSubject("Create an account");
            Map<String, String> values = new HashMap<>();
            values.put("username", lastName);
            helper.setText(this.generateMailHtml(values, "NewAccountTemplate"), true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        this.getJavaMailSender().send(message);
    }

    @Override
    public void resetPasswordEmail(String to, String lastName, String link) {
        MimeMessage message = this.getJavaMailSender().createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(to);
            helper.setSubject("Reset password");
            Map<String, String> values = new HashMap<>();
            values.put("username", lastName);
            values.put("link", link);
            helper.setText(this.generateMailHtml(values, "ResetPasswordTemplate"), true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
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

    public String generateMailHtml(Map<String, String> values, String emailTemplateName)
    {
        Map<String, Object> variables = new HashMap<>();
        values.forEach((k, v) -> variables.put(k, v));

        final String templateFileName = emailTemplateName; //Name of the template file without extension
        String output = this.templateEngine.process(templateFileName, new Context(Locale.getDefault(), variables));

        return output;
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

    @Bean
    public ITemplateResolver templateResolver()
    {
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setPrefix("templates/");
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(TemplateMode.HTML);

        return templateResolver;
    }

    @Bean
    public TemplateEngine templateEngine()
    {
        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(this.templateResolver());

        return templateEngine;
    }
}