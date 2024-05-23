# Use the official Python image as base image
FROM node:20

# Set the working directory in the container
WORKDIR /frontend

# Copy the current directory contents into the container at /app
COPY . /frontend

# Install any dependencies
RUN npm install

EXPOSE 3000

# Command to run the Python script

CMD ["npm", "start"]
