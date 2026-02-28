const bcrypt = require('bcryptjs');
const { User } = require('../../database/models');
const { validationResult } = require('express-validator');

const usersController = {

    register: (req, res) => {
        res.render('users/registro');
    },

    processRegister: async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.render('users/registro', { errors: errors.array() });
    }

    if (req.fileValidationError) {
        return res.render('users/registro', { errors: [{ msg: req.fileValidationError }] });
    }

    const { name, lastname, email, password } = req.body;

    const existe = await User.findOne({ where: { email } });
    if (existe) {
        return res.render('users/registro', { errors: [{ msg: 'El email ya está registrado' }] });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const avatar = req.file ? req.file.filename : 'default-avatar.png';

    await User.create({
        firstName: name,
        lastName: lastname,
        email,
        password: passwordHash,
        avatar,
        type: 'Customer'
    });

    res.redirect('/users/inicio-sesion');
},

    login: (req, res) => {
        res.render('users/inicio-sesion');
    },

    processLogin: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('users/inicio-sesion', { errors: errors.array() });
    }

    const { email, password } = req.body;

    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
        return res.render('users/inicio-sesion', { errors: [{ msg: 'Email o contraseña incorrectos' }] });
    }

    const esCorrecta = bcrypt.compareSync(password, usuario.password);
    if (!esCorrecta) {
        return res.render('users/inicio-sesion', { errors: [{ msg: 'Email o contraseña incorrectos' }] });
    }

    req.session.user = {
        id: usuario.id,
        firstName: usuario.firstName,
        lastName: usuario.lastName,
        email: usuario.email,
        avatar: usuario.avatar,
        type: usuario.type
    };

    res.redirect('/');
},

    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/users/inicio-sesion');
    },

    perfil: (req, res) => {
        res.render('users/perfil', { user: req.session.user });
    }
};

module.exports = usersController;