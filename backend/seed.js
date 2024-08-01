require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const SALT_ROUNDS = 10;
const MONGO_URI = process.env.MONGO_URI;

async function seedDatabase() {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Delete all existing users
        await User.deleteMany({});

        // Create a new user with a hashed password
        const hashedPassword = await bcrypt.hash('password1234', SALT_ROUNDS);
        await User.create({
            authId: 'Admin', // Username
            password: hashedPassword // Hashed password
        });

        console.log('Default user created with encrypted password');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();
