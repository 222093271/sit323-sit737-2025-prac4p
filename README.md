# 📄 SIT737-2025-Prac4P – Task 4.1P - Simple Calculator Microservice

### Author: Inwang Ubong Marshal (222093271)

### Repository: https://github.com/222093271/sit323-sit737-2025-prac4p.git


## Overview

This microservice project was developed as part of the SIT737-2025-Prac4P task to demonstrate the implementation of a basic calculator service using Node.js and the Express framework. The microservice exposes REST API endpoints that perform standard arithmetic operations such as addition, subtraction, multiplication, and division, based on numerical input from the user.
To enhance the application's robustness, Winston was integrated for logging purposes. It captures detailed request and error logs to aid in debugging, monitoring, and system auditing.

All development and testing were conducted locally using Visual Studio Code (VS Code) and Node.js installed on the system. The final version of the code was pushed to a public GitHub repository under the required naming convention for submission.


## Development Environment Setup

The following tools and technologies were used for the project:

•	Visual Studio Code (VS Code) – Installed from https://code.visualstudio.com

•	Node.js – Installed from https://nodejs.org/en/

•	Git – Installed from https://git-scm.com/

•	NPM – The Node Package Manager, included with Node.js

•	Winston – A logging library for Node.js

After setting up the development environment, the student proceeded with project initialization and coding.


## Step 1: Initialise the Project

1.	The integrated terminal in VS Code was used to navigate to the desired folder for project creation.

2.	A new folder was manually created and named: `sit323-sit737-2025-prac4p`

3.	This folder was then opened in VS Code via File → Open Folder.

4.	The Node.js project was initialized using: `npm init -y`. 
This generated a package.json file with default configurations.

5.	Required dependencies were installed using: `npm install express winston`


## Step 2: Create Project Files

The required files and folders were manually created via VS Code’s File Explorer:

•	A folder named logs

•	A file named server.js

•	A file named .gitignore


## Step 3: Create the Microservice

The microservice was implemented inside server.js, which includes:

•	RESTful endpoints: /add, /subtract, /multiply, /divide

•	A home route / displaying test links for quick access

•	Input validation to ensure all values are valid numbers

•	Specific error handling for division by zero

•	Middleware for logging all incoming requests using Winston

•	Winston configuration for both console and file-based logging


## Project Structure

```
sit323-sit737-2025-prac4p/
│
├── logs/
│   ├── error.log
│   ├── combined.log
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
```

## .gitignore Setup

To prevent runtime log files from being pushed to GitHub, a .gitignore file was created and configured with the following entry:
```
logs/*.log
```

This ensures that files such as combined.log and error.log are ignored by Git and not included in commits.


## Middleware Logging

A middleware function was implemented using app.use() to automatically log metadata for every incoming request. The following information is recorded:

•	Request method (GET)

•	Request URL and query parameters

•	IP address of the requester

This centralised logging mechanism improves observability and aids in debugging and monitoring.

```
app.use((req, res, next) => {
    logger.info({
        message: 'Incoming request',
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        query: req.query
    });
    next();
});
```


## Input Validation

A utility function, validate(num1, num2), was implemented to ensure both inputs are valid numbers before performing any arithmetic operation. In case of invalid inputs, a descriptive error is returned, and the error is logged using logger.error() to error.log.

This provides a robust safeguard against unexpected input and helps preserve application stability.


## Testing the API

After implementation, the microservice was tested locally by running:
`node server.js`

The following REST API endpoints were tested in both browsers and tools like Postman:

✅ Valid Test Cases

•	http://localhost:3000/add?num1=5&num2=3 → Returns: 8

•	http://localhost:3000/divide?num1=10&num2=2 → Returns: 5

❌ Error Test Cases

•	http://localhost:3000/divide?num1=10&num2=0 → Returns: error: "You cannot divide by zero!"

•	http://localhost:3000/add?num1=abc&num2=5 → Returns: error: "Both inputs must be numbers."

All errors were correctly logged in the logs/error.log file.


## Pushing to GitHub

After testing and verifying the application, the following Git commands were used to commit and push the project:
```
git init
git add .
git commit -m "Final version: calculator microservice with middleware logging"
git remote add origin https://github.com/222093271/sit323-sit737-2025-prac4p.git
git push -u origin main
```


## Final Notes

* All project requirements (Part I, II, III) were fulfilled.

The microservice meets all functional and technical requirements, including proper REST API structure, error handling, and runtime logging.

* Standard RESTful API practices were followed.

Each arithmetic operation is handled through a dedicated endpoint, and all responses are formatted in JSON.

* Robust error handling was implemented.

Input validation is applied to all routes. Errors, such as invalid input or division by zero, are properly handled and logged.

* Log files were excluded from version control.

By using .gitignore, all runtime logs were excluded from the repository, ensuring cleaner commits and avoiding sensitive data exposure.

* Middleware logging enhances observability.

Every request is automatically logged, providing real-time insight into user activity and potential issues.

* The codebase is clean and maintainable.

The structure is beginner-friendly, easy to extend, and organized logically for scalability.


## Short Summary

The SIT323-SIT737-2025-Prac4P calculator microservice was developed using Node.js and Express, featuring endpoints for basic arithmetic operations. The microservice includes input validation, error handling, and structured request logging using Winston. Middleware was used to log all incoming requests, while .gitignore ensures that logs are excluded from version control. The project fulfills all assignment criteria from Parts I, II, and III and is ready for deployment and further enhancement.
