# Todo App

![Screenshot](./Screenshot%202025-07-09%20215757.png)

This is a full-stack Todo application built with a Spring Boot backend and a React frontend. It allows users to manage their tasks, with features for authentication, task creation, and updates.

## Features

*   **User Authentication:** Secure user registration and login system.
*   **Password Management:** Forgot and reset password functionality.
*   **Profile Updates:** Users can update their profile information.
*   **Task Management:** Create, read, update, and delete tasks.
*   **Task Filtering:** View all tasks or only tasks due today.
*   **JWT Authentication:** Secure API endpoints using JSON Web Tokens.

## Technologies Used

### Backend

*   **Java 17**
*   **Spring Boot 3.5.3**
    *   Spring Web
    *   Spring Data JPA
    *   Spring Security
*   **Maven**
*   **MySQL**
*   **JWT (JSON Web Token)** for authentication
*   **Lombok**

### Frontend

*   **React**
*   **Vite**
*   **Tailwind CSS**
*   **Axios** for API requests
*   **React Router** for navigation

## Getting Started

### Prerequisites

*   **Java 17** or later
*   **Node.js** (which includes npm)
*   **MySQL**

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2.  **Backend Setup:**
    *   Navigate to the backend directory:
        ```bash
        cd "Todo/Todo"
        ```
    *   **Database Configuration:**
        *   Open `src/main/resources/application.properties`.
        *   Update the `spring.datasource.url`, `spring.datasource.username`, and `spring.datasource.password` properties to match your MySQL setup.
        *   Ensure you have a database named `tododb` or change the name in the datasource URL.
    *   **Email Configuration:**
        *   In the same `application.properties` file, update the `spring.mail.username` and `spring.mail.password` with your email credentials for the password reset feature.

3.  **Frontend Setup:**
    *   Navigate to the frontend directory:
        ```bash
        cd "Todo/todofrontend"
        ```
    *   Install the required npm packages:
        ```bash
        npm install
        ```

### Running the Application

1.  **Run the Backend:**
    *   In the `Todo/Todo` directory, run the following command:
        ```bash
        ./mvnw spring-boot:run
        ```
    *   The backend will start on `http://localhost:8080`.

2.  **Run the Frontend:**
    *   In the `Todo/todofrontend` directory, run the following command:
        ```bash
        npm run dev
        ```
    *   The frontend development server will start, typically on `http://localhost:5173`.

## API Endpoints

### Auth Controller (`/api/auth`)

*   `POST /register`: Register a new user.
*   `POST /login`: Log in a user and receive a JWT token.
*   `POST /forgot-password`: Send a password reset link to the user's email.
*   `POST /reset-password`: Reset the password using a token.
*   `PUT /update-profile`: Update the user's profile information.

### Task Controller (`/api/tasks`)

*   `POST /`: Create a new task.
*   `GET /`: Get all tasks for the logged-in user.
*   `GET /{id}`: Get a specific task by its ID.
*   `PUT /{id}`: Update a task.
*   `DELETE /{id}`: Delete a task.
*   `GET /today-tasks`: Get all tasks due today.

## Folder Structure

```
.
├── Todo/           # Backend (Spring Boot)
│   ├── src/
│   └── pom.xml
└── todofrontend/   # Frontend (React)
    ├── src/
    └── package.json
```
