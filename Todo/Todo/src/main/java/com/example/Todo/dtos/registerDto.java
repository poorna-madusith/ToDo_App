package com.example.Todo.dtos;

import lombok.Data;

@Data
public class RegisterDto {
    public String username;
    private String email;
    private String password;
}

