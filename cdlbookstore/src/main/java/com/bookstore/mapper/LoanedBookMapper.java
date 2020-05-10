package com.bookstore.mapper;

import com.bookstore.dto.LoanedBookDto;
import com.bookstore.entities.LoanedBook;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LoanedBookMapper {

    LoanedBookDto loanedBookToLoanedBookDto(LoanedBook loanedBook);
    List<LoanedBookDto> loanedBookToLoanedBookDto(List<LoanedBook> loanedBookList);
    LoanedBook loanedBookDtoToLoanedBook(LoanedBookDto loanedBookDto);
    List<LoanedBook> loanedBookDtoToLoanedBook(List<LoanedBookDto> loanedBookDtoList);
}
