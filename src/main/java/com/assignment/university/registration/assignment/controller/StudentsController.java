package com.assignment.university.registration.assignment.controller;

import com.assignment.university.registration.assignment.entity.Students;
import com.assignment.university.registration.assignment.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class StudentsController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/students")
    public String showStudentsList(Model model){
         List<Students> studentsList = studentService.listAll();
         model.addAttribute("StudentsList",studentsList);
         System.out.println("Main Controller");
         return "studentsPage";
    }
}
