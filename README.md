# Bookstore Management System

The Bookstore Management System is a web application designed to demonstrate the integration of various modern technologies and best practices in software development. This project serves as a showcase of how to effectively combine multiple tools and frameworks to create a robust and maintainable application.

## Key Features

### Deployment and CI/CD

- _Docker and Docker Compose_: Containerization of the application for consistent and isolated environments, enabling easy deployment and scaling.
- _GitHub Actions_: Automated pipeline for continuous integration and continuous deployment (CI/CD), ensuring code quality and rapid delivery of updates.

### Backend

- _MVCS Architecture_: Implementation of Model-View-Controller-Service architecture for a well-structured and modular backend.
- _Flask_: A lightweight and flexible web framework for building the server-side application.
- _PostgreSQL with Flask-SQLAlchemy_: Powerful ORM for database management and seamless interaction with a PostgreSQL database.
- _Marshmallow_: Schema validation and serialization/deserialization library for managing input/output data integrity.
- _Pytest_: Unit testing framework to ensure the reliability and correctness of the backend code.

### Frontend

- _React with TypeScript_: Modern frontend library combined with TypeScript for type safety and robust application development.
- _Reusable Components_: Building blocks for creating maintainable and scalable UI.
- _ESLint and Prettier_: Tools for code linting and formatting, ensuring consistent and clean codebase.

## Project Structure

It consists of the following components:

Backend API (Python Flask + Postgres): Implements CRUD (Create, Read, Update, Delete) operations for managing books. Utilizes PostgresSQL for data storage, demonstrating the integration of Flask with a SQL database.

Frontend Application (React): Provides a user-friendly interface for browsing and managing books. Interacts with the Flask backend via RESTful API to fetch and create data.

## Installation

1. Docker is being used to run the backend, frontend, database and even the database manager (PgAdmin). In order to install it make sure to have both docker and docker-compose installed.

2. To start the services run `make docker/start`

3. After starting the services, run the following make commands to setup the database and schemas: `backend/init`, `backend/migration`, `backend/upgrade`

### Makefile Commands

This Makefile provides convenient targets to automate common development tasks.

- **docker/start**: Starts Docker containers.

- **docker/start-build**: Starts Docker containers and rebuilds images.

- **docker/clean**: Remove volumes and delete all images associated with the containers defined in the `docker-compose.yml` file.

- **backend/init**: Inits Flask migration folder.

- **backend/migrate**: Runs Flask migration with a specified message.

- **backend/upgrade**: Upgrades the database schema using Flask.

- **backend/test**: Runs pytest for testing.

### PgAdmin

PgAdmin is a popular open-source administration and development platform for PostgreSQL, a relational database management system. It provides a graphical interface for users to manage their PostgreSQL databases, execute SQL queries, monitor database activity, and perform various administrative tasks.

If you want to see your database on PgAdmin, you'll need to follow a few steps:

1. Access to PgAdmin:

   - **URL:** http://localhost:5050
   - **Username:** pgadmin4@pgadmin.org
   - **Password:** admin

2. Add a new server in PgAdmin:
   - **Host:** name/address postgres
   - **Port:** 5432
   - **Username:** postgres
   - **Password:** changeme

## References

1. The database docker configuration was retrieved from [khezen/compose-postgres](https://github.com/khezen/compose-postgres/tree/master)
