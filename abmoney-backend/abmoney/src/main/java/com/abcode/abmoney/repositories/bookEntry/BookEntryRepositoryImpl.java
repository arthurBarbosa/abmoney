package com.abcode.abmoney.repositories.bookEntry;

import com.abcode.abmoney.dto.StaticalReleaseByCategoryDTO;
import com.abcode.abmoney.entities.BookEntry;
import com.abcode.abmoney.entities.BookEntry_;
import com.abcode.abmoney.repositories.filter.BookEntryFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class BookEntryRepositoryImpl implements BookEntryRepositoryQuery {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public Page<BookEntry> filter(BookEntryFilter bookEntryFilter, Pageable pageable) {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<BookEntry> criteria = builder.createQuery(BookEntry.class);
        Root<BookEntry> root = criteria.from(BookEntry.class);

        Predicate[] predicates = createRestriction(bookEntryFilter, builder, root);
        criteria.where(predicates);

        TypedQuery<BookEntry> query = manager.createQuery(criteria);
        addRestrictionPagination(query, pageable);

        return new PageImpl<>(query.getResultList(), pageable, total(bookEntryFilter));
    }

    @Override
    public List<StaticalReleaseByCategoryDTO> byCategory(LocalDate month) {
        CriteriaBuilder criteriaBuilder = manager.getCriteriaBuilder();

        CriteriaQuery<StaticalReleaseByCategoryDTO> criteriaQuery = criteriaBuilder.createQuery(StaticalReleaseByCategoryDTO.class);

        Root<BookEntry> root = criteriaQuery.from(BookEntry.class);

        criteriaQuery.select(criteriaBuilder.construct(StaticalReleaseByCategoryDTO.class,
                root.get(BookEntry_.CATEGORY),
                criteriaBuilder.sum(root.get(BookEntry_.VALUE))));

        LocalDate firstDay = month.withDayOfMonth(1);
        LocalDate finalDay = month.withDayOfMonth(month.lengthOfMonth());

        criteriaQuery.where(
                criteriaBuilder.greaterThanOrEqualTo(root.get(BookEntry_.DUE_DATE), firstDay),
                criteriaBuilder.lessThanOrEqualTo(root.get(BookEntry_.DUE_DATE), finalDay));

        criteriaQuery.groupBy(root.get(BookEntry_.CATEGORY));

        TypedQuery<StaticalReleaseByCategoryDTO> typedQuery = manager.createQuery(criteriaQuery);

        return typedQuery.getResultList();
    }


    private Predicate[] createRestriction(BookEntryFilter bookEntryFilter, CriteriaBuilder builder, Root<BookEntry> root) {
        List<Predicate> predicates = new ArrayList<>();

        if (bookEntryFilter.getDescription() != null) {
            predicates.add(builder.like(builder.lower(root.get("description")), "%" + bookEntryFilter.getDescription().toLowerCase() + "%"));
        }
        if (bookEntryFilter.getDueDate() != null) {
            predicates.add(builder.greaterThanOrEqualTo(root.get("dueDate"), bookEntryFilter.getDueDate()));
        }
        if (bookEntryFilter.getExpirationDateBy() != null) {
            predicates.add(builder.lessThanOrEqualTo(root.get("dueDate"), bookEntryFilter.getExpirationDateBy()));
        }
        return predicates.toArray(new Predicate[predicates.size()]);
    }

    private void addRestrictionPagination(TypedQuery<BookEntry> query, Pageable pageable) {
        int currentPage = pageable.getPageNumber();
        int linesPerPage = pageable.getPageSize();
        int firstRegisterPerPage = currentPage * linesPerPage;

        query.setFirstResult(firstRegisterPerPage);
        query.setMaxResults(linesPerPage);
    }

    private Long total(BookEntryFilter bookEntryFilter) {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
        Root<BookEntry> root = criteria.from(BookEntry.class);

        Predicate[] predicates = createRestriction(bookEntryFilter, builder, root);
        criteria.where(predicates);

        criteria.select(builder.count(root));
        return manager.createQuery(criteria).getSingleResult();

    }

}
