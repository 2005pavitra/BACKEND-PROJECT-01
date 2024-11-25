const express = require("express")
const app = express();
const mongoose = require("mongoose")
const PORT = 8000;

const MONGO_URL = "mongodb://127.0.0.1:27017/backend_project_01"
main()
.then(() =>{
    console.log("Mongodb connected successfully")
})
.catch(() =>{
    console.log("mongodb connection error")
})
async function main(){
   await mongoose.connect(MONGO_URL)
}


app.get("/get", (req,res) =>{
    res.send("Hii")
})

app.listen(PORT, () =>{
    console.log(`Server is running at PORT ${PORT}`)
})