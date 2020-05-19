package com.bookstore.mapper;

import com.bookstore.dto.BusinessCredentialsDto;
import com.bookstore.entities.BusinessCredentials;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BusinessCredentialsMapper {

    BusinessCredentialsDto businessCredentialsToBusinessCredentialsDto(BusinessCredentials userCredentials);
    List<BusinessCredentialsDto> businessCredentialsToBusinessCredentialsDto(List<BusinessCredentials> userCredentialsList);
    BusinessCredentials businessCredentialsDtoToBusinessCredentials(BusinessCredentialsDto userAccount);
    List<BusinessCredentials> businessCredentialsDtoToBusinessCredentials(List<BusinessCredentialsDto> userAccountList);
}
