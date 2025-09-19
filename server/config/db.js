

const mongoose = require("mongoose")


module.exports.ConnectDb = async()=>{



    try {
         await mongoose.connect(process.env.MONGO_URL)
         console.log("database connected succesfully")
        
    } catch (error) {
        console.log(error)
        
        
    }
}