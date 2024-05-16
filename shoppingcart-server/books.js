const express = require('express');
const router = express.Router();

let books = [];

// Create a book
router.post('/', (req, res) => {
    const { id, title, ISBN, publishedDate, author } = req.body;
    const book = { id, title, ISBN, publishedDate, author };
    books.push(book);
    res.status(201).json(book);
});

// Read all books
router.get('/', (req, res) => {
    res.json(books);
});

// Read a single book
router.get('/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

// Update a book
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, ISBN, publishedDate, author } = req.body;
    const index = books.findIndex(book => book.id === parseInt(id));
    if (index === -1) return res.status(404).send('Book not found');
    books[index] = { id: parseInt(id), title, ISBN, publishedDate, author };
    res.json(books[index]);
});

// Delete a book
router.delete('/:id', (req, res) => {
    const index = books.findIndex(book => book.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Book not found');
    const deletedBook = books.splice(index, 1);
    res.json(deletedBook);
});

module.exports = router;
