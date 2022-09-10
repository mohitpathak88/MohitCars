//This component helps in rendering pages to only those who are loggedin
import React from "react";
import {Navigate, Outlet} from 'react-router-dom';

const ProtectedRoutes = () => {
    const user = (localStorage.getItem('user'))         //Getting if the user is logged in or not
    return user ? <Outlet/> : <Navigate to='/login' />      //If user is logged, outlet is called else the page is navigated to login page. Outlet
//basically functions such that all the routes in App.js nested inside the function name 'ProtectedRoutes', will have the functionalities defined here
};

export default ProtectedRoutes;