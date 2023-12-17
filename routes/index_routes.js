const express = require('express');
const cors = require('cors');
const app = express();

//middlewares
app.set('trust proxy', 1);
app.use(cors());
app.use(express.json()); //parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({extended: true})); //parse URL-encoded bodies (as sent by HTML forms)


//testing APIs here
app.get('/', (req, res)=>{res.status(200).send({message: `API server is listening`})});
//main APIs here
app.use('/user', require('./routes/user'));

module.exports = app;