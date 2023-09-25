package com.assignment.university.registration.assignment.service;

import com.assignment.university.registration.assignment.dto.UserDto;
import com.assignment.university.registration.assignment.entity.User;

import java.util.List;

public interface UserService {
    void saveUser(UserDto userDto);

    User findUserByEmail(String email);

    List<UserDto> findAllUsers();
}
