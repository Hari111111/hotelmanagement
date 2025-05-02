const {Sequelize,DataTypes} = require("sequelize");

const {sequelize} = require("../config/db");

const Room = sequelize.define('Room',{
    number:{
        type:DataTypes.STRING,
        allowNull:false
    },
    type:DataTypes.STRING,
    price:DataTypes.FLOAT,
    hotelId:DataTypes.INTEGER,
    available:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    images: {
        type: DataTypes.JSON, // Store images as a JSON array
        allowNull: true,
      },
},{
    timestamps:false
});

module.exports = Room;
