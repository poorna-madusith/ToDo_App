package com.example.Todo.service;

import com.example.Todo.models.PasswordResetToken;
import com.example.Todo.models.User;
import com.example.Todo.repository.PasswordResetTokenRepository;
import com.example.Todo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;

    @Override // load the user by email and store the user details in UserDetails object
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }

    // method to register a new user
    public User registerUser(String username, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        User user = User.builder()// use builder pattern to create a new user
                .username(username)
                .email(email)
                .password(passwordEncoder.encode(password))
                .build();
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public User updateUserProfile(String newemail, String newusername, String oldpassword, String newpassword, User user){
        // Check if the old password matches
        if (!passwordEncoder.matches(oldpassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        // Check if the new email is different and already taken by another user
        if (!user.getEmail().equals(newemail) && userRepository.findByEmail(newemail).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        if (newemail == null || !newemail.contains("@")) {
            throw new RuntimeException("Invalid email format");
        }
        if (newusername == null || newusername.trim().isEmpty()) {
            throw new RuntimeException("Username cannot be empty");
        }

        user.setEmail(newemail);
        user.setUsername(newusername);
        
        if (newpassword != null && !newpassword.isEmpty()) {
            user.setPassword(passwordEncoder.encode(newpassword));
        }

        return userRepository.save(user);

    }

    @Transactional
    public void createPasswordResetTokenForUser(String email) {
        User user = getUserByEmail(email);

        // Delete existing token for this user (if any)
        passwordResetTokenRepository.findByUser(user).ifPresent(passwordResetTokenRepository::delete);

        String token = UUID.randomUUID().toString();
        PasswordResetToken myToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(myToken);

        // Construct the reset link
        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        emailService.sendEmail(user.getEmail(), "Password Reset Request",
                "To reset your password, click the link: " + resetLink);
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken passToken = passwordResetTokenRepository.findByToken(token)// check token validity
                .orElseThrow(() -> new RuntimeException("Invalid or expired password reset token"));

        if (passToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Password reset token has expired");
        }

        User user = passToken.getUser();// get user details from the token
        user.setPassword(passwordEncoder.encode(newPassword));// update the user's password
        userRepository.save(user);
        passwordResetTokenRepository.delete(passToken); // remove the token after use
    }

}
