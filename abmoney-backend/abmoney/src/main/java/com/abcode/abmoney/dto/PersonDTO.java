package com.abcode.abmoney.dto;

import com.abcode.abmoney.entities.Address;
import com.abcode.abmoney.entities.Category;
import com.abcode.abmoney.entities.Person;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonDTO {

    private Long id;
    private String name;
    private Boolean status;
    private Address address;

    public PersonDTO(Person entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.status = entity.getStatus();
        this.address = entity.getAddress();
    }

}
