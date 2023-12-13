//import mongoose
const mongoose = require("mongoose")

require("dotenv").config()

//connect to database
const DB = process.env.db
mongoose.connect(DB).then(()=>{
    console.log("Connected to database")
})
.catch(()=>{
    console.log("Failed to connect to database")
});

