package com.abcode.abmoney.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Address {

    public String publicPlace;
    private String zipCode;
    private String city;
    private String state;
    private String number;
    private String neighborhood;
    private String complement;
}
