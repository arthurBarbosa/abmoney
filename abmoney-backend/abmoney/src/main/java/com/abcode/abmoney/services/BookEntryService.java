package com.abcode.abmoney.services;

import com.abcode.abmoney.dto.BookEntryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface BookEntryService {

    Page<BookEntryDTO> findAllPaged(PageRequest pageRequest);

    BookEntryDTO findById(Long id);

    BookEntryDTO insert(BookEntryDTO dto);

    BookEntryDTO update(Long id, BookEntryDTO dto);

    void delete(Long id);
}
