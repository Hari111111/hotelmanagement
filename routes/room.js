// roomRoutes.js

const express = require("express");
const { submit, getAll, getOne, update, deleteData } = require("../controller/RoomController");
const adminOnly = require("../middleware/adminMiddleware");
const { roomValidator, handleValidation } = require("../middleware/validator/roomValidator");
const upload = require("../file-upload/upload");

router = express.Router();


/**
 * @swagger
 * /api/room/create:
 *   post:
 *     summary: Create a new room
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 description: Room number (e.g., 101, 202)
 *               type:
 *                 type: string
 *                 description: Type of room (e.g., Single, Double)
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the room
 *               hotelId:
 *                 type: integer
 *                 description: The ID of the hotel where the room belongs
 *               available:
 *                 type: boolean
 *                 description: Room availability status
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Images of the room (file upload)
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 room:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Room ID
 *                     number:
 *                       type: string
 *                       description: Room number
 *                     type:
 *                       type: string
 *                       description: Room type
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: Room price
 *                     hotelId:
 *                       type: integer
 *                       description: Hotel ID
 *                     available:
 *                       type: boolean
 *                       description: Availability of the room
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Room images
 *       400:
 *         description: Bad request (missing required fields)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/room/getAll:
 *   get:
 *     summary: Get all rooms
 *     tags: [Room]
 *     responses:
 *       200:
 *         description: List of all rooms
 */

/**
 * @swagger
 * /api/room/{id}:
 *   get:
 *     summary: Get a single room by ID
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Room details
 *       404:
 *         description: Room not found
 */

/**
 * @swagger
 * /api/room/{id}:
 *   put:
 *     summary: Update a room
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *               price:
 *                 type: number
 *               type:
 *                 type: string
 *               hotelId:
 *                 type: integer
 *               available:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       404:
 *         description: Room not found
 */

/**
 * @swagger
 * /api/room/{id}:
 *   delete:
 *     summary: Delete a room
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       404:
 *         description: Room not found
 */

router.post('/create', adminOnly, upload.array('images'), roomValidator, handleValidation, submit);
router.get('/getAll', getAll);
router.get('/:id', getOne);
router.put('/:id', adminOnly, update);
router.delete('/:id', adminOnly, deleteData);

module.exports = router;
