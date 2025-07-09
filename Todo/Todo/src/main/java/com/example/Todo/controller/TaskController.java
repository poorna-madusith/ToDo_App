package com.example.Todo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Todo.models.Task;
import com.example.Todo.models.User;
import com.example.Todo.repository.UserRepository;
import com.example.Todo.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")

public class TaskController {
    
    private final TaskService taskService;
    private final UserRepository userRepository;

    public TaskController(TaskService taskService, UserRepository userRepository){
        this.taskService = taskService;
        this.userRepository = userRepository;
    }


    // Method to get the authenticated user from the security context
    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
    }


    //create task
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task){
        User user = getAuthenticatedUser();
        return ResponseEntity.ok(taskService.createTask(task, user));
    }

    ///get all task for logged in user
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(){
        User user = getAuthenticatedUser();
        return ResponseEntity.ok(taskService.getAllTasks(user));
    }


    //get task by id for logged in user
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id){
        User user = getAuthenticatedUser();
        return taskService.getTaskById(id, user)
            .map(task -> ResponseEntity.ok(task))
            .orElse(ResponseEntity.notFound().build());
    }

    //update task by id for logged in user
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask){
        User user = getAuthenticatedUser();
        return ResponseEntity.ok(taskService.updateTask(id, updatedTask, user));
    }

    //delete task by id for logged in user
    @DeleteMapping("/{id}")
    public ResponseEntity<Task> deleteTask(@PathVariable Long id){
        User user = getAuthenticatedUser();
        taskService.deleteTask(id, user);
        return ResponseEntity.noContent().build();
    }

    //show only today tasks
    @GetMapping("/today-tasks")
    public ResponseEntity<List<Task>> getTodayTasks(){
        User user = getAuthenticatedUser();
        return ResponseEntity.ok(taskService.getTodayTasks(user));
    }
 

}
