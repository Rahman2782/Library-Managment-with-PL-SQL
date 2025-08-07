require('dotenv').config(); //ALWAYS AT TOP - for loading user/pass

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const bookRoutes = require('./routes/books');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json()); //for parsing json data from the frontend

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Book API! Use /books to access book-related endpoints.');
});

app.use('/books', bookRoutes); 

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})