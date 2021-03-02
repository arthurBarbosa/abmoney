package com.abcode.abmoney.resources;

import com.abcode.abmoney.dto.PersonDTO;
import com.abcode.abmoney.entities.Person;
import com.abcode.abmoney.repositories.PersonRepository;
import com.abcode.abmoney.services.PersonService;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping(value = "/persons")
public class PersonController {

    @Autowired
    private PersonService service;

    @Autowired
    private PersonRepository personRepository;

    @GetMapping
    public ResponseEntity<Page<PersonDTO>> findAllPaged(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                                        @RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
                                                        @RequestParam(value = "direction", defaultValue = "DESC") String direction,
                                                        @RequestParam(value = "orderBy", defaultValue = "name") String orderBy) {

        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);

        return ResponseEntity.ok().body(service.findAllPaged(pageRequest));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<PersonDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<PersonDTO> insert(@RequestBody PersonDTO dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<PersonDTO> update(@PathVariable Long id, @RequestBody PersonDTO dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping(value = "/search")
    public Page<Person> search(@RequestParam(required = false, defaultValue = "%") String name, Pageable pageable) {
        return personRepository.findByNameIsContainingIgnoreCase(name, pageable);
    }

    @PutMapping(value = "/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable Long id, @RequestBody Boolean status) {
        service.inactivePerson(id, status);
        return ResponseEntity.noContent().build();
    }


}
