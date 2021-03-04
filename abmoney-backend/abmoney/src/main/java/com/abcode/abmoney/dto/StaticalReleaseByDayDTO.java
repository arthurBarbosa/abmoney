package com.abcode.abmoney.dto;

import com.abcode.abmoney.entities.BookEntryType;
import com.abcode.abmoney.entities.Category;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

public class StaticalReleaseByDayDTO implements Serializable {

    private BookEntryType type;
    private LocalDate day;
    private BigDecimal total;

    public StaticalReleaseByDayDTO() {
    }

    public StaticalReleaseByDayDTO(BookEntryType type, LocalDate day, BigDecimal total) {
        this.type = type;
        this.day = day;
        this.total = total;
    }

    public BookEntryType getType() {
        return type;
    }

    public void setType(BookEntryType type) {
        this.type = type;
    }

    public LocalDate getDay() {
        return day;
    }

    public void setDay(LocalDate day) {
        this.day = day;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
