const mongoose = require('mongoose');
const { DB_URI } = require('../config');


const connector = async () => {
    await mongoose.connect(DB_URI,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
        .then(() =>{
            console.log('Estas conectado a la base de datos!');
         })
        .catch((err) => {
            console.log(err);
         });
}


module.exports = { 
    connector
};
