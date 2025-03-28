const express = require('express');
const winston = require('winston');
const fs = require('fs');
const app = express();
const port = 3000;

// Ensure 'logs' folder exists
if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

// Set up Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// ✅ Middleware to log every incoming request
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

// Input validation
function validate(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        return 'Both inputs must be numbers.';
    }
    return null;
}

// Home route
app.get('/', (req, res) => {
    res.send(`
        <h2>Welcome to the Calculator Microservice</h2>
        <ul>
            <li><a href="/add?num1=5&num2=3">Add 5 + 3</a></li>
            <li><a href="/subtract?num1=10&num2=4">Subtract 10 - 4</a></li>
            <li><a href="/multiply?num1=6&num2=7">Multiply 6 * 7</a></li>
            <li><a href="/divide?num1=20&num2=5">Divide 20 / 5</a></li>
        </ul>
    `);
});

// Calculator routes

app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    const error = validate(num1, num2);
    if (error) {
        logger.error(`Addition Error: ${error} | num1=${num1}, num2=${num2}`);
        return res.status(400).json({ error });
    }
    const result = parseFloat(num1) + parseFloat(num2);
    logger.info(`Addition: ${num1} + ${num2} = ${result}`);
    res.json({ result });
});

app.get('/subtract', (req, res) => {
    const { num1, num2 } = req.query;
    const error = validate(num1, num2);
    if (error) {
        logger.error(`Subtraction Error: ${error} | num1=${num1}, num2=${num2}`);
        return res.status(400).json({ error });
    }
    const result = parseFloat(num1) - parseFloat(num2);
    logger.info(`Subtraction: ${num1} - ${num2} = ${result}`);
    res.json({ result });
});

app.get('/multiply', (req, res) => {
    const { num1, num2 } = req.query;
    const error = validate(num1, num2);
    if (error) {
        logger.error(`Multiplication Error: ${error} | num1=${num1}, num2=${num2}`);
        return res.status(400).json({ error });
    }
    const result = parseFloat(num1) * parseFloat(num2);
    logger.info(`Multiplication: ${num1} * ${num2} = ${result}`);
    res.json({ result });
});

app.get('/divide', (req, res) => {
    const { num1, num2 } = req.query;
    const error = validate(num1, num2);
    if (error) {
        logger.error(`Division Error: ${error} | num1=${num1}, num2=${num2}`);
        return res.status(400).json({ error });
    }
    if (parseFloat(num2) === 0) {
        const msg = 'You cannot divide by zero!';
        logger.error(`Division Error: ${msg} | num1=${num1}, num2=${num2}`);
        return res.status(400).json({ error: msg });
    }
    const result = parseFloat(num1) / parseFloat(num2);
    logger.info(`Division: ${num1} / ${num2} = ${result}`);
    res.json({ result });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
