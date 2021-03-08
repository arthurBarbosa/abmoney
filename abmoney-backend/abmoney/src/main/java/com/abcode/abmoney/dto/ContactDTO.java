package com.abcode.abmoney.dto;

import com.abcode.abmoney.entities.Contact;
import com.abcode.abmoney.entities.Person;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactDTO implements Serializable {

    private Long id;
    private String name;
    private String email;
    private String phone;

    public ContactDTO(Contact entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.phone = entity.getPhone();
    }
}
