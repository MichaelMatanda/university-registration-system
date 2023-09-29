package com.assignment.university.registration.assignment.service;

import com.assignment.university.registration.assignment.entity.Students;
import com.assignment.university.registration.assignment.repository.StudentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentsRepository studentsRepository;

    public List<Students> listAll(){
        return (List<Students>) studentsRepository.findAll();
    }
}
