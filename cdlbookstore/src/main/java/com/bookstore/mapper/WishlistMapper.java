package com.bookstore.mapper;

import com.bookstore.dto.WishlistDto;
import com.bookstore.entities.Wishlist;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface WishlistMapper {

    WishlistDto wishlistDtoToWishlist(Wishlist wishlist);
    List<WishlistDto> wishlistDtoToWishlist(List<Wishlist> wishlistList);
    Wishlist wishlistToWishlistDto(WishlistDto wishlistDto);
    List<Wishlist> wishlistToWishlistDto(List<WishlistDto> wishlistDtoList);
}
