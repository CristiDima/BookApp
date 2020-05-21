package com.bookstore.mapper;

import com.bookstore.dto.EmployeesDto;
import com.bookstore.entities.Employees;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EmployeesMapper {

    EmployeesDto employeesToEmployeesDto(Employees employees);
    List<EmployeesDto> employeesToEmployeesDto(List<Employees> employeesList);
    Employees employeesDtoToEmployees(EmployeesDto employeesDto);
    List<Employees> employeesDtoToEmployees(List<EmployeesDto> employeesDtoList);
}
