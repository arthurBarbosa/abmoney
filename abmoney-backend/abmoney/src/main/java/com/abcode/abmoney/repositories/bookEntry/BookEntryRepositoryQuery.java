package com.abcode.abmoney.repositories.bookEntry;

import com.abcode.abmoney.dto.StaticalReleaseByCategoryDTO;
import com.abcode.abmoney.dto.StaticalReleaseByDayDTO;
import com.abcode.abmoney.dto.StaticalReleaseByPersonDTO;
import com.abcode.abmoney.entities.BookEntry;
import com.abcode.abmoney.repositories.filter.BookEntryFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface BookEntryRepositoryQuery {

    Page<BookEntry> filter(BookEntryFilter bookEntryFilter, Pageable pageable);
    public List<StaticalReleaseByCategoryDTO> byCategory(LocalDate month);
    public List<StaticalReleaseByDayDTO> byDay(LocalDate month);
    public List<StaticalReleaseByPersonDTO> byPerson(LocalDate init, LocalDate finished);
}
