# DPS Backend Coding Challenge

## Overview

This project is a solution to the [Digital Product School Express.js Challenge](https://github.com/DigitalProductschool/dps-expressjs-challenge).  
It provides a RESTful API to manage projects and their associated reports using **Express.js** and **SQLite**.

---

## 🚀 Features

### ✅ Project Endpoints
- `GET /projects` — Retrieve all projects
- `POST /projects` — Create a new project (`id`, `name`, `description` required)
- `GET /projects/:id` — Retrieve a single project by ID
- `PUT /projects/:id` — Update a project’s name and description
- `DELETE /projects/:id` — Delete a project

### 📄 Report Endpoints
- `POST /projects/:projectId/reports` — Create a report for a specific project
- `GET /projects/:projectId/reports` — Retrieve all reports for a specific project
- `GET /reports/:id` — Retrieve a single report by ID
- `PUT /reports/:id` — Update report text
- `DELETE /reports/:id` — Delete a report

### 🌟 Bonus: Repeated Word Analysis
- `GET /reports/repeated-words`  
  Returns all reports where **any word appears at least 3 times**.

---

## 🛠 Technologies Used
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [SQLite](https://www.sqlite.org/)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- ESLint, Prettier, Husky (pre-commit hooks)

---
## Environment Setup

Ensure you have Node.js (v14.x or later) and npm (v6.x or later) installed.  
To set up and run the application, execute the following commands:

```
npm install
npm run dev
```

The application will then be accessible at http://localhost:3000.

## Project Context

You will develop a backend system for managing data about a company's projects and their associated reports. Each project may have multiple reports linked to it, though having reports is not mandatory. Start your implementation using the provided SQLite database([db/db.sqlite3](./db/db.sqlite3)).

Refer to the database schema provided for understanding the data structure 👇

![Database schema](images/database_schema.png)

NOTE: You can use ([db.service.ts](./src/services/db.service.ts)) to handle SQL queries to the database.

## Challenge Tasks

-   **Fork this project:** Start by forking this repository
-   **REST API Development:** Design and implement a RESTful API to create, read, update, and delete projects and their reports.
-   **Special API Endpoint:** Create an API endpoint that retrieves all reports where the same word appears at least three times.
-   **Optional:** Secure all API routes with a hardcoded authentication token ("Password123").
-   **Submission:** After completing the challenge, email us the URL of your GitHub repository.
-   **Further information:**
    -   If there is anything unclear regarding requirements, contact us by replying to our email.
    -   Use small commits, we want to see your progress towards the solution.
    -   Code clean and follow the best practices.

\
Happy coding!
