package com.example.Todo.controller;

import com.example.Todo.dtos.LoginDto;
import com.example.Todo.dtos.RegisterDto;
import com.example.Todo.dtos.AuthResponseDto;
import com.example.Todo.dtos.PasswordResetDto;
import com.example.Todo.dtos.PasswordResetRequestDto;
import com.example.Todo.dtos.ProfileUpdateDto;
import com.example.Todo.models.User;
import com.example.Todo.security.JwtUtil;
import com.example.Todo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    private final AuthenticationManager authenticationManager;// to authenticate user credentials
    private final JwtUtil jwtUtil;

    // user register
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterDto registerDto) {
        User user = authService.registerUser(registerDto.getUsername(), registerDto.getEmail(),
                registerDto.getPassword());
        return ResponseEntity.ok(user);
    }

    // user login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));// check user
                                                                                                          // credentials
            String token = jwtUtil
                    .generateToken((org.springframework.security.core.userdetails.User) authentication.getPrincipal());// generate
                                                                                                                       // token
                                                                                                                       // for
                                                                                                                       // user
            // Fetch user details
            User user = authService.getUserByEmail(loginDto.getEmail());
            return ResponseEntity.ok(new AuthResponseDto(token, user.getUsername(), user.getEmail()));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    // send password reset link
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody PasswordResetRequestDto request) {
        try {
            authService.createPasswordResetTokenForUser(request.getEmail());
            return ResponseEntity.ok("Password reset link sent to your email.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // reset password using token
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetDto resetDto) {
        try {
            authService.resetPassword(resetDto.getToken(), resetDto.getNewPassword());
            return ResponseEntity.ok("Password has been reset successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/update-profile")
    public ResponseEntity<String> profileUpdate(@RequestBody ProfileUpdateDto profileUpdateDto) {
        try {
            authService.updateUserProfile(
                profileUpdateDto.getEmail(),
                profileUpdateDto.getUsername(),
                profileUpdateDto.getOldPassword(),
                profileUpdateDto.getNewPassword(),
                authService.getUserByEmail(profileUpdateDto.getCurrentEmail())
            );
            return ResponseEntity.ok("Password has been updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
