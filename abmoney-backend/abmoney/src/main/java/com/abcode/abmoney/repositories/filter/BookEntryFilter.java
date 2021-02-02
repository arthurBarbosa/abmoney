package com.abcode.abmoney.repositories.filter;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
public class BookEntryFilter {

    private String description;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate expirationDateBy;

}
