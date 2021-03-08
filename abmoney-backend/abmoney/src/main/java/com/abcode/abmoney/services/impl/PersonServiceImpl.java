package com.abcode.abmoney.services.impl;

import com.abcode.abmoney.dto.ContactDTO;
import com.abcode.abmoney.dto.PersonDTO;
import com.abcode.abmoney.entities.Contact;
import com.abcode.abmoney.entities.Person;
import com.abcode.abmoney.repositories.ContactRepository;
import com.abcode.abmoney.repositories.PersonRepository;
import com.abcode.abmoney.services.PersonService;
import com.abcode.abmoney.services.exceptions.DatabaseException;
import com.abcode.abmoney.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonRepository repository;

    @Autowired
    private ContactRepository contactRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<PersonDTO> findAllPaged(PageRequest pageRequest) {
        var list = repository.findAll(pageRequest);
        return list.map(PersonDTO::new);
    }

    @Override
    @Transactional(readOnly = true)
    public PersonDTO findById(Long id) {
        var entity = repository.findById(id);
        return new PersonDTO(entity.orElseThrow(() -> new ResourceNotFoundException("Entity not found")));
    }

    @Override
    @Transactional
    public PersonDTO insert(PersonDTO dto) {
        var entity = new Person();
        copyDtoToEntity(dto, entity);
        return new PersonDTO(entity);
    }

    @Override
    @Transactional
    public PersonDTO update(Long id, PersonDTO dto) {
        try {
            var entity = repository.getOne(id);
            copyDtoToEntity(dto, entity);
            return new PersonDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }

    }

    @Override
    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Não é possível remover uma pessoa com vinculo");
        }
    }

    @Override
    public void inactivePerson(Long id, Boolean status) {
        var person = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nenhuma Pessoa encontrada com"));
        person.setStatus(status);
        repository.save(person);
    }

    private void copyDtoToEntity(PersonDTO dto, Person entity) {
        entity.setName(dto.getName());
        entity.setStatus(dto.getStatus());
        entity.setAddress(dto.getAddress());
        entity = repository.save(entity);
        if (dto.getContactDTOS().size() == 0) {
            entity.getContacts().clear();
        }

        for (ContactDTO contactDTO : dto.getContactDTOS()) {
            Contact contact = new Contact();
            var idPerson = entity.getId();
            var person = repository.getOne(idPerson);

            if (person.getContacts().size() != 0) {
                var contatoBase = contactRepository.findById(contactDTO.getId()).get();
                contatoBase.setId(contatoBase.getId());
                contatoBase.setName(contactDTO.getName());
                contatoBase.setEmail(contactDTO.getEmail());
                contatoBase.setPhone(contactDTO.getPhone());
                contatoBase.setPerson(person);
                contactRepository.save(contatoBase);
            } else {
                contact.setId(contactDTO.getId());
                contact.setName(contactDTO.getName());
                contact.setEmail(contactDTO.getEmail());
                contact.setPhone(contactDTO.getPhone());
                contact.setPerson(person);
                contact = contactRepository.save(contact);
                entity.getContacts().add(contact);
            }

        }

    }

}
