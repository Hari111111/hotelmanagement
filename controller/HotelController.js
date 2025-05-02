const { Op } = require("sequelize");
const { Hotel, Room } = require("../models");
const Booking = require("../models/Booking");

const submit = async(req,res)=>{
  
    try{
      if(!req.files) return res.json({message:"No file uploaded"})

        const images = req.files.map(image=>image.filename);

       const hotel = await Hotel.create({...req.body,images:images});
       return res.json(hotel);

    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

const getAll= async(req,res)=>{
    try{
        const hotels = await Hotel.findAll();
        return res.json({hotels});
    }catch(err){
        return res.status(500).json({ error: err.message });

    }

}
const getOne = async(req,res)=>{
    const id = req.params.id;
    const hotel= Hotel.findByPk(id);
    return res.json({hotel});
}

const update = async(req,res)=>{
    const id = req.params.id;
    const hotel = await Hotel.findByPk(id);
    if(!hotel) return res.status(400).json({message:"Data not found"});
    await hotel.update(req.body);
    return res.json({hotel});
}

const deleteData = async(req,res)=>{
    const id = req.params.id;
    const hotel = await Hotel.findByPk(id);
    if(!hotel) return res.status(400).json({message:"Data not found"});
    await hotel.destroy();
    return res.status(201).json({message:"Data deleted Successfully"});
}

const search = async(req,res)=>{
    const {location,minPrice,maxPrice,available} = req.query;

    const hotelFilter = {};
    const roomFilter = {};
    if(location){
        hotelFilter.location={[Op.like]:`%${location}%`};
    }
    if(minPrice || maxPrice){
        roomFilter.price = {};
        if(minPrice) roomFilter.price[Op.gte]=Number(minPrice);
        if(maxPrice) roomFilter.price[Op.lte]=Number(maxPrice);
    }

    if(available){
        roomFilter.available = available === 'true';
    }
    const hotels = await Hotel.findAll({
        where:hotelFilter,
        include:[{
            model:Room,
            where:roomFilter,
            required:true
        }]
    });

    return res.status(200).json({hotels});
}

const history=async(req,res)=>{
    try {
        const bookings = await Booking.findAll({
          where: { userId: req.user.id },
          include: [
            {
              model:Room,
              include:[
                {
                  model:Hotel
                }
              ]
            }
          ],
          order: [['checkIn', 'DESC']],
        });
        res.json(bookings);
      } catch (err) {
        res.status(500).json({ message: 'Failed to get booking history' });
      }
}

const bookingCancle = async(req,res)=>{
    try {
        const booking = await Booking.findOne({
          where: { id: req.params.id, userId: req.user.id },
        });
    
        if (!booking) {
          return res.status(404).json({ message: 'Booking not found' });
        }
    
        const now = new Date();
        if (new Date(booking.checkIn) <= now) {
          return res.status(400).json({ message: 'Cannot cancel past or ongoing booking' });
        }
    
        booking.status = 'cancelled';
        await booking.save();
    
        return res.json({ message: 'Booking cancelled successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Cancellation failed' });
      }
}

const createBooking = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;
    const userId = req.user.id;

    if (!roomId || !checkIn || !checkOut) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({ message: 'Check-out must be after check-in' });
    }


    const checkRoomIsAvailable = await Room.findOne({where:{id:roomId,available:true}});
    if(!checkRoomIsAvailable) return res.status(400).json({message:"Room is not available"})


      const overlappingBooking = await Booking.findOne({
        where: {
          roomId,
          status: 'confirmed', 
          [Op.or]: [
            {
              checkIn: { [Op.lt]: checkOutDate },
              checkOut: { [Op.gt]: checkInDate }
            }
          ]
        }
      });
      
    if (overlappingBooking) {
      return res.status(409).json({ message: 'Room is not available for the selected dates' });
    }

    const booking = await Booking.create({
      userId,
      roomId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      status: 'confirmed',
    });

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};


module.exports = {
    submit,getAll,getOne,update,deleteData,search,createBooking,bookingCancle,history
}