const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./database/models');
const apiRoutes = require('./src/routes/api');

db.sequelize.authenticate()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar:', err));

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'nhk-secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.userLogged = req.session.user || null;
    next();
});

app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src/view')));
app.use(express.static(path.join(__dirname, 'src/recursos')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/view'));

const usersRoutes = require('./src/routes/users');
const productsRoutes = require('./src/routes/products');

const productsController = require('./src/controllers/productsController');

app.get('/', productsController.listar);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

app.use('/api', apiRoutes);

app.get('/dashboard', (req, res) => {
    res.render('admin/dashboard');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});