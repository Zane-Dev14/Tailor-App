const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // If needed for older versions of Express
const connectDB = require('./config/db'); // Ensure this function correctly connects to your MongoDB
const employeeRouter = require('./routes/employees');
const orderRouter = require('./routes/orders');
const customerRouter = require('./routes/customers');
const dailyOutputRoutes = require('./routes/dailyoutput');

const app = express();
connectDB(); // Ensure this function is correctly implemented
const corsOptions = {
    origin: 'http://localhost:3001', // Adjust for your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));
  
// Middleware
app.use(cors()); // Add more specific options for CORS in production
app.use(express.json()); // This replaces bodyParser.json()

// Define API routes
app.use('/api/employees', employeeRouter); // Use /api prefix for consistency
app.use('/api/orders', orderRouter);
app.use('/api/customers', customerRouter);
app.use('/api/dailyoutputs', dailyOutputRoutes);
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch employees from the database
    res.json(employees); // Send the employees as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
