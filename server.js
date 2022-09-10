const express = require('express');
const dbConnection = require('./db');
const cors = require("cors");

const app = express();
const port = process.env.port || 5000;
app.use(cors("*")) ;        //It allows us to relax the security applied to an API. Hence, we can use the api created from our backend to 
//frontend without any problem
app.use(express.json())


app.use('/api/cars/', require('./routes/carsRoute'));
app.use('/api/users/', require('./routes/usersRoute'));
app.use('/api/bookings/', require('./routes/bookingsRoute'));


const path = require('path')

//Now we need to check if our path is in the development or production 
if(process.env.NODE_ENV==='production')
{
    //First we have to tell the server where is our client folder
    app.use('/' , express.static('client/build'))       //For all requests for client. Build folder will be created in client after we deploy


    //Now we specify the entry point. So for all request for client (which is denoted by "*") you need to search in the below entry point
    app.get('*' , (req , res)=>{

        //Entry point of the client folder:
          res.sendFile(path.resolve(__dirname, 'client/build/index.html'));

    })

}

app.get('/', (req,res) => res.send('Hello Worldx'));
app.listen(port, () => console.log(`Nodejs Server Started on ${port}`));