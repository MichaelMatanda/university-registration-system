package com.assignment.university.registration.assignment.repository;

import com.assignment.university.registration.assignment.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
