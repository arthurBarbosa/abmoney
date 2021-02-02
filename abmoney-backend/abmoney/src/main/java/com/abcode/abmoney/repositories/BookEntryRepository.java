package com.abcode.abmoney.repositories;

import com.abcode.abmoney.entities.BookEntry;
import com.abcode.abmoney.repositories.bookEntry.BookEntryRepositoryQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookEntryRepository extends JpaRepository<BookEntry, Long>, BookEntryRepositoryQuery {
}
