const express = require('express');
const app = express();
const booksRouter = require('./books');

app.use(express.json());

app.use('/books', booksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
