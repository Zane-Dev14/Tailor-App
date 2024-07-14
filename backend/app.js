const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const employeeRouter = require('./routes/employees');
const orderRouter = require('./routes/orders');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/employees', employeeRouter);
app.use('/orders', orderRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
