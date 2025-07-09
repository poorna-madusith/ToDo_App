package com.example.Todo.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Todo.models.Task;
import com.example.Todo.models.User;

public interface TaskRepository extends JpaRepository<Task, Long>{
    List<Task> findByUser(User user);
    Optional<Task> findByIdAndUser(Long id, User user);
    List<Task> findByUserAndDueDate(User user, LocalDate today);
};