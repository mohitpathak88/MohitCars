//This component helps in rendering pages to only those who are loggedin
import React from "react";
import {Navigate, Outlet} from 'react-router-dom';

const AdminRoute = () => {
    var user = JSON.parse(localStorage.getItem('user'));        //Getting if the user is logged in or not
    return user._id==='630e77d509f568ab3c59e096' ? <Outlet/> : <Navigate to='/noadminexcess' /> 

};

export default AdminRoute ;