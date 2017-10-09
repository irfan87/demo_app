// bring the mongoose here
let mongoose = require('mongoose');

let itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    price: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    }
});

let Item = module.exports = mongoose.model('Item', itemSchema);