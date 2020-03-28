package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.TypeDto;
import com.cdlbookstore.cdlbookstore.mapper.TypeMapper;
import com.cdlbookstore.cdlbookstore.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TypeController {

    @Autowired
    private TypeService typeService;

    @Autowired
    private TypeMapper typeMapper;

    @PostMapping("/type")
    private TypeDto getTypes(@RequestBody TypeDto typeDto) {
        this.typeService.saveType(typeMapper.typeDtoToType(typeDto));
        return typeDto;
    }

    @GetMapping("/type")
    private List<TypeDto> getTypes() {
        return typeService.getTypes();
    }

    @DeleteMapping("/type/{id}")
    private TypeDto deleteType(@PathVariable("id") int id){
       TypeDto typeDto = this.typeService.getTypeById(id);
       this.typeService.deleteType(typeMapper.typeDtoToType(typeDto));

       return typeDto;
    }
}
