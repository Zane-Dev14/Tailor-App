require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const employeeRouter = require('./routes/employees');
const orderRouter = require('./routes/orders');
const customerRouter = require('./routes/customers');
const dailyOutputRoutes = require('./routes/dailyoutput');
const authRouter = require('./routes/login');

const app = express();
connectDB();
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const corsOptions = {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/employees', employeeRouter);
app.use('/api/orders', orderRouter);
app.use('/api/customers', customerRouter);
app.use('/api/dailyoutputs', dailyOutputRoutes);
app.use('/api/login', authRouter); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
