package com.bookstore.service;

import java.util.Map;
import java.util.Optional;

public interface BusinessService {
    Optional<Map<String, String>> signUp(Map<String, String> userDetails);
}
