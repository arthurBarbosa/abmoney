package com.abcode.abmoney.resources;

import com.abcode.abmoney.dto.BookEntryDTO;
import com.abcode.abmoney.dto.StaticalReleaseByCategoryDTO;
import com.abcode.abmoney.dto.StaticalReleaseByDayDTO;
import com.abcode.abmoney.entities.BookEntry;
import com.abcode.abmoney.repositories.BookEntryRepository;
import com.abcode.abmoney.repositories.filter.BookEntryFilter;
import com.abcode.abmoney.services.BookEntryService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/bookEntry")
public class BookEntryController {

    @Autowired
    private BookEntryService service;

    @Autowired
    private BookEntryRepository bookEntryRepository;

    @GetMapping
    public ResponseEntity<Page<BookEntryDTO>> findAllPaged(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                                           @RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
                                                           @RequestParam(value = "direction", defaultValue = "DESC") String direction,
                                                           @RequestParam(value = "orderBy", defaultValue = "id") String orderBy) {

        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);

        return ResponseEntity.ok().body(service.findAllPaged(pageRequest));
    }

    @GetMapping(value = "/statistics-by-category")
    public ResponseEntity<List<StaticalReleaseByCategoryDTO>> statisticsByCategory() {
        return ResponseEntity.ok().body(bookEntryRepository.byCategory(LocalDate.now()));
    }

    @GetMapping(value = "/statistics-by-day")
    public ResponseEntity<List<StaticalReleaseByDayDTO>> statisticsByDay() {
        return ResponseEntity.ok().body(bookEntryRepository.byDay(LocalDate.now().withMonth(2)));
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

    @GetMapping(value = "/report-by-person")
    public ResponseEntity<byte[]> reportByPerson(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate init,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate finished) throws JRException {

        byte[] report = service.reportByPerson(init, finished);

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE).body(report);
    }

    @PostMapping("/upload-file")
    public String upload(@RequestParam("file") MultipartFile file) throws IOException {
        OutputStream outputStream = new FileOutputStream("/home/arthur.barbosa/Desenvolvimento/project-pratice/ws-abmoney/abmoney-angular-ui/abmoney-ui-primeng/abmoney-ui/src/assets/" + file.getOriginalFilename());
        outputStream.write(file.getBytes());
        outputStream.close();
        return "ok";

    }

}
