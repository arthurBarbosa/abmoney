package com.abcode.abmoney.repositories.bookEntry;

import com.abcode.abmoney.entities.BookEntry;
import com.abcode.abmoney.repositories.filter.BookEntryFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BookEntryRepositoryQuery {

    Page<BookEntry> filter(BookEntryFilter bookEntryFilter, Pageable pageable);
}
