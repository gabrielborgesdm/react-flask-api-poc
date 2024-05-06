# Use the official Python image as base image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any dependencies
RUN pip install -r requirements.txt

# Command to run the Python script
CMD [ "python3", "-m" , "flask", "--app", "main", "run", "--debug", "--host=0.0.0.0"]