package com.abcode.abmoney.entities;

import lombok.Getter;

@Getter
public enum BookEntryType {

    RECEITA("Receita"),
    DESPESA("Despesa");

    private final String description;

    BookEntryType(String description) {
        this.description = description;
    }

}
