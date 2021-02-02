package com.abcode.abmoney.resources;

import com.abcode.abmoney.dto.BookEntryDTO;
import com.abcode.abmoney.entities.BookEntry;
import com.abcode.abmoney.repositories.filter.BookEntryFilter;
import com.abcode.abmoney.services.BookEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/bookEntry")
public class BookEntryController {

    @Autowired
    private BookEntryService service;

    @GetMapping
    public ResponseEntity<Page<BookEntryDTO>> findAllPaged(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                                           @RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
                                                           @RequestParam(value = "direction", defaultValue = "DESC") String direction,
                                                           @RequestParam(value = "orderBy", defaultValue = "id") String orderBy) {

        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);

        return ResponseEntity.ok().body(service.findAllPaged(pageRequest));
    }

    @GetMapping(value = "/filter")
    public ResponseEntity<Page<BookEntry>> search(BookEntryFilter bookEntryFilter, Pageable pageable) {
        return ResponseEntity.ok().body(service.search(bookEntryFilter, pageable));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<BookEntryDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<BookEntryDTO> insert(@RequestBody BookEntryDTO dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<BookEntryDTO> update(@PathVariable Long id, @RequestBody BookEntryDTO dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }


}
