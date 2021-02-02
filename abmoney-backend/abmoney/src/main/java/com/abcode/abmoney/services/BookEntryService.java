package com.abcode.abmoney.services;

import com.abcode.abmoney.dto.BookEntryDTO;
import com.abcode.abmoney.entities.BookEntry;
import com.abcode.abmoney.repositories.filter.BookEntryFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BookEntryService {

    Page<BookEntryDTO> findAllPaged(PageRequest pageRequest);

    BookEntryDTO findById(Long id);

    BookEntryDTO insert(BookEntryDTO dto);

    BookEntryDTO update(Long id, BookEntryDTO dto);

    void delete(Long id);

    Page<BookEntry> search(BookEntryFilter bookEntryFilter, Pageable pageable);
}
