const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel")
const Car = require('../models/carModel')
const stripe = require('stripe')('sk_test_51LYwurSGTpgCxMuYZTeuZv2Y6FGuFCVbAa651vLfXSVeHamxp7BCvAvM8eCzWiRtn6FcetzuIjTPTAjsBqcAKXn400qdDUILOi')
//importing stripe dependency along with its backend secret key
const {v4 : uuidv4} = require('uuid');      //importing uuid module used for generating unique string for every transactiobs

router.post("/bookcar", async(req, res)=>{
    //We will save req.body coming from frontend as it is in the database

    const {token} = req.body        //destructuring token initially
    //req.body.transactionId = '1234'
    try{
        //We first have to check if the payment is successful then only add bookings in database
        const customer = await stripe.customers.create({        //Creating a customer using email and id
            email: token.email,
            source: token.id,
          });
      
          const payment = await stripe.paymentIntents.create(      //Now creating payment which has 2 objects. 1- Payment details, 2-idempotencyKey is 
          //transaction id which is unique for every transaction
            {
              amount: req.body.totalAmount * 100,
              currency: "inr",
              customer: customer.id,        //To tell on which customer the payment has to be created which is the current customer in 'customer' variable
              receipt_email: token.email,
              payment_method_types: ['card']
            },
            {
              idempotencyKey: uuidv4(),     //uuid npm module which gives unique string for every iteration
              
            }
          )
          //Now if the payment is successful, 'payment' will become true and booking will be saved else not
        if(payment)
        {
          console.log(token)
          //console.log(payment.source.id)
          req.body.transactionId = customer.id    //Customer id will be saved as the transsaction id in database
          const newbooking = new Booking(req.body)
          await newbooking.save()     //Saving the data in database
          //Now, as we have recieved and saved booking data, we need to save the time slots in the model of car where there is a bookingslots field
          const car = await Car.findOne({_id : req.body.car})     //First we ll find the car with the id in req.body
          car.bookedTimeSlots.push(req.body.bookedTimeSlots)          //pushing the timeslots in carModel
          console.log(req.body.car)
          await car.save()            //Saving it in the database
          res.send('Your Booking is done Successfully')
        }
        else{
          return res.status(400).json(error);
        }
        
    }
    catch(error){
      console.log(error)
      return res.status(400).json(error);
    }
})

router.get("/getallbookings", async(req,res)=>{
  try{
    const bookings = await Booking.find().populate('car')    //By find function, we get only car id, so to get complete car object we use 
    //populate function. Now we can use the car info in car object in UserBookings
    res.send(bookings)
  }
  catch (error) { 
    return res.status(400).json(error);
  }
});

module.exports = router;