//For database Connection:

const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect('mongodb+srv://MohitPathak:hello123@bettertogether.cds6m.mongodb.net/MohitCars', {useUnifiedTopology: true , useNewUrlParser: true});

    const connection = mongoose.connection;
    connection.on('connected', () => {
        console.log('MongoDB connection Successful');
    })
    connection.on('error', () => {
        console.log('MongoDB connection error');
    })
}

connectDB();

module.export = mongoose;