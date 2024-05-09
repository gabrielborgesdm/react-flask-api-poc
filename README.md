# Bookstore Management System
The Bookstore Management System is designed to showcase the integration of various technologies for building a web application

![Concept Map](assets/concept-map.png)

## Overview
It consists of the following components:

Backend API (Python Flask + Postgres): Implements CRUD (Create, Read, Update, Delete) operations for managing books. Utilizes PostgresSQL for data storage, demonstrating the integration of Flask with a NoSQL database.

Frontend Application (React): Provides a user-friendly interface for browsing and managing books. Interacts with the Flask backend via RESTful API to fetch and update data.

This POC was developed do demonstrate the CI/CD Github actions working together with the following AWS Services: 
1. AWS Elastic Beanstalk for Flask
2. AWS RDS for Postgress
3. AWS Amplify for the React web app
4. Docker was used for AWS local development

## Installation

Docker is being used to run the backend, frontend, database and even the database manager (PgAdmin). In order to install it make sure to have both docker and docker-compose installed.

To start the services run `docker compose up`

### PgAdmin
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


## Backend

1. Copy the .env-example to a .env file inside of the backend folder and replace its variables with yours


# References
1. The database docker configuration was retrieved from [khezen/compose-postgres](https://github.com/khezen/compose-postgres/tree/master)

# Useful commands

## Generate and run migrations
1. python3 -m flask --app main db migrate -m "Your migration message"
2. python3 -m flask --app main db upgrade