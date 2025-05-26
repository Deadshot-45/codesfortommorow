const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONG_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("MongoDB connected successfully");
    }catch(error){
        console.error("MongoDB connection failed:", error.message);

    }
}

module.exports = dbConnect;