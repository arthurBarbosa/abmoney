package com.abcode.abmoney.services;

import com.abcode.abmoney.dto.CategoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface CategoryService {

    Page<CategoryDTO> findAllPaged(PageRequest pageRequest);

    CategoryDTO findById(Long id);

    CategoryDTO insert(CategoryDTO dto);

    CategoryDTO update(Long id, CategoryDTO dto);

    void delete(Long id);

    List<CategoryDTO> listAll();
}
