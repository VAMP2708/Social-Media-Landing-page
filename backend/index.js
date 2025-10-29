const express = require('express');
const mongodb = require('./config/db');
require('dotenv').config()
mongodb();
const cors = require('cors')
const app = express();
app.use(cors())
const path = require('path');
app.use(express.static(path.join(__dirname, 'Frontend')));
app.use(express.json())

//importing routes here
const userRoutes = require('./routes/userRoutes');
// use routes
app.use('/api',userRoutes)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`http://localhost:5000`);
})