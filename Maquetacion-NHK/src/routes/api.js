const express = require('express');
const router = express.Router();
const { User, Product, Category } = require('../../database/models');
const { Op } = require('sequelize');

router.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json({
        count: users.length,
        users: users.map(u => ({
            id: u.id,
            name: `${u.firstName} ${u.lastName}`,
            email: u.email,
            detail: `http://localhost:3000/api/users/${u.id}`
        }))
    });
});

router.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: `http://localhost:3000/avatar/${user.avatar}`,
        type: user.type
    });
});

router.get('/products', async (req, res) => {
    const products = await Product.findAll({ include: Category });
    const countByCategory = {};
    products.forEach(p => {
        const cat = p.Category ? p.Category.name : 'Sin categoría';
        countByCategory[cat] = (countByCategory[cat] || 0) + 1;
    });
    res.json({
        count: products.length,
        countByCategory,
        products: products.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,        // ← agregado
            image: p.image,        // ← agregado
            categories: p.Category ? [p.Category.name] : [],
            detail: `http://localhost:3000/api/products/${p.id}`
        }))
    });
});

router.get('/products/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id, { include: Category });
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: `http://localhost:3000/${product.image}`,
        categories: product.Category ? [product.Category.name] : []
    });
});

module.exports = router;