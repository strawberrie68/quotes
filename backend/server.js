const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 6010;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongoDB database connection established successfully")
})

const bookRouter = require('./routes/books')
const quoteRouter = require('./routes/quotes')

app.use('/books', bookRouter);
app.use('/quotes', quoteRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})