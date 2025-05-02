const Booking = require('./Booking');
const Hotel = require('./Hotal')
const Room = require('./Room');
const User = require('./User');

Hotel.hasMany(Room,{foreignKey:'hotelId',onDelete:'CASCADE'});
Room.belongsTo(Hotel,{foreignKey:"hotelId"});

Booking.belongsTo(User,{foreignKey:"userId"});
Booking.belongsTo(Room,{foreignKey:"roomId"});


module.exports = {Hotel,Room};