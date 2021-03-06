package com.abcode.abmoney.services.impl;

import com.abcode.abmoney.dto.BookEntryDTO;
import com.abcode.abmoney.dto.StaticalReleaseByPersonDTO;
import com.abcode.abmoney.entities.BookEntry;
import com.abcode.abmoney.repositories.BookEntryRepository;
import com.abcode.abmoney.repositories.CategoryRepository;
import com.abcode.abmoney.repositories.PersonRepository;
import com.abcode.abmoney.repositories.filter.BookEntryFilter;
import com.abcode.abmoney.services.BookEntryService;
import com.abcode.abmoney.services.exceptions.ResourceNotFoundException;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.io.InputStream;
import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Override
    public byte[] reportByPerson(LocalDate init, LocalDate finished) throws JRException {
        List<StaticalReleaseByPersonDTO> data = repository.byPerson(init, finished);

        Map<String, Object> paramters = new HashMap<>();
        paramters.put("DT_INIT", Date.valueOf(init));
        paramters.put("DT_FINISHED", Date.valueOf(finished));

        InputStream inputStream = this.getClass().getResourceAsStream("report/bookentry-by-person.jasper");

        JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, paramters, new JRBeanCollectionDataSource(data));
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    @Scheduled(cron = "0 0 6 * * *")
    public void bookEntryDueDateExpiration(){
        System.out.println("RODOU !!!!!!!!!!");
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
