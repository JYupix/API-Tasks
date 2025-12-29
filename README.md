<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Tasks API</h1>

<p align="center">
  A professional RESTful API for task management built with NestJS, TypeScript, and modern best practices.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-v11.0.1-E0234E?logo=nestjs" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-20+-339933?logo=node.js" alt="Node.js" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [API Endpoints](#-api-endpoints)
- [Validation Rules](#-validation-rules)
- [Error Handling](#-error-handling)
- [Logging](#-logging)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)

---

## 🎯 Overview

This API provides a complete CRUD (Create, Read, Update, Delete) system for managing tasks. Built following REST principles and professional development patterns, it demonstrates modern NestJS practices including:

- ✅ Async/await operations
- ✅ DTOs (Data Transfer Objects) with validation
- ✅ Proper HTTP status codes
- ✅ Structured error handling
- ✅ Centralized logging
- ✅ Modular architecture

---

## ✨ Features

- **Task Management**: Full CRUD operations for tasks
- **Data Validation**: Automatic validation using `class-validator`
- **Filtering**: Search tasks by title, description, or status
- **Status Management**: Track tasks as `pending` or `completed`
- **UUID Generation**: Unique identifiers for each task
- **Timestamps**: Automatic creation date tracking
- **Error Handling**: Professional error responses with proper HTTP codes
- **Logging**: Comprehensive logging for debugging and monitoring

---

## 🏗️ Architecture

### Tech Stack

- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.x
- **Runtime**: Node.js 20+
- **Validation**: class-validator & class-transformer
- **Storage**: JSON file-based persistence (async operations)

### Design Patterns

- **Modular Architecture**: Feature-based modules
- **Dependency Injection**: NestJS IoC container
- **DTO Pattern**: Input validation and transformation
- **Repository Pattern**: Data access abstraction
- **Service Layer**: Business logic separation

---

## 🚀 API Endpoints

Base URL: `http://localhost:3000/api`

### Get All Tasks
```http
GET /api/tasks
```

**Query Parameters (optional):**
- `title` (string): Filter by task title
- `description` (string): Filter by description
- `status` (enum): Filter by status (`pending` | `completed`)

**Response:** `200 OK`
```json
[
  {
    "id": "550f8734-b661-4d0d-8d40-94efc41037cb",
    "title": "Complete project",
    "description": "Finish the NestJS API",
    "status": "pending",
    "createdAt": "2025-12-29T21:55:05.875Z"
  }
]
```

---

### Get Task by ID
```http
GET /api/tasks/:id
```

**Response:** `200 OK`
```json
{
  "id": "550f8734-b661-4d0d-8d40-94efc41037cb",
  "title": "Complete project",
  "description": "Finish the NestJS API",
  "status": "pending",
  "createdAt": "2025-12-29T21:55:05.875Z"
}
```

**Error:** `404 Not Found`

---

### Create Task
```http
POST /api/tasks
```

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description here",
  "status": "pending"
}
```

**Response:** `201 Created`
```json
{
  "id": "c78cac04-2538-4e59-9062-3b25d8a99afe",
  "title": "New Task",
  "description": "Task description here",
  "status": "pending",
  "createdAt": "2025-12-29T22:05:28.586Z"
}
```

---

### Update Task
```http
PATCH /api/tasks/:id
```

**Request Body (all fields optional):**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

**Response:** `200 OK`

**Error:** `404 Not Found`

---

### Delete Task
```http
DELETE /api/tasks/:id
```

**Response:** `200 OK`
```json
{
  "id": "550f8734-b661-4d0d-8d40-94efc41037cb",
  "title": "Deleted task",
  "description": "Task that was deleted",
  "status": "completed",
  "createdAt": "2025-12-29T21:55:05.875Z"
}
```

**Error:** `404 Not Found`

---

## ✅ Validation Rules

### CreateTaskDto

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `title` | string | ✅ Yes | Min: 3 chars, Max: 100 chars |
| `description` | string | ✅ Yes | Max: 500 chars |
| `status` | enum | ⚠️ Optional | Must be `pending` or `completed` (default: `pending`) |

### UpdateTaskDto

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `title` | string | ❌ No | Min: 3 chars, Max: 100 chars |
| `description` | string | ❌ No | Max: 500 chars |
| `status` | enum | ❌ No | Must be `pending` or `completed` |

### FindTasksDto

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `title` | string | ❌ No | Used for filtering |
| `description` | string | ❌ No | Used for filtering |
| `status` | enum | ❌ No | Must be `pending` or `completed` |

---

## 🚨 Error Handling

The API uses standard HTTP status codes and returns structured error responses:

### 400 Bad Request
**Cause**: Validation failure

**Example Response:**
```json
{
  "statusCode": 400,
  "message": [
    "Title must be between 3 and 100 characters",
    "Description must not be empty"
  ],
  "error": "Bad Request"
}
```

### 404 Not Found
**Cause**: Task with specified ID doesn't exist

**Example Response:**
```json
{
  "statusCode": 404,
  "message": "Task with id 123 not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
**Cause**: Server-side error (file system failure, etc.)

**Example Response:**
```json
{
  "statusCode": 500,
  "message": "Failed to read tasks",
  "error": "Internal Server Error"
}
```

---

## 📝 Logging

The application implements comprehensive logging for monitoring and debugging:

### Log Levels

- **LOG** - General information (task created, updated, deleted)
- **WARN** - Warning messages (task not found)
- **ERROR** - Error messages (file system errors)

### Example Logs

```bash
[Nest] 12345  - 12/29/2025, 10:00:00 PM   LOG [TasksService] Task created: New Task
[Nest] 12345  - 12/29/2025, 10:01:00 PM   LOG [TasksService] Task with id abc123 updated
[Nest] 12345  - 12/29/2025, 10:02:00 PM   WARN [TasksService] Task with id xyz789 not found
[Nest] 12345  - 12/29/2025, 10:03:00 PM   ERROR [TasksService] Failed to read tasks file
```

---

## 📦 Installation

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JYupix/API-Tasks.git
   cd FirstProject
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify installation:**
   ```bash
   npm run build
   ```

---

## 🏃 Running the Application

### Development Mode (with hot-reload)
```bash
npm run start:dev
```

The API will be available at: `http://localhost:3000/api`

### Production Mode
```bash
# Build the application
npm run build

# Run the production build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

### Testing
```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Generate test coverage
npm run test:cov
```

---

## 📁 Project Structure

```
FirstProject/
├── src/
│   ├── tasks/
│   │   ├── dto/
│   │   │   ├── create-task.dto.ts      # Validation for task creation
│   │   │   ├── update-task.dto.ts      # Validation for task updates
│   │   │   └── find-task.dto.ts        # Validation for filtering
│   │   ├── enums/
│   │   │   └── task-status.enum.ts     # Task status enum
│   │   ├── interfaces/
│   │   │   └── task.interface.ts       # Task interface
│   │   ├── tasks.controller.ts         # HTTP routes & handlers
│   │   ├── tasks.service.ts            # Business logic
│   │   └── tasks.module.ts             # Module definition
│   ├── data/
│   │   └── tasks.json                  # JSON storage
│   ├── app.module.ts                   # Root module
│   └── main.ts                         # Application entry point
├── test/                               # Test files
├── nest-cli.json                       # Nest CLI configuration
├── tsconfig.json                       # TypeScript configuration
└── package.json                        # Dependencies & scripts
```

---

## 🛠️ Configuration

### Global Prefix
All endpoints are prefixed with `/api` (configured in `main.ts`)

### Validation Pipe
- **whitelist**: `true` - Strips properties not in DTO
- **forbidNonWhitelisted**: `true` - Rejects unknown properties
- **transform**: `true` - Auto-transforms payloads to DTO instances

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
