const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Importing the User model
const User = require('./src/Models/User');
const port = process.env.PORT || 5000;
// Middleware
app.use(express.json());

// Database connection
async function DB_Connection() {
    try{
        await mongoose.connect(process.env.MONGO_URL)
            console.log("Connected to MongoDB");

   }
    catch(error){
        console.log("Error connecting to MongoDB", error);
    }};




// Call the database connection function
DB_Connection();



// Routes
const authRoutes = require('./src/Routes/authRouters');
app.use('/api/auth', authRoutes);


app.listen( port, () => {
    console.log(`Server is running on port ${port}`);
});


