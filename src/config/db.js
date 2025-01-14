const { log } = require("console")
const mongoose = require("mongoose")

const connectDB = async()  => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        })
        console.log("Connected to db successfully!");
    }
    catch(error){
        console.log("Error connecting to db", error.message);
        process.exit(1)
    }
}

module.exports = connectDB