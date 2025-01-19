# Travel Vista Backend

## Table of Contents

- [Travel Vista Backend](#travel-vista-backend)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Live Demo](#live-demo)
  - [Features](#features)
    - [User Management](#user-management)
    - [Service Management](#service-management)
    - [Booking Management](#booking-management)
    - [Data Management](#data-management)
    - [Security](#security)
    - [API Documentation](#api-documentation)
  - [Technologies Used](#technologies-used)
    - [Core Backend](#core-backend)
    - [Security](#security-1)
    - [Development Tools](#development-tools)
  - [Installation](#installation)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Navigate to the Project Directory](#2-navigate-to-the-project-directory)
    - [3. Install Dependencies](#3-install-dependencies)
    - [4. Set Up Environment Variables](#4-set-up-environment-variables)
    - [5. Start the Server](#5-start-the-server)
  - [Usage](#usage)
  - [Environment Variables](#environment-variables)
  - [Error Handling](#error-handling)
  - [Authentication \& Authorization](#authentication--authorization)
  - [API Documentation](#api-documentation-1)
  - [Future Improvements](#future-improvements)
  - [License](#license)

## Overview

The Travel Vista Backend is a comprehensive backend solution designed to manage the booking of travel services. It enables users to sign up, log in, browse available services, book appointments, and manage their bookings. Admins have additional functionalities, including managing services, booking slots, and user accounts.

---

## Live Demo

The backend server is hosted live at [Travel Vista Backend Demo](https://your-backend-link.com).

---

## Features

### User Management
- User registration and login with secure password hashing.
- Role-based access control (Admin and Regular User).

### Service Management
- CRUD operations for managing travel services.
- Admin-only access to create, update, and delete services.

### Booking Management
- Users can view available slots and make bookings.
- Admins can manage all bookings and slots.

### Data Management
- MongoDB used as the database with Mongoose ODM.
- Support for transactional operations to ensure data consistency.

### Security
- JWT-based authentication and role-based authorization.
- Input validation and sanitization to prevent injection attacks.

### API Documentation
- Comprehensive API documentation created using Swagger or Postman.
- Endpoints categorized by functionality for ease of testing and development.

---

## Technologies Used

### Core Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **TypeScript**: Strongly typed JavaScript for scalability and maintainability.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.

### Security
- **JWT**: Authentication.
- **bcrypt.js**: Password hashing.

### Development Tools
- **Git & GitHub**: Version control.
- **Postman**: API testing.
- **VS Code**: Development environment.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Kamrulthedev/Travel-vista-new-version-server
```

### 2. Navigate to the Project Directory

```bash
cd Travel-vista-server
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```plaintext
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
BCRYPT_SALT_ROUNDS=10
STRIPE_SECRET_KEY=your-stripe-secret-key
AAMARPAY_STORE_ID=your-aamarpay-store-id
AAMARPAY_STORE_PASSWORD=your-aamarpay-store-password
```

### 5. Start the Server

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will run on `http://localhost:5000`.

---

## Usage

- Use a tool like Postman to test the API endpoints.
- Endpoints are secured and require a JWT token for access.
- Admin users can manage services and bookings.

---

## Environment Variables

The following environment variables are required:

| Variable               | Description                      |
|------------------------|----------------------------------|
| `PORT`                | Port number for the server.     |
| `MONGODB_URI`         | MongoDB connection URI.         |
| `JWT_SECRET`          | Secret key for JWT tokens.      |
| `BCRYPT_SALT_ROUNDS`  | Salt rounds for bcrypt hashing. |
| `STRIPE_SECRET_KEY`   | Stripe API secret key.          |
| `AAMARPAY_STORE_ID`   | Aamarpay store ID.              |
| `AAMARPAY_STORE_PASSWORD` | Aamarpay store password.    |

---

## Error Handling

The backend includes middleware for structured error handling, including:

- Validation errors for user input.
- Authentication errors for unauthorized access.
- General server errors with proper HTTP status codes.

---

## Authentication & Authorization

- JWT-based authentication ensures secure access to protected routes.
- Role-based authorization controls access to admin-specific functionalities.

---

## API Documentation

Comprehensive API documentation is available at [API Documentation](https://your-api-docs-link.com). It includes details of all endpoints, request/response formats, and example payloads.

---

## Future Improvements

- Develop a frontend interface for improved user experience.
- Add email notifications for booking confirmations and updates.
- Enhance security features such as rate limiting, logging, and monitoring.
- Support for multiple languages for a global audience.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

**Travel Smarter, Explore Further!**
