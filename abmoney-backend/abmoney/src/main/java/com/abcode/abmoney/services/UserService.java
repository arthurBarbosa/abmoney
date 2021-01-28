package com.abcode.abmoney.services;

import com.abcode.abmoney.entities.User;

public interface UserService {

    User findByEmail(String email);
}
