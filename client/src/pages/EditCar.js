import React, { useState, useEffect } from 'react'
import DefaultLayout from "../components/DefaultLayout";
import { Col, Row, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { addCar, editCar } from '../redux/actions/carsActions';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
import { getAllCars } from '../redux/actions/carsActions'; 

function EditCar(){

    const {cars} = useSelector(state=>state.carsReducer)
    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.alertsReducer)
    const[car, setcar] = useState()
    let {carid} = useParams();      //We need to find the particular carid which the admin selected for editing by grabbing params from route
    const [totalCars, setTotalCars] = useState([])      

    useEffect(() => {       //Whenever the page is rendered, we need to call the action of getting all cars automatically
        if(cars.length==0)
        {
            dispatch(getAllCars())      //Dispatching the action
        }
        
        else       //Now whenever the cars array is not empty, we are going to update car state
        {
            setTotalCars(cars)
            setcar(cars.find(o=>o._id==carid))     //Finding particular car by iterating through all cars. 'o' is the iterator object
        }
    }, [cars])


    function onFinish(values){      //Here we ll get the values and send it to action.
        //Along with values, we ll send booked time slots too which will initially be an empty array

       // values.bookedTimeSlots=[]
       values._id = car._id     //Sending values below along with car id so that it can be manipulated

        dispatch(editCar(values))        //Sending values to actions
        console.log(values)
    }

    return(
        <DefaultLayout>
                {loading && (<Spinner/>)}
                
                {/* Now creating a formm for adding a car */}
                <Row justify='center mt-5'>
                    <Col lg={12} sm={24} xs={24} className='p-2'>
                        {totalCars.length>0 && (<Form initialValues={car} className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                            {/* If setTotalCars is greater than 0 then only form will render */}
                            {/* Initial values will the values of the current car already writtern in form */}
                            <h3>Edit Car</h3>
                            <hr/>
                            <Form.Item name='name' label='Car name' rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name='image' label='Image url' rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name='rentPerHour' label='Rent Per Hour' rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name='capacity' label='Capacity' rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name='fuelType' label='Fuel Type' rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>

                            <button className='btn1'>Edit Car</button>

                        </Form>)}
                        {/* In above form, 'name' should be same as one used in database */}
                    </Col>
                </Row>
        </DefaultLayout>
    )
}

export default EditCar