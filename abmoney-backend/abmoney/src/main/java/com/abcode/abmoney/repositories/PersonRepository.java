package com.abcode.abmoney.repositories;

import com.abcode.abmoney.entities.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Page<Person> findByNameIsContainingIgnoreCase(String name, Pageable pageable);
}
