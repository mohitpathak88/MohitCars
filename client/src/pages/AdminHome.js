import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux'     //Accessing the reducer data into components
import { deleteCar, getAllCars } from '../redux/actions/carsActions';
import { Button, Row, Col, Divider, DatePicker, Checkbox } from 'antd';        //Importing row and col for implementing grid system
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';        //This library is used to select our own date format
import { Popconfirm, message } from 'antd';      //For using the popup message shown during during deleting
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';       //Importing delete and edit icons from package 'ant-design/icons' installed locally


const { RangePicker } = DatePicker;       //Used to pick dates on booking page    


function AdminHome() {
    const { cars } = useSelector(state => state.carsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const dispatch = useDispatch()
    const [totalCars, setTotalCars] = useState([])

    useEffect(() => {       //Whenever the page is rendered, we need to call the action of getting all cars automatically
        dispatch(getAllCars())      //Dispatching the action
    }, [])

    useEffect(() => {        //whenever the cars value changes, total cars available changes
        setTotalCars(cars)
    }, [cars])

    return (
        <DefaultLayout>

            <Row justify="center" gutter={16} className='mt-2'>
                <Col lg={20} sm={24}>
                <div className='d-flex justify-content-between align-items-center'>
                    <h3 className='mt-1 mr-2'>Admin Panel</h3>
                    <button className='btn1'><a href="/addcar">Add Car </a></button>
                </div>
                </Col>
            </Row>
            {loading == true && (<Spinner />)}        {/* If loading == true, call spinner component*/}
            <Row justify="center" gutter={16}>    {/* 1*/}
                {totalCars.map(car => {        //Looping through cars array. for every iteration we are going to get car object
                    return <Col lg={5} sm={24} xs={24}>     {/* 1*/}
                        <div className='car p-2 bs1'>
                            <img src={car.image} className="carimg" />
                            <div className="car-content d-flex align-items-center justify-content-between">
                                <div className='text-left pl-2'>
                                    <p>{car.name}</p>
                                    <p>Rent Per Hour {car.rentPerHour}/-</p>
                                </div>
                                <div className='mr-4'>
                                    <Link to={`/editcar/${car._id}`}><EditOutlined style={{ color: 'green', cursor: 'pointer' }} className='mr-3' /></Link>

                                    <Popconfirm
                                        title="Are you sure to delete this Car?"
                                        onConfirm={()=>{dispatch(deleteCar({carid : car._id}))}}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>
                    </Col>
                })}
            </Row>

        </DefaultLayout>
    );
}

export default AdminHome;