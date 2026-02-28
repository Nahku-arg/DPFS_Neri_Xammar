const { validationResult } = require('express-validator');
const { Product, Category } = require('../../database/models');

module.exports = {

    listar: async (req, res) => {
    try {
        const productos = await Product.findAll({ include: Category });
        res.render('producs/home', { productos });
    } catch (err) {
        console.error(err);
        res.send(err.message);
    }
},

    detalle: async (req, res) => {
        const producto = await Product.findByPk(req.params.id, { include: Category });
        res.render('producs/articulo', { producto });
    },

    mostrarCrear: async (req, res) => {
        const categorias = await Category.findAll();
        res.render('admin/crear-prod', { categorias });
    },

    crear: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const categorias = await Category.findAll();
        return res.render('admin/crear-prod', { errors: errors.array(), categorias });
    }
    const { name, description, price, categoryId } = req.body;
    const image = req.file ? req.file.filename : 'default-product.png';
    await Product.create({ name, description, price, image, categoryId });
    res.redirect('/');
},

    mostrarEditar: async (req, res) => {
        const producto = await Product.findByPk(req.params.id);
        const categorias = await Category.findAll();
        res.render('admin/editar-prod', { producto, categorias });
    },

    editar: async (req, res) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        const producto = await Product.findByPk(req.params.id);
        const categorias = await Category.findAll();
        return res.render('admin/editar-prod', { errors: errors.array(), producto, categorias });
    }
    const { name, description, price, categoryId } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const updateData = { name, description, price, categoryId };
    if (image) updateData.image = image;
    await Product.update(updateData, { where: { id: req.params.id } });
    res.redirect('/');
},

    eliminar: async (req, res) => {
        await Product.destroy({ where: { id: req.params.id } });
        res.redirect('/');
    },

    buscar: async (req, res) => {
    const { q } = req.query;
    const { Op } = require('sequelize');
    const productos = await Product.findAll({
        include: Category
    });

    const filtrados = productos.filter(p => 
        p.name.toLowerCase().includes(q.toLowerCase()) || 
        (p.Category && p.Category.name.toLowerCase().includes(q.toLowerCase()))
    );

    res.render('producs/home', { productos: filtrados });
    }
};