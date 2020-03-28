package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.TypeDto;
import com.cdlbookstore.cdlbookstore.entities.Type;
import com.cdlbookstore.cdlbookstore.mapper.TypeMapper;
import com.cdlbookstore.cdlbookstore.repositories.TypeRepository;
import com.cdlbookstore.cdlbookstore.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TypeServiceImpl implements TypeService {

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private TypeMapper typeMapper;

    @Override
    public TypeDto getTypeById(int id) {
        Type type = typeRepository.findById(id).get();
        return typeMapper.typeToTypeDto(type);
    };

    @Override
    public List<TypeDto> getTypes() {
        List<Type> types = new ArrayList<>();
        typeRepository.findAll().forEach(types::add);

        return typeMapper.typeToTypeDto(types);
    }

    @Override
    public void saveType(Type type) {
        typeRepository.save(type);
    }

    @Override
    public void deleteType(Type type) {
        typeRepository.delete(type);
    }
}
