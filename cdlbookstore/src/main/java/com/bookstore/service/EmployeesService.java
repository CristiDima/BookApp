package com.bookstore.service;

import com.bookstore.dto.EmployeesDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface EmployeesService {

    Optional<EmployeesDto> getEmployee(String email);
    Optional<List<EmployeesDto>> getByBusinessId(int businessId);
    Optional<EmployeesDto> saveEmployee(String email, int businessId);
    Optional<Boolean> deleteByEmail(Map<String, List<String>> emailsMap);
    Optional<Boolean> deleteByEmail(String email);

    Optional<List<String>> getAllEmployeesName(int businessId);
    Optional<Boolean> isTokenValid(int userId, String token);
}
