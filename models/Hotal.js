const {Sequelize,DataTypes} = require("sequelize");

const {sequelize} = require('../config/db');

const Hotel = sequelize.define('Hotel',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    location:DataTypes.STRING,
    rating:DataTypes.FLOAT,
    images: {
        type: DataTypes.JSON, // Store images as a JSON array
        allowNull: true,
     },

},{
    timestamps:false
});

module.exports = Hotel;