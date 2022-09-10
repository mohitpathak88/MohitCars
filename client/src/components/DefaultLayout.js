import React from 'react'
import { Button, Dropdown, Menu, Space, Row, Col} from 'antd';
import {Link} from 'react-router-dom';



function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('user'))       //Getting the user
    const menu = (      //For creating the dropdown menu which is opened after clicking the username in home.js. It is created using the 
    //dropdown template of antd
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a href="/">
                            Home
                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a href="/userbookings">
                            Bookings
                        </a>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <a href="/admin">
                            Admin
                        </a>
                    ),
                },
                {
                    key: '4',
                    label: (
                        <a onClick={()=>{
                            localStorage.removeItem('user');        //Logging out functionality
                            window.location.href='/login';          //navigating the page to login page
                        }}>
                            Logout
                        </a>
                    ),
                },
            ]}
        />
    );
    return (
        <div>
            <div className="header bs1">        {/* Box shadow css used for header as 'bs1 */}
                <Row gutter={16} justify='center'>         {/* Now creating a grid system to properly place the title and username button */}
                    <Col lg={20} sm={24} xs={24}>
                        <div className="d-flex justify-content-between">
                            <h1><b><Link to='/' style={{color:'orangered'}}> MohitCars</Link></b></h1>
                            <Dropdown overlay={menu} placement="bottom">
                                <Button> {user.username}</Button>
                            </Dropdown>
                            {/*For showing the loggedin username (getting it by the function defined above) : */}
                        </div>
                    </Col>
                </Row>
                
            </div>

            <div className="content">
                {props.children}
            </div>
            <div className="footer text-center">
                <hr/>
                <p>
                    Designed And Developed By
                </p>
                <p>Mohit</p>
            </div>
        </div>
    );
}

export default DefaultLayout;

//This default layout will be used for all our pages to render the content for (header and navbar too)
//In thwe content are we will recieve content for different pages to render through 'props'