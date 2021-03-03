package com.abcode.abmoney.services.impl;

import com.abcode.abmoney.dto.BookEntryDTO;
import com.abcode.abmoney.entities.BookEntry;
import com.abcode.abmoney.repositories.filter.BookEntryFilter;
import com.abcode.abmoney.repositories.BookEntryRepository;
import com.abcode.abmoney.repositories.CategoryRepository;
import com.abcode.abmoney.repositories.PersonRepository;
import com.abcode.abmoney.services.BookEntryService;
import com.abcode.abmoney.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class BookEntryServiceImpl implements BookEntryService {

    @Autowired
    private BookEntryRepository repository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PersonRepository personRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<BookEntryDTO> findAllPaged(PageRequest pageRequest) {
        var list = repository.findAll(pageRequest);
        return list.map(BookEntryDTO::new);
    }

    @Override
    @Transactional(readOnly = true)
    public BookEntryDTO findById(Long id) {
        var entity = repository.findById(id);
        return new BookEntryDTO(entity.orElseThrow(() -> new ResourceNotFoundException("Entity not found")));
    }

    @Override
    @Transactional
    public BookEntryDTO insert(BookEntryDTO dto) {
        var entity = new BookEntry();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new BookEntryDTO(entity);
    }

    @Override
    @Transactional
    public BookEntryDTO update(Long id, BookEntryDTO dto) {
        try {
            var entity = repository.getOne(id);
            copyDtoToEntity(dto, entity);
            entity = repository.save(entity);
            return new BookEntryDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }

    }

    @Override
    @Transactional
    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
    }

    @Override
    public Page<BookEntry> search(BookEntryFilter bookEntryFilter, Pageable pageable) {
        return repository.filter(bookEntryFilter, pageable);
    }

    private void copyDtoToEntity(BookEntryDTO dto, BookEntry entity) {

        var category = categoryRepository.getOne(dto.getCategoryDTO().getId());
        var person = personRepository.getOne(dto.getPersonDTO().getId());

        entity.setDescription(dto.getDescription());
        entity.setDueDate(dto.getDueDate());
        entity.setPaymentDate(dto.getPaymentDate());
        entity.setValue(dto.getValue());
        entity.setObservation(dto.getObservation());
        entity.setType(dto.getType());
        entity.setCategory(category);
        entity.setPerson(person);
    }
}
