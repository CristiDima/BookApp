package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.AddressDto;
import com.cdlbookstore.cdlbookstore.entities.Address;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AddressMapper {

    AddressDto addressToAddressDto(Address address);
    List<AddressDto> addressToAddressDto(List<Address> addressList);
    Address addressDtoToAddress(AddressDto address);
    List<Address> addressDtoToAddress(List<AddressDto> addressDtoList);
}
