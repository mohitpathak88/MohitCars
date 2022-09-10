import { useParams } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'     //Accessing the reducer data into components
import { getAllCars } from '../redux/actions/carsActions';
import { Button, Row, Col, Divider, DatePicker, Checkbox, Modal} from 'antd';
import Spinner from '../components/Spinner';
import moment from 'moment';        //This library is used to select our own date format
import { bookCar } from '../redux/actions/bookingActions';
import StripeCheckout from 'react-stripe-checkout';     //For using stripe payments
import AOS from 'aos';      //'animate on scroll' is a module used to animate things into moving state like car img on login page 
//(Look at where car img src is given )
import 'aos/dist/aos.css';


const {RangePicker} = DatePicker;       //Used to pick dates on booking page    

 // Recieving id of a particular car through app.js as 'match'
 function BookingCar() {   
    //Now we have to get all cars in this page and then filter only one car to be displayed using its id  
    const {cars} = useSelector(state=>state.carsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const dispatch = useDispatch()
    const [car, setcar] = useState([])      //Initially declared as an empty object
    let {carid} = useParams();      //For grabbing the car id from the route. 'carid' variable name is the exact name which is sent through app.js4
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [totalHours, setTotalHours]= useState(0)      //For calculating no of hours a car is booked for (no of hours between from and to)
    const [driver, setdriver] = useState(false);        //If driver is required
    const [totalAmount, setTotalAmount]= useState(0)        //Total amount for booking a car
    const[showModal, setShowModal] = useState(false)        //For showing modal popup. Whenever we click 'see slots', it turns true
    var x=0;
    
     
    useEffect(() => {       //Whenever the page is rendered, we need to call the action of getting all cars automatically
        if(cars.length==0)
        {
            dispatch(getAllCars())      //Dispatching the action
        }
        
        else       //Now whenever the cars array is not empty, we are going to update car state
        {
            setcar(cars.find(o=>o._id==carid))     //Finding particular car by iterating through all cars. 'o' is the iterator object
        }
    }, [cars])

    useEffect(() => {       //Whenever the total hours or driver required is changing, total amount is  getting updated
        setTotalAmount((totalHours * car.rentPerHour))
        if(driver)          //If driver box is checked, then 30 rs addtional for every hour
        {
            setTotalAmount(totalAmount + (30 * totalHours))
        }
    }, [driver , totalHours])

     function selectTimeSlots(values){       // Recieving two dates in array from the time selected
        ////Time stored in antd is in their own format. So we use moment to convert it into our own format
        // console.log(moment(values[0]).format('MMM DD yyyy HH:mm'))    //values[0] indicates 'Time From'
        // console.log(moment(values[1]).format('MMM DD yyyy HH:mm'))     //values[1] indicates 'Time To'
        setFrom(moment(values[0]).format('MMM DD yyyy HH:mm'))
        setTo(moment(values[1]).format('MMM DD yyyy HH:mm'))

        setTotalHours(values[1].diff(values[0], 'hours'))       //Difference of time 'from' and 'to' 

    }

    function bookNow(){     //Sending the below values to backend as an action  
 
    }

    function onToken(token){       //getting token object as the parameter whenever book now is clicked and sending it to the backend as an action
        const reqObj = {
            token,
            user : JSON.parse(localStorage.getItem('user'))._id,
            car : car._id,
            totalHours,
            totalAmount,
            driverRequired : driver,     //the driver variable has the true or false value
            bookedTimeSlots : {
                from,
                to
            }
        }

        dispatch(bookCar(reqObj))
    }
      
    return ( 
        <DefaultLayout>
            {loading== true && (<Spinner/>)}
            <Row justify='center' className='d-flex align-items-center' style={{minHeight:'90vh'}}>
                <Col lg={10} sm={24} xs={24} className="p-3">
                    <img src={car.image} className="carimg2 bs1 w-100" data-aos="flip-left" data-aos-duration="1500" />
                </Col>
                <Col lg={10} sm={24} xs={24}>
                    <Divider dashed> Car Info </Divider>
                    <div style={{textAlign:'right'}}>
                        <p>{car.name}</p>
                        <p>{car.rentPerHour} Rent Per Hour /-</p>
                        <p>Fuel: {car.fuelType}</p>
                        <p>Max Persons: {car.capacity}</p>
                    </div>
                    <Divider dashed> Select Time Slots </Divider>  
                    <RangePicker showTime={{format: 'HH:mm'}} format='MMM DD yyyy HH:mm' onChange={selectTimeSlots}/>
                    {/* Declaring our own date format */}
                    {/* 'showTime' is used to display time range for selection in bookings page */}
                    <br/>
                    <button className='btn1 mt-2' onClick={()=>{setShowModal(true)}}>See booked Slots</button>

                    {from && to && (        //The below things will only be shown in bookings page if 'from' and 'to' times are selected by user
                    <div style={{textAlign:'right'}}>
                        <p>Total Hours : <b>{totalHours}</b></p>
                        <p>Rent Per Hour: <b>{car.rentPerHour}</b></p>
                        {/* Now creating a checkbox for driver */}
                        <Checkbox onChange={(e)=>{
                            if(e.target.checked)
                            {
                                setdriver(true);
                            }
                            else{
                                setdriver(false);
                            }
                        }}>Driver Required</Checkbox>

                        <h3>Total Amount: {totalAmount} </h3>
                        <StripeCheckout
                            shippingAddress         //Adding address field in stripe payment checkout
                            token={onToken}     //onToken function will be called whenever we click book now
                            currency='inr'       //setting currency to inr
                            amount={totalAmount * 100}          //displaying total amount during checkout (*100 coz coverting from cents to rupee)
                            //and then adding publishable key of my stripe account used in frontend
                            stripeKey="pk_test_51LYwurSGTpgCxMuYiCwguujkjfgoZskoCWlqsa8IcRbRCkK9Xgz3hbNTIDgRaKiLqYVBnPyO4Bx6mz2h8hXGEE9D00XM9URaIo">
                                <button className='btn1'>Book Now</button>
                        </StripeCheckout>
                        
                    </div> )}
                    
                </Col>
                {/* Now creating a modal popup for all booked slots */}
                {car.name && (              //If only the car is present then show the modal
          <Modal
            visible={showModal}         //To see if its visible by checking it to be true or false
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {          //looping through booked time slots
              x=x+1;
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                {/* For creating the modal closing button: */}
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
            </Row>
        </DefaultLayout>
     );
}
 
export default BookingCar;