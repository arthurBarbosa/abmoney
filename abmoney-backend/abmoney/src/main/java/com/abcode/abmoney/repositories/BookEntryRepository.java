package com.abcode.abmoney.repositories;

import com.abcode.abmoney.entities.BookEntry;
import com.abcode.abmoney.repositories.bookEntry.BookEntryRepositoryQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookEntryRepository extends JpaRepository<BookEntry, Long>, BookEntryRepositoryQuery {

    List<BookEntry> findByDueDateLessThanEqualAndPaymentDateIsNull(LocalDate date);
}
