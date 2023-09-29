package com.assignment.university.registration.assignment.repository;

import com.assignment.university.registration.assignment.entity.Students;
import org.springframework.data.repository.CrudRepository;

public interface StudentsRepository extends CrudRepository<Students, Long> {
}
