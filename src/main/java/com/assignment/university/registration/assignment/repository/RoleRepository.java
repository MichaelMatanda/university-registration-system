package com.assignment.university.registration.assignment.repository;

import com.assignment.university.registration.assignment.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
