package com.abcode.abmoney.repositories;

import com.abcode.abmoney.entities.Category;
import com.abcode.abmoney.entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
}
