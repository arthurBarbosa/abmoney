package com.abcode.abmoney.dto;

import com.abcode.abmoney.entities.Category;

import java.io.Serializable;
import java.math.BigDecimal;

public class StaticalReleaseByCategoryDTO implements Serializable {

    private Category category;
    private BigDecimal total;

    public StaticalReleaseByCategoryDTO() {
    }

    public StaticalReleaseByCategoryDTO(Category category, BigDecimal total) {
        this.category = category;
        this.total = total;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
