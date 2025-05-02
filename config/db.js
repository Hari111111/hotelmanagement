// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//     host:'localhost',
//     user:"root",
//     password:"",
//     database:"hotel_management",

// })

// module.exports = pool;

const {Sequelize} = require("sequelize");
const sequelize = new Sequelize('hotel_management','root','',{
    host:'localhost',
    dialect:'mysql'
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };  // ✅ Export both
