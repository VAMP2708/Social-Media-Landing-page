const mongoose = require("mongoose");

const mongodb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('mongodb is connected..')
    } catch (error) {
        console.log('mongodb is not connected',error)
        process.exit(1)
    }
}
module.exports = mongodb