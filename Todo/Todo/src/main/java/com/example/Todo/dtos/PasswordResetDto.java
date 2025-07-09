package com.example.Todo.dtos;

import lombok.Data;

@Data
public class PasswordResetDto {
    private String token;
    private String newPassword;
}