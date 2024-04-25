require('dotenv').config();
const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('database connected successfully')

    } catch (error) {
        console.log(error.message)
    }
}

connectDb();