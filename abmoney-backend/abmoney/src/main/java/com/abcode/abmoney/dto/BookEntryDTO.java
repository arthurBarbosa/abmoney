package com.abcode.abmoney.dto;

import com.abcode.abmoney.entities.BookEntry;
import com.abcode.abmoney.entities.BookEntryType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookEntryDTO implements Serializable {

    private Long id;
    private String description;

    private LocalDate dueDate;

    private LocalDate paymentDate;
    private BigDecimal value;
    private String observation;
    private BookEntryType type;
    private CategoryDTO categoryDTO;
    private PersonDTO personDTO;

    public BookEntryDTO(BookEntry entity) {
        this.id = entity.getId();
        this.description = entity.getDescription();
        this.dueDate = entity.getDueDate();
        this.paymentDate = entity.getPaymentDate();
        this.value = entity.getValue();
        this.observation = entity.getObservation();
        this.type = entity.getType();
        this.categoryDTO = new CategoryDTO(entity.getCategory());
        this.personDTO = new PersonDTO(entity.getPerson());
    }
}
