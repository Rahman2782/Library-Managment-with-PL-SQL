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

router.post('/users', async (req, res) => {
    const { name, address, phone, membershuip_no } = req.body;

    try {
        const conn = await getConnection();
        await conn.execute(`BEGIN add_user_sp(:name, :address, :phone, :membership_no); END;`,
            { name, address, phone, membershuip_no }
        );
        res.status(200).send('USER ADDED SUCCESFULLY');   
    } catch (err) {
        console.error(err);
        res.status(500).send("ERROR HANDLING USER");
    }
});

router.post('/loans', async (req, res) => {
    const { book_id, patron_id, loan_date, due_date } = req.body;

    try {
        const conn = await getConnection();
        await conn.execute(`BEGIN loan_book_sp(:book_id, :patron_id, :loan_date. :due_date); END;`,
            { book_id, patron_id, loan_date, due_date }
        );
        res.status(200).send('LOAN UPDATED SUCCESSFULLY');
    } catch (err) {
        console.error(err);
        res.status(500).send('ERROR HANDLING LOAN');
    }
});

module.exports = router;