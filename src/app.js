const app = require('./server');
const { PORT } = require('./config');

app.listen(PORT, () => {
    console.log(`Servidor en el puerto -> ${PORT}`);
});
