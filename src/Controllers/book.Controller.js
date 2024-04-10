const { Book } = require('../Models/book.Model');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');


const createBook = async (req, res) => {
    try {
        const { name, author, pages, description } = req.body;
        const bookData = {
            name,
            author,
            pages,
            description
        }
        const newBook = new Book(bookData);
        await newBook.save();
        const token = jwt.sign({id: newBook._id }, SECRET_KEY,{
            expiresIn: 86400 // Esto es 24hrs.
        });
        const bookDataWithToken = { 
            id: newBook._id, 
            name: newBook.name, 
            author: newBook.author, 
            pages: newBook.pages, 
            description: newBook.description, 
            token: token  
        }
        res.status(200).send({ status: true, data: bookDataWithToken, message: 'Acceso permitido.'});
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
}


const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los libros.'});
        console.error(error);
    }
}

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener este libro.'});
        console.error(error);
    }
}

const getBookByAuthor = async (req, res) => {
    try {
        const { author } = req.params;
        const book = await Book.find({ author });
        if (!book) {
            return res.status(404).json({ message: 'El Autor no fue encontrado.' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error los libros del Autor.' });
        console.error(error);
    }
}

const getBookByName = async (req, res) =>{
    try {
        const { name } = req.params;
        const book = await Book.findOne({ name });
        if (!book) {
            return res.status(404).json({ message: 'El libro con este nombre no fue encontrado.' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener este libro.' });
        console.error(error);
    }
}

const getBookByPages = async (req, res) => {
    try {
        const { pages } = req.params;
        const book = await Book.find({ pages });
        if (!book) {
            return res.status(404).json({ message: 'El numero de paginas no fue encontrado.' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener este libro.' });
        console.error(error);
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el libro.'});
        console.error(error);
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: 'Libro eliminado exitosamente.'});
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el libro.'});
        console.error(error);
    }
}


module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    getBookByAuthor,
    getBookByName,
    getBookByPages,
}
