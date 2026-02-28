'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
        }
    }
    Product.init({
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        image: { type: DataTypes.STRING, defaultValue: 'default-product.png' },
        categoryId: { type: DataTypes.INTEGER }
    }, { sequelize, modelName: 'Product', tableName: 'products'  });
    return Product;
};