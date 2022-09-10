//Actions for booking a car, when the user clicks book now 

import axios from 'axios';
import { message } from 'antd';


export const bookCar=(reqObj) => async dispatch=>{     //Passing async dispatch function as the parameter

    dispatch({type: 'LOADING', payload:true})       //Whenever this getAllCars function is called from pages first we will dispatch 'loading'

    try{
        const response = await axios.post('/api/bookings/bookcar', reqObj)  //sending reqobj to backend
        dispatch({type: 'LOADING', payload:false})      //After assigning the api data to the action type, we will hide 'loading'
        message.success('Your Car booked successfully') 
        setTimeout(() => {
            window.location.href='/userbookings'   
        }, 500);
        // As successful message will be displayed, after .5 sec user will be navigated to userbookings page

    } catch(error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})      //If error occurs, hid 'loading'
        message.error('Something went wrong, Please Try later');
    }
};

export const getAllBookings=() => async dispatch=>{     //Passing async dispatch function as the parameter

    dispatch({type: 'LOADING', payload:true})       //Whenever this getAllCars function is called from pages first we will dispatch 'loading'

    try{
        const response = await axios.get('/api/bookings/getallbookings')        //Adding base url here after adding 'proxy' in package.json
        dispatch({type: 'GET_ALL_BOOKINGS', payload:response.data})     //passing data to booking reducer....payload will be the api data
        dispatch({type: 'LOADING', payload:false})      //After assigning the api data to the action type, we will hide 'loading'

    } catch(error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})      //If error occurs, hid 'loading'
    }


}