package com.bookstore.mapper;

import com.bookstore.dto.UserBookstoreDto;
import com.bookstore.entities.UserBookstore;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserBookstoreMapper {

    UserBookstoreDto userBookstoreToUserBookstoreDto(UserBookstore userBookstore);
    List<UserBookstoreDto> userBookstoreToUserBookstoreDto(List<UserBookstore> userBookstoreList);
    UserBookstore userBookstoreDtoToUserBookstore(UserBookstoreDto userBookstoreDto);
    List<UserBookstore> userBookstoreDtoToUserBookstore(List<UserBookstoreDto> userBookstoreDtoList);
}
