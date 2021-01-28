package com.abcode.abmoney.repositories;

import com.abcode.abmoney.entities.Category;
import com.abcode.abmoney.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}
