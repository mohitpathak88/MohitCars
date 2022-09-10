import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout';
import {useSelector, useDispatch} from 'react-redux'     //Accessing the reducer data into components
import { getAllCars } from '../redux/actions/carsActions';
import { Button, Row, Col, Divider, DatePicker, Checkbox} from 'antd';        //Importing row and col for implementing grid system
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';        //This library is used to select our own date format


const {RangePicker} = DatePicker;       //Used to pick dates on booking page    


function Home() {
    const {cars} = useSelector(state=>state.carsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const dispatch = useDispatch()
    const [totalCars, setTotalCars]= useState([])
     
    useEffect(() => {       //Whenever the page is rendered, we need to call the action of getting all cars automatically
        dispatch(getAllCars())      //Dispatching the action
    }, [])

    useEffect(()=> {        //whenever the cars value changes, total cars available changes
        setTotalCars(cars)
    }, [cars])

    function setFilter(values){    // using this function, we will filter cars on home page based on their availability of the selected slot

        var selectedFrom = moment(values[0], 'MMM DD yyyy HH:mm')
        var selectedTo = moment(values[1], 'MMM DD yyyy HH:mm')

        var temp=[]
        for(var car of cars){
            if(car.bookedTimeSlots.length == 0){        //If the car has no booking, we add the car to temp
                temp.push(car)
            }
            else{
                for(var booking of car.bookedTimeSlots){        //else we ll loop through the book time slots array of cars if the current time
                    // picked by the user is in between the booked slots of any car or not
                    if(selectedFrom.isBetween(booking.from, booking.to)    ||
                     selectedTo.isBetween(booking.from, booking.to)   ||
                     moment(booking.from).isBetween(selectedFrom, selectedTo) ||        
                     moment(booking.to).isBetween(selectedFrom, selectedTo)
                     //Last two conditions check if either 'from' or 'to' of a booked car slot is in between the time selected by the user or not
                     )
                     {
                        //Making it empty as we if any of the above condition meet we do not want to pass it in temp as that car is not available
                     }
                     else{
                        temp.push(car)
                     }
                }
            }   
        }

        setTotalCars(temp)      //assinging temp to total cars
    }

    return (
        <DefaultLayout>
            {/*Now we ll implement a grid system using antd */ }

            {/* Below Row for filtering cars */}
            <Row className='mt-3' justify='center'>

                <Col lg={20} sm={24} className='d-flex justify-content-left'>
                    <RangePicker showTime={{format: 'HH:mm'}} format='MMM DD yyyy HH:mm' onChange={setFilter}/>
                    {/* calling setFilter function */}
                </Col>

            </Row>
            {loading== true && (<Spinner/>)}        {/* If loading == true, call spinner component*/}
                <Row justify="center" gutter={16}>    {/* 1*/}
                    {totalCars.map(car=>{        //Looping through cars array. for every iteration we are going to get car object
                        return <Col lg={5} sm={24} xs={24}>     {/* 1*/}
                            <div className='car p-2 bs1'>
                                <img src={car.image} className="carimg" />
                                <div className="car-content d-flex align-items-center justify-content-between">
                                    <div className='text-left pl-2'>
                                        <p>{car.name}</p>
                                        <p>Rent Per Hour {car.rentPerHour}/-</p>
                                    </div>
                                    <div>
                                        <button className='btn1 mr-2'><Link to={`/booking/${car._id}`}>Book Now</Link></button>
                                        {/*In above line, creating a link to `booking/particular car's id` after clicking 'book now'. Then that 
                                        route is used through app.js */}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    })}
                </Row>
            
        </DefaultLayout>
     );
}
 
export default Home;