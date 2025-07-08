package com.example.Todo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.Todo.models.Task;
import com.example.Todo.models.User;
import com.example.Todo.repository.TaskRepository;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    public Task createTask(Task task, User user){
        task.setUser(user);
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks(User user){
        return taskRepository.findByUser(user);
    }

    public Optional<Task> getTaskById(Long id, User user){
        return taskRepository.findByIdAndUser(id, user);
    }

    public Task updateTask(Long id, Task updatedTask, User user){
        return taskRepository.findByIdAndUser(id, user)
            .map(task ->{
                task.setTitle(updatedTask.getTitle());
                task.setDescription(updatedTask.getDescription());
                task.setDueDate(updatedTask.getDueDate());
                task.setCompleted(updatedTask.isCompleted());
                return taskRepository.save(task);
            })
        .orElseThrow(()-> new RuntimeException("Task not found with ID: "+ id));
    }

    public void deleteTask(Long id, User user){
        Task task = taskRepository.findByIdAndUser(id, user)
            .orElseThrow(() -> new RuntimeException("Task not found with ID: "+ id));
        taskRepository.delete(task);
    }

}
