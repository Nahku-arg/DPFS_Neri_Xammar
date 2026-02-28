'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {}
    }
    User.init({
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        avatar: { type: DataTypes.STRING, defaultValue: 'default-avatar.png' },
        type: { type: DataTypes.ENUM('Admin', 'Customer'), defaultValue: 'Customer' }
    }, { sequelize, modelName: 'User', tableName: 'users', timestamps: false });
    return User;
};