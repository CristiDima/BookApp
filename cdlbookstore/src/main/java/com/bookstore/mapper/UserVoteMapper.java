package com.bookstore.mapper;

import com.bookstore.dto.UserVoteDto;
import com.bookstore.entities.UserVote;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserVoteMapper {

    UserVoteDto userVoteDtoToUserVote(UserVote userVote);
    List<UserVoteDto> userVoteDtoToUserVote(List<UserVote> userVoteList);
    UserVote userVoteToUserVoteDto(UserVoteDto userVoteDto);
    List<UserVote> userVoteToUserVoteDto(List<UserVoteDto> userVoteDtoList);
}
