
 const {Sequelize,DataTypes} = require("sequelize");
const { sequelize } = require("../config/db");


  const Booking = sequelize.define(
    'Booking',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      checkIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checkOut: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('confirmed', 'cancelled'),
        defaultValue: 'confirmed',
        allowNull: false,
      },
    },
    {
      tableName: 'bookings',     
      timestamps: false,         
      underscored: false, 
    }
  );

  module.exports =Booking;