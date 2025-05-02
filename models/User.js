const {Sequelize,DataTypes} = require("sequelize");

const {sequelize} = require("../config/db");

const User =  sequelize.define('User',{
    userName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: {
            msg: 'Email must be unique'
          }
        
    },
    password:{
        type:DataTypes.STRING,
        allowNull:null
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user', // 👈 This line ensures a default role
    }

},{timestamps:false})

module.exports= User;