package com.abcode.abmoney.services;

import com.abcode.abmoney.dto.PersonDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface PersonService {

    Page<PersonDTO> findAllPaged(PageRequest pageRequest);

    PersonDTO findById(Long id);

    PersonDTO insert(PersonDTO dto);

    PersonDTO update(Long id, PersonDTO dto);

    void delete(Long id);
}
