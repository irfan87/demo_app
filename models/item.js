// bring the mongoose here
let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

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

itemSchema.plugin(mongoosePaginate)

let Item = module.exports = mongoose.model('Item', itemSchema);