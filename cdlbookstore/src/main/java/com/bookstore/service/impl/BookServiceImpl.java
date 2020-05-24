package com.bookstore.service.impl;

import com.bookstore.dto.*;
import com.bookstore.entities.*;
import com.bookstore.mapper.AuthorMapper;
import com.bookstore.mapper.GenreMapper;
import com.bookstore.repositories.*;
import com.bookstore.service.*;
import com.bookstore.mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

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

    @Autowired
    private UserBookstoreService userBookstoreService;

    @Autowired
    private AddressService addressService;

    @Autowired
    private UserCredentialsService userCredentialsService;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private GenreRepository genreRepository;

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
        Book book = bookMapper.bookDtoToBook(bookDto);
        Set<Author> authorSet = new HashSet<>();
        for( Author author: book.getAuthors()) {
            authorSet.add(authorRepository.findById(author.getId()).orElse(null));
        }
        book.setAuthors(authorSet);
        Set<Genre> genreSet = new HashSet<>();
        for( Genre genre: book.getGenres()) {
            genreSet.add(genreRepository.findById(genre.getId()).orElse(null));
        }
        book.setGenres(genreSet);
        Book tempBook = bookRepository.save(book);
        return Optional.ofNullable(bookMapper.bookToBookDto(tempBook));
    }

    @Override
    public Optional<BookDto> deleteBook (int id) {
        BookDto bookDto = getBookById(id);
        bookRepository.delete(bookMapper.bookDtoToBook(bookDto));
        return Optional.ofNullable(bookDto);
    }

    @Override
    public Optional<BookDto> updateBook (BookDto bookDto) {
        Book book = bookMapper.bookDtoToBook(bookDto);
        bookRepository.save(book);
        return Optional.ofNullable(getBookById(bookDto.getId()));
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
        loanedBook.setOrdered(true);
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
        if (bookId != 0 && userId != 0) {
            Book book = bookRepository.findById(bookId).orElse(null);
            if (book == null) {
                return Optional.ofNullable(null);
            }
            OnlineBook onlineBook = new OnlineBook();
            onlineBook.setBookId(bookId);
            onlineBook.setUserId(userId);
            onlineBookRepository.save(onlineBook);

            return Optional.ofNullable(bookMapper.bookToBookDto(book));
        } else {
            return Optional.ofNullable(null);
        }
    }

    @Override
    public Optional<BookDto> deleteOnlineBook(int bookId, int userId) {
        if (bookId != 0 && userId != 0) {
            Book book = bookRepository.findById(bookId).orElse(null);
            if (book == null) {
                return Optional.ofNullable(null);
            }
            onlineBookRepository.deleteByBookIdAndUserId(bookId, userId);

            return Optional.ofNullable(bookMapper.bookToBookDto(book));
        } else {
            return Optional.ofNullable(null);
        }
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

    //region management books
    @Override
    public Optional<Map<String, Map<String, Object>>> getExpiredLoanBooks() {
        Map<String, Map<String, Object>> responseBooks = new HashMap<>();
        List<LoanedBook> loanedBooks = loanedBookRepository.findByDeliveredTrueAndReturnedFalse();
        List<LoanedBook> expiredLoan = new ArrayList<>();
        loanedBooks.forEach(loanedBook -> {
            Instant now = new Date().toInstant();
            Instant returnDate = loanedBook.getDateToReturn().toInstant();
            int days = (int) ChronoUnit.DAYS.between(now, returnDate);

            if (days <= 2) {
                expiredLoan.add(loanedBook);
            }
        });
        this.serializeBooks(expiredLoan, responseBooks);
        return Optional.ofNullable(responseBooks);
    }

    @Override
    public Optional<Map<String, Map<String, Object>>> getOrderedBooks() {
        Map<String, Map<String, Object>> responseBooks = new HashMap<>();
        List<LoanedBook> loanedBooks = loanedBookRepository.findByOrderedTrueAndDeliveredFalse();

        serializeBooks(loanedBooks, responseBooks);

        return Optional.ofNullable(responseBooks);

    }

    @Override
    public Optional<Map<String, Map<String, Object>>> getReturnedBooks() {
        Map<String, Map<String, Object>> responseBooks = new HashMap<>();
        List<LoanedBook> loanedBooks = loanedBookRepository.findByReturnedTrue();

        serializeBooks(loanedBooks, responseBooks);

        return Optional.ofNullable(responseBooks);
    }

    private void serializeBooks(List<LoanedBook> loanedBooks, Map<String, Map<String, Object>> responseBooks) {
        AtomicInteger idx = new AtomicInteger();
        loanedBooks.forEach(e -> {
            Map<String, Object> tempBook = new HashMap<>();
            Book book = bookRepository.findById(e.getBookId()).orElse(null);
            if (book != null) {
                tempBook.put("bookName", book.getName());
                tempBook.put("bookId", book.getId());
            }
            UserBookstoreDto user = userBookstoreService.getUserById(e.getUserId()).orElse(null);
            if (user != null) {
                tempBook.put("clientName", user.getFirstName() + " " + user.getLastName());
                tempBook.put("phoneNumber", user.getPhoneNumber());
                tempBook.put("userId", user.getId());
                AddressDto address = addressService.getAddress(user.getId()).orElse(null);
                if (address != null) {
                    tempBook.put("address", address.getAddress());
                    tempBook.put("city", address.getCity());
                    tempBook.put("district", address.getDistrict());
                }
                UserCredentialsDto userCredentials = userCredentialsService.findUserByUserId(user.getId());
                if (userCredentials != null) {
                    tempBook.put("email", userCredentials.getEmail());
                }
                Instant now = new Date().toInstant();
                Instant returnDate = e.getDateToReturn().toInstant();
                int days = (int) ChronoUnit.DAYS.between(now, returnDate);
                tempBook.put("remainedDays", days);
                tempBook.put("dateToReturn", e.getDateToReturn());
                responseBooks.put("idx", tempBook);
                idx.getAndIncrement();
            }
        });
    }

    @Override
    public Optional<Boolean> deleteOrderedBooks(int bookId, int userId) {
        LoanedBook loanedBook = loanedBookRepository.findByBookIdAndUserId(bookId, userId);
        if (loanedBook != null) {
            loanedBookRepository.updateLoanedBooks(true, bookId, userId);
            return Optional.ofNullable(true);
        }
        return Optional.ofNullable(false);
    }

    @Override
    public Optional<BookDto> returnBook(int bookId, int userId) {
        LoanedBook loanedBook = loanedBookRepository.findByBookIdAndUserId(bookId, userId);
        if (loanedBook != null) {
            loanedBookRepository.updateReturnedBook(true, bookId, userId);
            BookDto bookDto = getBookById(bookId);
            return Optional.ofNullable(bookDto);
        }
        return Optional.ofNullable(null);
    }

    @Override
    public Optional<Boolean> confirmBookReturn(int bookId, int userId) {
        LoanedBook loanedBook = loanedBookRepository.findByBookIdAndUserId(bookId, userId);
        if (loanedBook != null) {
            loanedBookRepository.delete(loanedBook);
            return Optional.ofNullable(true);
        }
        return Optional.ofNullable(false);
    }
    //endregion
}
