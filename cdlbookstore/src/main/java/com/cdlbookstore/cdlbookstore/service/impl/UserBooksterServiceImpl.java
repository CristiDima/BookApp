package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.UserBooksterDto;
import com.cdlbookstore.cdlbookstore.entities.UserBookster;
import com.cdlbookstore.cdlbookstore.mapper.UserBooksterMapper;
import com.cdlbookstore.cdlbookstore.repositories.UserBooksterRepository;
import com.cdlbookstore.cdlbookstore.service.UserBooksterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserBooksterServiceImpl implements UserBooksterService {

    @Autowired
    private UserBooksterRepository userBooksterRepository;

    @Autowired
    private UserBooksterMapper userBooksterMapper;

    @Override
    public UserBooksterDto getUserById(int id) {
        UserBookster userBookster = userBooksterRepository.findById(id).get();

        return userBooksterMapper.userBooksterToUserBooksterDto(userBookster);
    }

    @Override
    public UserBooksterDto saveUser(UserBooksterDto userBooksterDto) {
        UserBookster userBookster = userBooksterRepository.save(userBooksterMapper.userBooksterDtoToUserBookster(userBooksterDto));

        return userBooksterMapper.userBooksterToUserBooksterDto(userBookster);
    }
}
