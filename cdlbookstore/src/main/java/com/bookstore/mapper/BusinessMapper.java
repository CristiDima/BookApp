package com.bookstore.mapper;

import com.bookstore.dto.BusinessDto;
import com.bookstore.entities.Business;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BusinessMapper {

    BusinessDto businessToBusinessDto(Business business);
    List<BusinessDto> businessToBusinessDto(List<Business> businessList);
    Business businessDtoToBusiness(BusinessDto businessDto);
    List<Business> businessDtoToBusiness(List<BusinessDto> businessDtoList);
}
