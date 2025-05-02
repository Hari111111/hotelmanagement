const express = require("express");
const { submit, getAll, deleteData, update, getOne, search, createBooking, history, bookingCancle } = require("../controller/HotelController");
const adminOnly = require("../middleware/adminMiddleware");
const {hotelValidator,handleValidation} = require("../middleware/validator/hotelValidator");

const upload = require('../file-upload/upload')

router = express.Router();

router.post('/create',adminOnly,upload.array('images'),hotelValidator,handleValidation ,submit);
router.get('/getAll',getAll)
router.get('/filter/search',search);
router.get('/:id',getOne);
router.put('/:id',adminOnly,update);
router.delete('/:id',adminOnly,deleteData);
router.post('/create/booking',adminOnly, createBooking);
router.get('/booking/history', history);
router.get('/booking/cancle/:id', bookingCancle);

module.exports=router;