const express = require("express");
const router = express.Router();
const Car = require("../models/carModel")

router.get("/getallcars", async(req, res) =>{
    try{
        const cars = await Car.find()
        res.send(cars)
    }   catch(error) {
        return res.status(400).json(error);
    }
});

router.post("/addcar", async(req, res) =>{
    try{
        const newcar = new Car(req.body)
        await newcar.save()
        res.send('Car Added Successfully')
    }   
    catch(error) {
        return res.status(400).json(error);
    }
})

router.post("/editcar", async(req, res) =>{
    try{
        const car = await Car.findOne({_id : req.body._id})     //First we ll find the car
        //Now we ll update the values one by one: (We dont use the Update() coz we dont want bookedSlots in the database to be updated, hence 
        //we ll update only the specific ones)
        car.name = req.body.name
        car.image = req.body.image
        car.fuelType = req.body.fuelType
        car.rentPerHour = req.body.rentPerHour
        car.capacity = req.body.capacity

        await car.save()

        res.send('Car details updated successfully')
    }   
    catch(error) {
        return res.status(400).json(error);
    }
})

router.post("/deletecar", async(req, res) =>{
    try{
        await Car.findOneAndDelete({_id : req.body.carid})     //First we ll find the car and then delete it

        res.send('Car details updated successfully')
    }   
    catch(error) {
        return res.status(400).json(error);
    }
})
module.exports = router;