const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/oracle');

//POST - /books/add
router.post('/add', async (req, res) => {
    const { title, author, genre, isbn, pub_year } = req.body;

    try {
        const conn = await getConnection();
        await conn.execute(
            `BEGIN add_book_sp(:title, :author, :genre, :isbn, :pub_year); END;`,
            { title, author, genre, isbn, pub_year }
        );
        res.status(200).send('BOOK SUCCESFULLY ADDED');
    } catch (err) {
        console.error('Error adding book: ', err);
        res.status(500).send('ERROR ADDING BOOK');
    }
});

module.exports = router;