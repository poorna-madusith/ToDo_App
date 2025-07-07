package com.example.Todo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.Todo.models.Task;
import com.example.Todo.repository.TaskRepository;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;

    }

    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id){
        return taskRepository.findById(id);
    }


    public Task updateTask(Long id, Task updatedTask){
        return taskRepository.findById(id)
            .map(task ->{
                task.setTitle(updatedTask.getTitle());
                task.setDescription(updatedTask.getDescription());
                task.setDuDate(updatedTask.getDuDate());
                task.setCompleted(updatedTask.isCompleted());
                return taskRepository.save(task);

            })
        .orElseThrow(()-> new RuntimeException("Task not found with ID: "+ id));
    }

    public void deleteTask(Long id){
        taskRepository.deleteById(id);
    }


}
