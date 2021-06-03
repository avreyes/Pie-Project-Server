/**
 * Items we want:
 * first name = string
 * last name = string
 * email = (limited 100 char) / unique
 * password = string
 * 
 * no null values
 */

const { DataTypes } = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = User;