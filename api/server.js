// Main server file for the API using Express.

// require necessary modules
const express = require('express');
const cors = require('cors');
const path = require('path');

// create an Express application and define the port number
const app = express();
const PORT = 3001;

// Import the routers for each resource
const plantsRouter = require('./routes/plants');
const plantTypesRouter = require('./routes/plantTypes');

// make the uploaded images available at /uploads, so they can be accessed by the front-end
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Allow cross-origin requests from the React front-end
app.use(cors());

// Parse incoming JSON 
app.use(express.json());

// Use the routers for the respective routes
app.use('/plants', plantsRouter);
app.use('/plant-types', plantTypesRouter);

// listen for port requests, and log message when the server is running
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
