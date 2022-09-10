import React from 'react'
import DefaultLayout from "../components/DefaultLayout";
import { Col, Row, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { addCar } from '../redux/actions/carsActions';
import Spinner from '../components/Spinner';

function AddCar(){

    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.alertsReducer)

    function onFinish(values){      //Here we ll get the values and send it to action.
        //Along with values, we ll send booked time slots too which will initially be an empty array

        values.bookedTimeSlots=[]

        dispatch(addCar(values))        //Sending values to actions
        console.log(values)
    }

    return(
        <DefaultLayout>
                {loading && (<Spinner/>)}
                
                {/* Now creating a formm for adding a car */}
                <Row justify='center mt-5'>
                    <Col lg={12} sm={24} xs={24} className='p-2'>
                        <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                            <h3>Add New Car</h3>
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

                            <button className='btn1'>Add Car</button>

                        </Form>
                        {/* In above form, 'name' should be same as one used in database */}
                    </Col>
                </Row>
        </DefaultLayout>
    )
}

export default AddCar