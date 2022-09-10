//For showing all the bookings done by a logged in user

import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions"
import { Col, Row } from 'antd'
import Spinner from '../components/Spinner';
import moment from "moment";

function UserBookings() {

    const dispatch = useDispatch()
    const { bookings } = useSelector(state => state.bookingsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const user = JSON.parse(localStorage.getItem("user"));      //to get the logged in user

    useEffect(() => {
        dispatch(getAllBookings())          //calling for bookings actions
    }, [])
    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <h3 className="text-center mt-2"> My Bookings</h3>

            <Row justify='center' gutter={16}>

                <Col lg={16} sm={24}>
                    {bookings.filter(o=>o.user===user._id).map(booking => {
                //using filter function to filter booked cars done by other users. 'o' is the iterating obj. user.id is to match the logged in one
                        return <Row gutter={16} className="bs1 mt-3 text-left">          {/*  In this row, we ll loop through cars and again render columns */}
                            <Col lg={6} sm={24}>      {/* This part will be given 6 out of 24 columns for showing name, hours,rent and fare*/}
                                <p><b>{booking.car.name}</b></p>
                                <p> Total Hours: <b>{booking.totalHours}</b></p>
                                <p> Rent Per Hour: <b>{booking.car.rentPerHour}</b></p>
                                <p> Total Amount: <b>{booking.totalAmount}</b></p>
                            </Col>

                            <Col lg={12} sm={24}>    {/* This part will be given 12 out of 24 columns for showing from, to,id and date*/}
                                <p> Transaction ID: <b>{booking.transactionId}</b></p>
                                <p> From: <b>{booking.bookedTimeSlots.from }</b></p>
                                <p> To: <b>{booking.bookedTimeSlots.to}</b></p>
                                <p> Date of booking: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>   
                                {/* Using moment library above and then formatting it into our own date format */}
                            </Col>

                            <Col lg={6} sm={24} className='text-right'>
                                <img style={{borderRadius:5}} src={booking.car.image} height="140" className="p-2"/>
                                {/* Image width will be takes as 6/24*/}
                            </Col>
                        </Row>
                    })}
                </Col>
            </Row>
        </DefaultLayout>
    )
}

export default UserBookings