# Flask Backend Rest API
this is the back-end of the project.

## Installation

1. Copy the .env-example to a .env file inside of the backend folder and replace its variables with yours

2. Create a Python Virtual Environment:
  `python3 -m venv venv`

3. Activate the Virtual Environment:
   - On macOS and Linux:
     `source venv/bin/activate`

   - On Windows (using Command Prompt):
     `venv\Scripts\activate.bat`

   - On Windows (using PowerShell):
     `.\venv\Scripts\Activate.ps1`

4. Install Dependencies from requirements.txt:
   `pip install -r requirements.txt`

Now, your virtual environment is activated, and all the dependencies listed in requirements.txt have been installed. You can proceed with running the provided commands in the Makefile for development.

### Makefile Commands

This Makefile provides convenient targets to automate common development tasks.


- **migrate**: Runs Flask migration with a specified message.

- **upgrade**: Upgrades the database schema using Flask.

- **start**: Starts Docker containers.

- **start-build**: Starts Docker containers and rebuilds images.

- **clean**: Remove volumes and delete all images associated with the containers defined in the `docker-compose.yml` file.

- **test**: Runs pytest for testing.

- **lint**: Runs pylint on all Python files in the repository.

## Note

- **migrate**: When running the migrate command, ensure to provide a migration message as an argument like the example above. If no message is provided, the command will prompt you to provide one.

- If you try to run the migration commands outside of the docker network, remember to change the `.env` **DATABASE_URI** host address(probably to `localhost`).