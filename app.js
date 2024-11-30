const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8000;
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


const MONGO_URL = "mongodb://127.0.0.1:27017/backend_project_01";
main()
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch(() => {
    console.log("mongodb connection error");
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")))
app.engine('ejs', ejsMate);
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

//Create Route
app.post("/listings", async (req, res) => {
  try{
    console.log("Incoming data:", req.body.listing);
    const newListing = new Listing(req.body.listing);
    console.log("Listing created:", newListing)

    await newListing.save();
    console.log("Listing Saved");
    res.redirect("/listings")
  }catch(error){
    console.error("error in creating new list")
  }
});


app.get("/listings", async (req, res) => {
  try {
    const allListing = await Listing.find();
    console.log("Fetching listings: ", allListing)
    res.render("listings/index.ejs", { allListing });
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).send("Internal Server Error");
  }
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});



//Show Route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});


//edit route
app.get("/listings/:id/edit", async(req,res) =>{
  const {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", {listing});
})

//updated route
app.put("/listings/:id", async(req, res) =>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing})
  res.redirect("/listings");
})

//delete route
app.delete("/listings/:id", async(req,res) =>{
  let {id} = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings")
}) 

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
