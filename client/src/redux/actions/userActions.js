import axios from "axios";
import { message } from "antd";


export const userLogin=(reqObj)=>async dispatch=>{      //we will get user data through reqObj
    dispatch({type: 'LOADING', payload:true})       //Whenever this userLogin function is called from pages first we will dispatch 'loading'

    try{
        const response = await axios.post('/api/users/login', reqObj)        //Adding base url here after adding 'proxy' in package.json
        localStorage.setItem('user', JSON.stringify(response.data))     //Storing data in the local storage by name of 'user'  
        message.success('Login Success')
        dispatch({type: 'LOADING', payload:false})      //After assigning the api data to the action type, we will hide 'loading'
        setTimeout(() => {
            window.location.href='/'       //If registration is successful, the message will be displayed and after .5 secs, user is navigated
            // to home page
        }, 500);

    } catch(error) {
        console.log(error)
        message.error('Something went wrong')
        dispatch({type: 'LOADING', payload:false})      //If error occurs, hid 'loading'
    }
}

export const userRegister=(reqObj)=>async dispatch=>{
    dispatch({type: 'LOADING', payload:true})       //Whenever this userRegister function is called from pages first we will dispatch 'loading'

    try{
        const response = await axios.post('/api/users/register', reqObj)        //Adding base url here after adding 'proxy' in package.json
        message.success('Registration Successful')
        setTimeout(() => {
            window.location.href='/login'       //If registration is successful, the message will be displayed and after .5 secs, user is navigated
            // to login page
        }, 500);
        dispatch({type: 'LOADING', payload:false})      //After assigning the api data to the action type, we will hide 'loading'

    } catch(error) {
        console.log(error)
        message.error('Something went wrong')
        dispatch({type: 'LOADING', payload:false})      //If error occurs, hid 'loading'
    }
}