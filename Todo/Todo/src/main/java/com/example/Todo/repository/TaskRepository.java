package com.example.Todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Todo.models.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{
    
};