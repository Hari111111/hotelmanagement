const express = require("express");
const {connectDB} = require('./config/db');
const authRoutes = require('./routes/auth');
const auth = require("./middleware/auth");
const hotelRoutes = require('./routes/hotel');
const roomRoutes = require('./routes/room');
const helmet  = require("helmet");
const cors = require("cors");

const app = express();

app.use(helmet())
const corsOption={
    origin: 'http://localhost:8000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true

}
app.use(cors(corsOption))

app.use('/uploads', express.static('uploads'))

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('testing');
});

//routes

app.use('/api/auth',authRoutes);
app.use('/api/hotel',auth,hotelRoutes);
app.use('/api/room',auth,roomRoutes);
connectDB();

app.listen(8000,()=>{
    console.log(`Server running on Port 8000`)
})
