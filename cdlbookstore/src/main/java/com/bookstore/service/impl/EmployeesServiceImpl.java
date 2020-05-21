package com.bookstore.service.impl;

import com.bookstore.dto.EmployeesDto;
import com.bookstore.dto.UserBookstoreDto;
import com.bookstore.entities.Employees;
import com.bookstore.entities.UserBookstore;
import com.bookstore.mapper.EmployeesMapper;
import com.bookstore.repositories.EmployeesRepository;
import com.bookstore.service.EmailService;
import com.bookstore.service.EmployeesService;
import com.bookstore.service.UserBookstoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
public class EmployeesServiceImpl implements EmployeesService {


    private static final int VALIDITY = 2;

    @Autowired
    private EmployeesMapper employeesMapper;

    @Autowired
    EmployeesRepository employeesRepository;

    @Autowired
    UserBookstoreService userBookstoreService;

    @Autowired
    EmailService emailService;


    @Override
    public Optional<EmployeesDto> getEmployee(String email) {
        Employees employees = employeesRepository.findByEmail(email);
        return Optional.ofNullable(employeesMapper.employeesToEmployeesDto(employees));
    }

    @Override
    public Optional<List<EmployeesDto>> getByBusinessId(int businessId) {
        List<Employees> employees = employeesRepository.findByBusinessId(businessId);
        return Optional.ofNullable(employeesMapper.employeesToEmployeesDto(employees));
    }

    @Override
    public Optional<EmployeesDto> saveEmployee(String email, int businessId) {
        Employees employees = new Employees();
        employees.setEmail(email);
        employees.setBusinessId(businessId);
        UUID token = UUID.randomUUID();
        employees.setToken(token.toString());
        Calendar c = Calendar.getInstance();
        LocalDateTime localDateTime = new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        LocalDateTime tempLocalDateTime = localDateTime.plusDays(VALIDITY);
        employees.setExpiresAt(java.sql.Timestamp.valueOf(tempLocalDateTime));
        Employees tempEmployees = employeesRepository.save(employees);
        UserBookstoreDto userBookstoreDto = userBookstoreService.getUserByEmail(email);
        UserBookstoreDto companyDto = userBookstoreService.getUserById(businessId).orElse(null);
        if (userBookstoreDto == null) {
            String link = "http://localhost:4200/new-employerSignup" + "?token=" + employees.getToken() +
                    "&id=" + companyDto.getId();
            emailService.createBusinessAccountEmail(email, companyDto.getCompanyName() ,link);
        } else {
            emailService.updateBusinessAccountEmail(email, companyDto.getCompanyName(), userBookstoreDto.getLastName());
        }
        return Optional.ofNullable(employeesMapper.employeesToEmployeesDto(tempEmployees));
    }

    @Override
    public Optional<Boolean> deleteByEmail(Map<String, List<String>> emailsMap) {
        List<String> emailList = emailsMap.get("emails");
        if (emailList == null) {
            return Optional.ofNullable(false);
        }

        for (String email : emailList) {
            employeesRepository.deleteByEmail(email);
            userBookstoreService.removeUserFromCompany(email);
        }
        return Optional.ofNullable(true);
    }

    @Override
    public Optional<Boolean> deleteByEmail(String email) {
        if (email == null) {
            return Optional.ofNullable(false);
        }
        employeesRepository.deleteByEmail(email);
        userBookstoreService.removeUserFromCompany(email);
        return Optional.ofNullable(true);
    }

    @Override
    public Optional<List<String>> getAllEmployeesName(int businessId) {
        List<Employees> employees = employeesRepository.findByBusinessId(businessId);
        List<String> emails = new ArrayList<>();
        for (Employees employee : employees) {
            emails.add(employee.getEmail());
        }
        List<String> userNames = userBookstoreService.getUsersNameByEmail(emails).orElse(null);
        return Optional.ofNullable(userNames);
    }

    @Override
    public Optional<Boolean> isTokenValid(int userId, String token) {
        Employees employees = employeesRepository.findAllByBusinessIdAndToken(userId, token);

        if (employees.getExpiresAt().before(new Date())) {
            return Optional.ofNullable(true);
        }

        return Optional.ofNullable(false);
    }

}
