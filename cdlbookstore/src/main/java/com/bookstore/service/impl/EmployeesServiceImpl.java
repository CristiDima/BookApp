package com.bookstore.service.impl;

import com.bookstore.dto.EmployeesDto;
import com.bookstore.entities.Employees;
import com.bookstore.mapper.EmployeesMapper;
import com.bookstore.repositories.EmployeesRepository;
import com.bookstore.service.EmployeesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EmployeesServiceImpl implements EmployeesService {

    @Autowired
    private EmployeesMapper employeesMapper;

    @Autowired
    EmployeesRepository employeesRepository;

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
        Employees tempEmployees = employeesRepository.save(employees);
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
        }
        return Optional.ofNullable(true);
    }

}
