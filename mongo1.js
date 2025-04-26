import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'; 

const app = express();

app.use(cors()); 
// Middleware
app.use(bodyParser.json());

// MongoDB Connection (P.S.: Change with your own to run BackEnd for the project.)
mongoose.connect('/*Here add your connect String/*', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

// Definin a Schema for form data
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    date3: Date,
    people: String,
    message: String
});

// Creatin a model based on schema
const FormData = mongoose.model('FormData', formSchema);

// POST route to handle form submission
app.post('/submit', async (req, res) => {
    const { name, email, date3, people, message} = req.body;

    // Convertin date string to Date object
    const parsedDate = new Date(date3);
    
    // Creatin a new form data document
    const formEntry = new FormData({
        name: name,
        email: email,
        datetime: parsedDate,
        people: people,
        message: message
    });

    // Save the data to MongoDB
    try {
        await formEntry.save();
        res.status(200).json({ message: 'Data saved successfully!' });
    } catch (err) {
        console.error('Error saving data to database:', err);
        res.status(500).json({ message: 'Error saving data to database' });
    }
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

























// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors'; 

// const app = express();

// app.use(cors()); 
// // Middleware
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect('mongodb+srv://bca1140dipanshu:kYU2STcUNXg0i0sX@project-db.sh3cb.mongodb.net/?retryWrites=true&w=majority&appName=Project-DB', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.log('Could not connect to MongoDB...', err));

// // Define a Schema for the form data
// const formSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     message: String
// });

// // Create a model based on the schema
// const FormData = mongoose.model('FormData', formSchema);

// // POST route to handle form submission
// app.post('/submit', async (req, res) => {
//     const { name, email, message } = req.body;
    
//     // Create a new form data document
//     const formEntry = new FormData({
//         name: name,
//         email: email,
//         message: message
//     });

//     // Save the data to MongoDB
//     try {
//         await formEntry.save();
//         res.status(200).json({ message: 'Data saved successfully!' });
//     } catch (err) {
//         res.status(500).json({ message: 'Error saving data to database' });
//     }
// });

// // Start server
// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });



// const mongoose = require ('mongoose');
// const express = require ('express');
// const bodyParser = require ('body-parser');
// const customer = require ("./customer.js");

// const uri = mongoose.connect("mongodb+srv://bca1140dipanshu:2DnYopec0es3SQxK@cluster0.sh3cb.mongodb.net/");
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//     const customer = new customer({ title: "New order" })
//      res.send('Mission Passed')
//  })

// app.use(bodyParser.json());
// app.use(express.static('public')); // Serve static files from the 'public' directory


// app.post('/submit', async (req, res) => {
//     try {
//         await client.connect();
//         const database = customer.db('myDatabase'); // Replace with your database name
//         const collection = new customer.collection('myCollection'); // Replace with your collection name

//         const doc = req.body; // Get the data from the request body
//         const result = await collection.insertOne(doc);
//         console.log(`New listing created with the following id: ${result.insertedId}`);
//         res.status(201).send('Data inserted successfully');
//     } catch (error) {
//         console.error('Error inserting document:', error);
//         res.status(500).send('Error inserting data');
//     } finally {
//         await client.close();
//     }
// });

// app.listen(port, () => {
//     console.log('Dairy King is running on port ${port}')
// })