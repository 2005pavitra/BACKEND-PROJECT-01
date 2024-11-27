const express = require("express")
const app = express();
const mongoose = require("mongoose")
const PORT = 8000;
const Listing = require("./models/listing")
const path = require("path")

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));


// app.get("/listing", async(req,res) =>{
//     const sampleListing = new Listing({
//         title:"My new Villa",
//         description:"A luxurious villa with breathtaking ocean views, private pool, and modern amenities.",
//         images:"Listing",
//         price:1200,
//         location:"Goa",
//         country:"India",
//     })
//     await sampleListing.save();
//     console.log("Sample was created")
//     res.send("successful testing")
// })

app.get("/listings", async(req, res) =>{
    const allListing = await Listing.find()
    // res.send(listing)
    res.render("listings/index.ejs",{allListing})
})

app.get("/listings/:id", async (req, res) => {
    const { id } = req.params; 
    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        res.render("listings/show", { listing }); 
    } catch (error) {
        console.error("Error fetching listing:", error); 
        res.status(500).send("Internal Server Error"); 
    }
});


app.listen(PORT, () =>{
    console.log(`Server is running at PORT ${PORT}`)
})