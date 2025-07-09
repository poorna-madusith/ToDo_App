package com.example.Todo.dtos;

import lombok.Data;

@Data
public class ProfileUpdateDto {

    private String username;
    private String email;
    private String currentEmail;
    private String oldPassword;
    private String newPassword;
}
