//To get all the cars data from backend. So all the actions related to a car will be in this file

import { message } from 'antd';
import axios from 'axios';

export const getAllCars=() => async dispatch=>{     //Passing async dispatch function as the parameter

    dispatch({type: 'LOADING', payload:true})       //Whenever this getAllCars function is called from pages first we will dispatch 'loading'

    try{
        const response = await axios.get('/api/cars/getallcars')        //Adding base url here after adding 'proxy' in package.json
        dispatch({type: 'GET_ALL_CARS', payload:response.data})     //payload will be the api data
        dispatch({type: 'LOADING', payload:false})      //After assigning the api data to the action type, we will hide 'loading'

    } catch(error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})      //If error occurs, hid 'loading'
    }
}

export const addCar=(reqObj)=>async dispatch=>{
    dispatch({type: 'LOADING', payload:true})       //Whenever this getAllCars function is called from pages first we will dispatch 'loading'

    try{
        await axios.post('/api/cars/addcar', reqObj)        //Sending req obj that we get from frontend
        dispatch({type: 'LOADING', payload:false})      //After assigning the api data to the action type, we will hide 'loading'
        message.success('New car added successfully')
        setTimeout(() => {
            window.location.href='/admin'
        }, 500)

    } catch(error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})      //If error occurs, hid 'loading'
    }
}


export const editCar=(reqObj)=>async dispatch=>{
    dispatch({type: 'LOADING', payload:true})       //Whenever this getAllCars function is called from pages first we will dispatch 'loading'

    try{
        await axios.post('/api/cars/editcar', reqObj)        //Sending req obj that we get from frontend
        dispatch({type: 'LOADING', payload:false})      //After assigning the api data to the action type, we will hide 'loading'
        message.success('Car updated successfully')
        setTimeout(() => {
            window.location.href='/admin'
        }, 500)

    } catch(error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})      //If error occurs, hid 'loading'
    }
}


export const deleteCar=(reqObj)=>async dispatch=>{
    dispatch({type: 'LOADING', payload:true})       //Whenever this getAllCars function is called from pages first we will dispatch 'loading'

    try{
        await axios.post('/api/cars/deletecar', reqObj)        //Sending req obj that we get from frontend which is car id
        dispatch({type: 'LOADING', payload:false})      //After assigning the api data to the action type, we will hide 'loading'
        message.success('Car deleted successfully')
        setTimeout(() => {
            window.location.reload()        //If delete is successful then refresh the page
        }, 500)

    } catch(error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})      //If error occurs, hid 'loading'
    }
}