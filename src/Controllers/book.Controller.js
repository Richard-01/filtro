const { Book } = require('../Models/book.Model');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, ONE_DAY_IN_SECONDS } = require('../config');
const { handleError } = require('../helpers/errorHandling');

const handleErrorRes = handleError(res);


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
        const token = jwt.sign({id: newBook._id }, JWT_SECRET_KEY,{
            expiresIn: ONE_DAY_IN_SECONDS
        });
        const bookDataWithToken = { 
            id: newBook._id, 
            name: newBook.name, 
            author: newBook.author, 
            pages: newBook.pages, 
            description: newBook.description, 
            token: token  
        }
        res.status(201).send({ status: true, data: bookDataWithToken, message: 'Acceso permitido.'});
    } catch (error) {
        handleErrorRes(400, 'Error al crear el libro.', error);
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
        handleErrorRes(404, 'Error al obtener este libro.', error);
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
        handleErrorRes(404, 'Error al obtener este libro por autor, verifica el autor.', error);
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
        handleErrorRes(404, 'Error al obtener libros por nombre.', error);
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
        handleErrorRes(404, 'Error al obtener libros por paginas.', error);
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        handleErrorRes(400, 'Error al actualizar el libro.', error);
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: 'Libro eliminado exitosamente.'});
    } catch (error) {
        handleErrorRes(400, 'Error al eliminar el libro.', error);
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
