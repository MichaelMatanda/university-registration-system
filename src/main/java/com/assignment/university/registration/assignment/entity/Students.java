package com.assignment.university.registration.assignment.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Table(name="students")
public class Students {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false, unique = true)
    @NotNull(message = "Registration Number can not be empty")
    private String registrationNumber;
    @Column(nullable = false)
    private String phoneNumber;
    private LocalDate startDate;
    private LocalDate endDate;
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @NotNull(message = "National Id can not be empty")
    @Column(nullable = false, unique = true)
    private String nationalId;
    private LocalDate dateOfBirth;
    @NotNull(message = "Program can not be empty!")
    @Column(nullable = false)
    private String program;
    @NotNull(message = "School fees can not be empty")
    @Column(nullable = false)
    private BigDecimal schoolFees;
    @Column(nullable = false)
    private boolean decisionOfSchoolFees;
}
