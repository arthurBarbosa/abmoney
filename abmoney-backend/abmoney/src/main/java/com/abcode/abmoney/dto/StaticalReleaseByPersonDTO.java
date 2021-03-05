package com.abcode.abmoney.dto;

import com.abcode.abmoney.entities.BookEntryType;
import com.abcode.abmoney.entities.Category;
import com.abcode.abmoney.entities.Person;

import java.io.Serializable;
import java.math.BigDecimal;

public class StaticalReleaseByPersonDTO implements Serializable {

    private BookEntryType type;
    private Person person;
    private BigDecimal total;

    public StaticalReleaseByPersonDTO() {
    }

    public StaticalReleaseByPersonDTO(BookEntryType type, Person person, BigDecimal total) {
        this.type = type;
        this.person = person;
        this.total = total;
    }

    public BookEntryType getType() {
        return type;
    }

    public void setType(BookEntryType type) {
        this.type = type;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
