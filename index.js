require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const books = require('./models/books');

const Book = require('./models/books');

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery',false);

const connectDb = async() =>{
    try{

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`)

    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

app.get('/',(request,response)=>{
    response.send({title:'books'})
});

app.get('/add-notes',async (request,response)=>{
    try{
        await Book.insertMany([
            {
                title:"Lords of the rings",
                body:"text goes here",
            },
            {
                title:"HArry Potter",
                body:"text goes here",
            }
        ])
    }catch(error){
        console.log(error);
    }
});

app.get('/books',async (request,response)=>{
    const books = await Book.find();

    if(books){
        res.json(books);
    }else{
        res.send("Something Went wrong ");
    }
})




connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening on PORT: ${PORT}`)
    })
})