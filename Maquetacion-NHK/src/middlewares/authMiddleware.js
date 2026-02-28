const isGuest = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/users/perfil');
    }
    next();
};

const isLogged = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/users/inicio-sesion');
    }
    next();
};

module.exports = { isGuest, isLogged };