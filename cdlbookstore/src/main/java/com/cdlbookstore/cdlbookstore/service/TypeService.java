package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.TypeDto;
import com.cdlbookstore.cdlbookstore.entities.Type;

import java.util.List;

public interface TypeService {

    TypeDto getTypeById(int id);
    List<TypeDto> getTypes();
    void saveType(Type type);
    void deleteType(Type type);
}
