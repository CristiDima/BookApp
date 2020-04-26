package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.UserBookstoreDto;
import com.cdlbookstore.cdlbookstore.entities.UserBookstore;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserBookstoreMapper {

    UserBookstoreDto userBookstoreToUserBookstoreDto(UserBookstore userBookstore);
    List<UserBookstoreDto> userBookstoreToUserBookstoreDto(List<UserBookstore> userBookstoreList);
    UserBookstore userBookstoreDtoToUserBookstore(UserBookstoreDto userBookstoreDto);
    List<UserBookstore> userBookstoreDtoToUserBookstore(List<UserBookstoreDto> userBookstoreDtoList);
}
