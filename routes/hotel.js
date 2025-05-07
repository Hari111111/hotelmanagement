const express = require("express");
const {
  submit,
  getAll,
  deleteData,
  update,
  getOne,
  search,
  createBooking,
  history,
  bookingCancle
} = require("../controller/HotelController");
const adminOnly = require("../middleware/adminMiddleware");
const { hotelValidator, handleValidation } = require("../middleware/validator/hotelValidator");
const upload = require('../file-upload/upload');

const router = express.Router();

/**
 * @swagger
 * /api/hotel/create:
 *   post:
 *     summary: Create a new hotel (admin only)
 *     tags:
 *       - Hotel
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               rating:
 *                 type: number
 *                 format: float
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Hotel created
 */
router.post('/create', adminOnly, upload.array('images'), hotelValidator, handleValidation, submit);

/**
 * @swagger
 * /api/hotel/getAll:
 *   get:
 *     summary: Get all hotels
 *     tags:
 *       - Hotel
 *     responses:
 *       200:
 *         description: List of hotels
 */
router.get('/getAll', getAll);


 /**
 * @swagger
 * /api/hotel/filter/search:
 *   get:
 *     summary: Search hotels by filters
 *     tags:
 *       - Hotel
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: City or location name
 *       - in: query
 *         name: priceMin
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: priceMax
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: rating
 *         schema:
 *           type: number
 *         description: Minimum rating filter
 *       - in: query
 *         name: amenities
 *         schema:
 *           type: string
 *         description: Comma-separated list of required amenities
 *     responses:
 *       200:
 *         description: Filtered hotel results
 */
router.get('/filter/search', search);

/**
 * @swagger
 * /api/hotel/{id}:
 *   get:
 *     summary: Get hotel by ID
 *     tags:
 *       - Hotel
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hotel ID
 *     responses:
 *       200:
 *         description: Hotel details
 */

router.get('/:id', getOne);

/**
 * @swagger
 * /api/hotel/{id}:
 *   put:
 *     summary: Update hotel (admin only)
 *     tags:
 *       - Hotel
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Hotel updated
 */
router.put('/:id', adminOnly, update);

/**
 * @swagger
 * /api/hotel/{id}:
 *   delete:
 *     summary: Delete hotel (admin only)
 *     tags:
 *       - Hotel
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hotel deleted
 */
router.delete('/:id', adminOnly, deleteData);

/**
 * @swagger
 * /api/hotel/booking/create:
 *   post:
 *     summary: Create a booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roomId
 *               - checkIn
 *               - checkOut
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID of the user making the booking
 *               roomId:
 *                 type: integer
 *                 description: ID of the room being booked
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *                 description: Check-in date and time
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *                 description: Check-out date and time
 *               status:
 *                 type: string
 *                 enum: [confirmed, cancelled]
 *                 description: Booking status (optional, default is confirmed)
 *     responses:
 *       201:
 *         description: Booking successfully created
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */

router.post('/booking/create', adminOnly, createBooking);

/**
 * @swagger
 * /api/hotel/booking/history:
 *   get:
 *     summary: Get booking history
 *     tags:
 *       - Booking
 *     responses:
 *       200:
 *         description: Booking history list
 */
router.get('/booking/history', history);

/**
 * @swagger
 * /api/hotel/booking/cancle/{id}:
 *   get:
 *     summary: Cancel a booking
 *     tags:
 *       - Booking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking cancelled
 */
router.get('/booking/cancle/:id', bookingCancle);

module.exports = router;
