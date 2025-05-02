const express = require("express");
const { submit, getAll, getOne, update, deleteData } = require("../controller/RoomController");
const adminOnly = require("../middleware/adminMiddleware");
router = express.Router();
const {roomValidator,handleValidation} = require("../middleware/validator/roomValidator");
const upload = require("../file-upload/upload");

router.post('/create',adminOnly,upload.array('images'),roomValidator,handleValidation,submit);
router.get('/getAll',getAll);
router.get('/:id',getOne);
router.put('/:id',adminOnly,update);
router.delete('/:id',adminOnly,deleteData);
module.exports=router;