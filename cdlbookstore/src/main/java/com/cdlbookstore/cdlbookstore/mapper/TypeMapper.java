package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.TypeDto;
import com.cdlbookstore.cdlbookstore.entities.Type;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TypeMapper {

    TypeDto typeToTypeDto(Type type);
    List<TypeDto> typeToTypeDto(List<Type> typeList);
    Type typeDtoToType(TypeDto typeDto);
    List<Type> typeDtoToType(List<TypeDto> typeDtoList);
}
