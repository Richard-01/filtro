const {Client} = require('../Models/client.Model');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY, ONE_DAY_IN_SECONDS } = require('../config');
const { handleError } = require('../helpers/errorHandling');

const handleErrorRes = handleError(res);

const createClient = async (req, res) => {
    try {
        const { name, lastname, email, gender, age} = req.body;
        const clientData = {
            name,
            lastname,
            email,
            gender,
            age
        }
        const newClient = new Client(clientData);
        await newClient.save();
        const token = jwt.sign({id: newClient._id }, JWT_SECRET_KEY,{
            expiresIn: ONE_DAY_IN_SECONDS
        });
        const clientDataWithToken = { 
            id: newClient._id, 
            name: newClient.name, 
            lastname: newClient.lastname, 
            email: newClient.email, 
            gender: newClient.gender,
            age: newClient.age,
            token: token  
        }
        res.status(201).send({ status: true, data: clientDataWithToken, message: 'Acceso permitido.'});
    } catch (error) {
        handleErrorRes(400, 'Error al crear el cliente.', error);
    }
}

const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes.'});
        console.error(error);
    }
}

const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.findById(id);
        res.status(200).json(client);
    } catch (error) {
        handleErrorRes(404, 'Error al obtener este cliente.', error);
    }
}

const getClientByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const client = await Client.findOne({ email });
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado.' });
        }
        res.status(200).json(client);
    } catch (error) {
        handleErrorRes(404, 'Error al obtener este cliente por email, verifica el email.', error);
    }
}

const getClientsByGender = async (req, res) => {
    try {
        const { gender } = req.params;
        const clients = await Client.find({ gender });
        res.status(200).json(clients);
    } catch (error) {
        handleErrorRes(404, 'Error al obtener clientes por género.', error);
    }
}

const getClientsByAge = async (req, res) => {
    try {
        const { age } = req.params;
        const clients = await Client.find({ age });
        if (!clients){
            return res.status(404).json({ message: 'Esta edad no fue encontrada.' });
        }
        res.status(200).json(clients);
    } catch (error) {
        handleErrorRes(404, 'Error al obtener clientes por edad.', error);
    }
}

const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedClient = await Client.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedClient);
    } catch (error) {
        handleErrorRes(400, 'Error al actualizar el cliente.', error);
    }
}

const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        await Client.findByIdAndDelete(id);
        res.status(200).json({ message: 'Cliente eliminado exitosamente.'});
    } catch (error) {
        handleErrorRes(400, 'Error al eliminar el cliente.', error);
    }
}

module.exports = {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient,
    getClientByEmail,
    getClientsByGender,
    getClientsByAge
}