const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB Connected');
};

module.exports = connectDB;
