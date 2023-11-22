require("dotenv").config()
const express = require("express");
const Note = require('./routes/Note')
const mongoose = require('mongoose');

const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

// routes
app.use('/api/note', Note)

// connect to database 
mongoose.connect(process.env.MONGO_IP, {
    dbName: process.env.SCHEMA_NAME
}).then(() => {
    // listen for reqests
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log(error);
})

