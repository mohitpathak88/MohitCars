import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import 'antd/dist/antd.css';    //antd is like a bootstrap but for react. Instead of making designs for classes (in bootstrap), it makes design for a whole component
import ProtectedRoutes from './components/ProtectedRoutes';  //Using component 'ProtectedRoutes' so that only loggedin users can access certain routes
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import NoAdminExcess from './pages/NoAdminExcess';
import AdminRoute from './components/AdminRoute';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' exact element={<Login />} />
          <Route path='/register' exact element={<Register />} />
          <Route path='/noadminexcess' exact element={<NoAdminExcess />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/' exact element={<Home />} />
            <Route path='/booking/:carid' exact element={<BookingCar/>} />
            <Route path='/userbookings' exact element={<UserBookings/>}  />
            <Route path='/addcar' exact element={<AddCar/>}  />
            <Route path='/editcar/:carid' exact element={<EditCar/>}  />
          </Route>
          <Route element={<AdminRoute />}>
              <Route path='/admin' exact element={<AdminHome/>}  />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
//Sending car id of a particular car to booking page in the route. Whatever variable written after ':' same should be used in booking car component
export default App;
