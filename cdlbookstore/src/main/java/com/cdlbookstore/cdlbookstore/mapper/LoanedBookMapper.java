package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.LoanedBookDto;
import com.cdlbookstore.cdlbookstore.entities.LoanedBook;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LoanedBookMapper {

    LoanedBookDto loanedBookToLoanedBookDto(LoanedBook loanedBook);
    List<LoanedBookDto> loanedBookToLoanedBookDto(List<LoanedBook> loanedBookList);
    LoanedBook loanedBookDtoToLoanedBook(LoanedBookDto loanedBookDto);
    List<LoanedBook> loanedBookDtoToLoanedBook(List<LoanedBookDto> loanedBookDtoList);
}
