let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors');
let passport = require('passport');
let mongoose = require('mongoose');
let paginate = require('express-paginate');

let config = require('./config/database');

mongoose.connect(config.database, {useMongoClient: true});

mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('connection error ' + err);
});

let app = express();

let items = require('./routes/items');

let port = process.env.PORT || 3000;

// enable cors
app.use(cors());

// pagination
app.use(paginate.middleware(10, 50));

// set static folder file
app.use(express.static(path.join(__dirname, 'public')));

// bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/items', items);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, (req, res) => {
    console.log('Server is running on port ' + port);
});