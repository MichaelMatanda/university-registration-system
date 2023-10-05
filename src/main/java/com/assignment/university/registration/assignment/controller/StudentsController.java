package com.assignment.university.registration.assignment.controller;

import com.assignment.university.registration.assignment.entity.Students;
import com.assignment.university.registration.assignment.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/")
public class StudentsController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/dashboard")
    public String showStudentsList(){
         return "dashboard";
    }
    @GetMapping("/students/new")
    public String showNewForm(Model model){
        model.addAttribute("students", new Students());
        return "students_form";
    }
    @GetMapping("/report")
    public String studentsReport(Model model){
        List<Students> studentsList = studentService.listAll();
        System.out.println(">>>>>>>>>>>>>>>"+studentsList);
        model.addAttribute("studentsList",studentsList);
        return "report";
    }

}
