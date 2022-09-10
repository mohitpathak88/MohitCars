//Creating Login form using antd
import React from 'react'
import {Row, Col, Form, Input } from 'antd';
import {Link} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { userLogin } from '../redux/actions/userActions';
import AOS from 'aos';      //'animate on scroll' is a module used to animate things into moving state like car img on login page 
//(Look at where car img src is given )
import 'aos/dist/aos.css';
import Spinner from '../components/Spinner';

AOS.init();

function Login() {

    const dispatch = useDispatch() 
    const {loading} = useSelector(state=>state.alertsReducer)     
    function onFinish(values) {
        dispatch(userLogin(values))
        console.log(values)

    }

    return ( 
        <div className='login'>
            {loading && (<Spinner/>)}   {/* If loading is true, show spinner */}
            {/*Creating a grid */}
            <Row gutter={16} className='d-flex align-items-center' >
                {/*Row is split into 2 parts. First is used by the car image and second would be the form part*/}
                <Col lg={16} style={{position: 'relative'}}>
                    <img 
                    data-aos='slide-right'      //using aos to animate car
                    data-aos-duration='1500'        //Adjusting slide speed
                    src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80" />
                    <h1 className='login-logo'>MohitCars</h1>
                </Col>     
                <Col lg={8} className='text-left p-5'>
                    {/* Creating Login form with input fields */}
                    <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
                        <h1>Login</h1>
                        <hr/>
                        <Form.Item name='username' label='Username' rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='password' label='Password' rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>

                        <button className='btn1 mt-2 mb-3'>Login</button>
                        <br/>
                        <Link to='/register'>Click Here to Register</Link>

                    </Form>
                </Col>
            </Row>
        </div>
     );
}
 
export default Login;