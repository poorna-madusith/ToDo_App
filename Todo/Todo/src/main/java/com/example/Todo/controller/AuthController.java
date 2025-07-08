package com.example.Todo.controller;

import com.example.Todo.dtos.LoginDto;
import com.example.Todo.dtos.RegisterDto;
import com.example.Todo.dtos.AuthResponseDto;
import com.example.Todo.models.User;
import com.example.Todo.security.JwtUtil;
import com.example.Todo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterDto registerDto) {
        User user = authService.registerUser(registerDto.getUsername(),registerDto.getEmail(), registerDto.getPassword());
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {
    try {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
        );
        String token = jwtUtil.generateToken((org.springframework.security.core.userdetails.User) authentication.getPrincipal());
        // Fetch user details
        User user = authService.getUserByEmail(loginDto.getEmail());
        return ResponseEntity.ok(new AuthResponseDto(token, user.getUsername(), user.getEmail()));
    } catch (AuthenticationException e) {
        return ResponseEntity.status(401).build();
    }
}
}
