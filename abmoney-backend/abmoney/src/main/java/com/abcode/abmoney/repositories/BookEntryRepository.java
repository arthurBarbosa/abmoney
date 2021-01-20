package com.abcode.abmoney.repositories;

import com.abcode.abmoney.entities.BookEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookEntryRepository extends JpaRepository<BookEntry, Long> {
}
