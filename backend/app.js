require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const employeeRouter = require('./routes/employees');
const orderRouter = require('./routes/orders');
const customerRouter = require('./routes/customers');
const dailyOutputRoutes = require('./routes/dailyoutput');
const authRouter = require('./routes/login');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
connectDB();

const corsOptions = {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Session management
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,          
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}));

// Public routes
app.use('/api/login', authRouter);

// Protected routes
app.use('/api/employees', authMiddleware, employeeRouter);
app.use('/api/orders', authMiddleware, orderRouter);
app.use('/api/customers', authMiddleware, customerRouter);
app.use('/api/dailyoutputs', authMiddleware, dailyOutputRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
