package com.assignment.university.registration.assignment;

import com.assignment.university.registration.assignment.entity.Students;
import com.assignment.university.registration.assignment.entity.User;
import com.assignment.university.registration.assignment.repository.StudentsRepository;
import com.assignment.university.registration.assignment.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace =  AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentsRepository studentsRepository;

//    @Test
//    public void testUser(){
//        User user = new User();
//        user.setFirstName("michael");
//        user.setLastName("matanda");
//        user.setEmail("mmatanda@gmail.com");
//        user.setPassword("takwana");
//        User savedUser = userRepository.save(user);
//        Assertions.assertNotNull(savedUser);
//        Assertions.assertNotNull(user.getId());
//    }

//    @Test
//    public void testAddNew(){
//        Students students = new Students();
//        students.setEmail("tinashe@msu.ac.zw");
//        students.setFirstName("tinashe");
//        students.setLastName("nyamutowa");
//        students.setDateOfBirth(LocalDate.now());
//        students.setPhoneNumber("263772892905");
//        students.setNationalId("62-554023P55");
//        students.setProgram("BSIT");
//        students.setRegistrationNumber("R232176H");
//        students.setDecisionOfSchoolFees(true);
//        students.setSchoolFees(BigDecimal.valueOf(200));
//        students.setStartDate(LocalDate.now());
//        students.setEndDate(LocalDate.now());
//        Students savedStudents =studentsRepository.save(students);
//        Assertions.assertNotNull(savedStudents);
//    }
//    @Test
//    public void testListAll(){
//        Iterable<Students> students =studentsRepository.findAll();
//
//        for(Students students1 : students) {
//            System.out.println(students1);
//        }
//    }

//    @Test
//    public void testUpdate(){
//        long studentId = 1;
//        Optional<Students> optionalStudents =studentsRepository.findById((long) studentId);
//        Students students = optionalStudents.get();
//        students.setLastName("munashe");
//        students.setEndDate(LocalDate.now());
//        students.setSchoolFees(BigDecimal.valueOf(800));
//        studentsRepository.save(students);
//        Students updatedStudent = studentsRepository.findById((long) studentId).get();
//    }
//
//    @Test
//    public void testGet(){
//        long studentId = 1;
//        Optional<Students> optionalStudents =studentsRepository.findById((long) studentId);
//        Students students = optionalStudents.get();
//        System.out.println(optionalStudents.get());
//    }
//
//    @Test
//    public void testDelete(){
//    long studentId =2;
//    studentsRepository.deleteById(studentId);
//    }
}
