package com.bookstore.service.impl;

import com.bookstore.entities.*;
import com.bookstore.repositories.*;
import com.bookstore.service.BookService;
import com.bookstore.dto.BookDto;
import com.bookstore.mapper.BookMapper;
import com.google.cloud.storage.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.*;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookMapper bookMapper;

    @Autowired
    private LoanedBookRepository loanedBookRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private OnlineBookRepository onlineBookRepository;

    @Autowired
    private LibraryRepository libraryRepository;

    @Autowired
    private UserVoteRepository userVoteRepository;

    @Override
    public BookDto getBookById(int id){
        Book book = bookRepository.findById(id).get();
        return bookMapper.bookToBookDto(book);
    }


    //region books
    @Override
    public Optional<List<BookDto>> getBooks() {
        List<Book> books = new ArrayList<>();
        bookRepository.findAll().forEach(books::add);
        return Optional.ofNullable(bookMapper.bookDoBookDto(books));
    }

    @Override
    public Optional<BookDto> saveBook(BookDto bookDto) {
        bookRepository.save(bookMapper.bookDtoToBook(bookDto));
        return Optional.ofNullable(bookDto);
    }

    @Override
    public Optional<BookDto> deleteBook (int id) {
        BookDto bookDto = getBookById(id);
        bookRepository.delete(bookMapper.bookDtoToBook(bookDto));
        return Optional.ofNullable(bookDto);
    }

    @Override
    public Optional<Map<String, Double>> updateRating (int bookId, int userId, double rating) {
        BookDto bookDto = getBookById(bookId);
        if (bookDto == null) {
            return Optional.ofNullable(null);
        }
        UserVote userVote = userVoteRepository.getByBookIdAndAndUserId(bookId, userId);
        double tempRating = 0;
        Map<String, Double> ratingMap = new HashMap<>();
        if (userVote != null) {
            tempRating = (bookDto.getRating() * bookDto.getVotes()) - userVote.getRating();
            tempRating += rating;
            tempRating = tempRating / bookDto.getVotes();
            bookRepository.updateBookRating(tempRating, (bookDto.getVotes()), bookId);
            ratingMap.put("votes", bookDto.getVotes());
            userVoteRepository.updateRating((int)rating, bookId, userId);
        } else {
            tempRating  = ((bookDto.getRating() * bookDto.getVotes()) + rating) / (bookDto.getVotes() + 1);
            bookRepository.updateBookRating(tempRating, (bookDto.getVotes() + 1), bookId);
            ratingMap.put("votes", bookDto.getVotes() + 1);

            userVote = new UserVote();
            userVote.setBookId(bookId);
            userVote.setUserId(userId);
            userVote.setRating((int)rating);
            userVoteRepository.save(userVote);
        }
        ratingMap.put("rating", tempRating);


        return Optional.ofNullable(ratingMap);
    }
    //endregion

    //region loaned books
    @Override
    public Optional<BookDto> borrowBook(int bookId, int userId) {
        if (bookId == 0 || userId == 0) {
            return Optional.ofNullable(null);
        }

        Book book = bookRepository.findById(bookId).orElse(null);
        if (book == null || (book.getLoaned() + 1) > book.getTotal()) {
            return Optional.ofNullable(null);
        }

        Calendar c = Calendar.getInstance();
        Date date = c.getTime();
        LoanedBook loanedBook = new LoanedBook();
        loanedBook.setBookId(bookId);
        loanedBook.setUserId(userId);
        loanedBook.setLoanedAt(date);
        c.add(Calendar.DATE, 30);
        date = c.getTime();
        loanedBook.setDateToReturn(date);
        int loanedBooks = book.getLoaned() + 1;
        loanedBookRepository.save(loanedBook);
        bookRepository.updateLoanedBooks(loanedBooks, bookId);
        return Optional.ofNullable(bookMapper.bookToBookDto(book));
    }

    @Override
    public Optional<List<BookDto>> getLoanedBooks(int userId){
        List<LoanedBook> loanedBooks = new ArrayList<>();
        loanedBookRepository.findByUserId(userId).forEach(loanedBooks::add);
        List<BookDto> books = new ArrayList<>();
        loanedBooks.forEach(loanedBook ->
                books.add(getBookById(loanedBook.getBookId()))
        );
        return Optional.ofNullable(books);
    }
    //endregion


    //region wishlist
    @Override
    public Optional<BookDto> addWishlistBook(int bookId, int userId) {
        if (bookId == 0 || userId == 0) {
            return Optional.ofNullable(null);
        }
        Book book = bookRepository.findById(bookId).orElse(null);
        if (book == null) {
            return Optional.ofNullable(null);
        }
        Wishlist wishlist = new Wishlist();
        wishlist.setBookId(bookId);
        wishlist.setUserId(userId);
        wishlistRepository.save(wishlist);

        return Optional.ofNullable(bookMapper.bookToBookDto(book));

    }

    @Override
    public Optional<BookDto> deleteWishlistBook(int bookId, int userId) {
        if (bookId == 0 || userId == 0) {
            return Optional.ofNullable(null);
        }
        Book book = bookRepository.findById(bookId).orElse(null);
        if (book == null) {
            return Optional.ofNullable(null);
        }
        wishlistRepository.deleteByBookIdAndUserId(bookId, userId);

        return Optional.ofNullable(bookMapper.bookToBookDto(book));
    }

    @Override
    public Optional<List<BookDto>> getWishlist(int userId) {
        List<Wishlist> wishlists = new ArrayList<>();
        wishlistRepository.findByUserId(userId).forEach(wishlists::add);
        List<BookDto> books = new ArrayList<>();
        wishlists.forEach(wishlist ->
                books.add(getBookById(wishlist.getBookId()))
        );
        return Optional.ofNullable(books);
    }
    //endregion

    //region library
    @Override
    public Optional<List<BookDto>> getLibrary(int userId) {
        List<Library> libraryList = new ArrayList<>();
        libraryRepository.findByUserId(userId).forEach(libraryList::add);
        List<BookDto> books = new ArrayList<>();
        libraryList.forEach(library ->
                books.add(getBookById(library.getBookId()))
        );
        return Optional.ofNullable(books);
    }
    //endregion

    //region online books
    @Override
    public Optional<BookDto> addOnlineBook(int bookId, int userId) {
        if (bookId == 0 || userId == 0) {
            return Optional.ofNullable(null);
        }
        Book book = bookRepository.findById(bookId).orElse(null);
        if (book == null) {
            return Optional.ofNullable(null);
        }
        OnlineBook onlineBook = new OnlineBook();
        onlineBook.setBookId(bookId);
        onlineBook.setUserId(userId);
        onlineBookRepository.save(onlineBook);

        return Optional.ofNullable(bookMapper.bookToBookDto(book));
    }

    @Override
    public Optional<BookDto> deleteOnlineBook(int bookId, int userId) {
        if (bookId == 0 || userId == 0) {
            return Optional.ofNullable(null);
        }
        Book book = bookRepository.findById(bookId).orElse(null);
        if (book == null) {
            return Optional.ofNullable(null);
        }
        onlineBookRepository.deleteByBookIdAndUserId(bookId, userId);

        return Optional.ofNullable(bookMapper.bookToBookDto(book));
    }

    @Override
    public Optional<List<BookDto>> getOnlineBooks(int userId) {
        List<OnlineBook> onlineBooks = new ArrayList<>();
        onlineBookRepository.findByUserId(userId).forEach(onlineBooks::add);
        List<BookDto> books = new ArrayList<>();
        onlineBooks.forEach(loanedBook ->
                books.add(getBookById(loanedBook.getBookId()))
        );
        return Optional.ofNullable(books);
    }
    //endregion
}
