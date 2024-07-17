
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://user:dF5AW8ACe2EtDWv3@cluster0.ixmi5uy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.set('strictQuery', true);

        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
