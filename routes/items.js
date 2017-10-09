let express = require('express');
let paginate = require('express-paginate');
let mongoosePaginate = require('mongoose-paginate');

let routes = express.Router();

// bring the item model to this page
let Item = require('../models/item');

routes.use(paginate.middleware(10, 50));

// get all items as a list
routes.get('/', (req, res, next) => {
    Item.paginate({}, {page: req.query.page, limit: req.query.limit}, (err, items) => {
        if(err) {
            res.json({'error_msg': err});
        } else {
            res.format({
                json(){
                    res.json({
                        object: 'list',
                        has_more: paginate.hasNextPages(req)(items.pages),
                        data: items.docs
                    });
                }
            });
        }
    });


    // Item.find({}, (err, items) => {
    //     if(err) {
    //         res.json({'error_msg': err});
    //     } else {
    //         res.json({items: items});
    //     }
    // });
});

// post the new items 
routes.post('/', (req, res, next) => {
    let items = new Item;

    items.name = req.body.name;
    items.price = req.body.price;
    items.brand = req.body.brand;

    items.save((err) => {
        if(err) {
            res.json({'error_msg': err});
        } else {
            res.json({'success_msg': 'items have been saved!'});
        }
    })
});

// get single item
routes.get('/:id', (req, res) => {
    Item.findById(req.params.id, (err, item) => {
        if(err) {
            res.json({'error_msg': err});
        } else {
            res.json({item: item});
        }
    });
});

// load the single item for update process
routes.put('/:id', (req, res) => {
    Item.findById(req.params.id, (err, item) => {
        if(err) {
            res.json({'error_message': err});
        } else {
            res.json({item: item});
        }
    })
});

// update the current item
routes.patch('/:id', (req, res) => {
    let item = {};

    item.name = req.body.name;
    item.price = req.body.price;
    item.brand = req.body.brand;

    // set item query
    let item_id = {
        _id: req.params.id
    };

    Item.findByIdAndUpdate(item_id, item, (err) => {
        if(err) {
            res.json({'error_msg': err});
        } else {
            res.json({'success_msg': 'you have update your current item'});
        }
    });
});

// delete unwanted record
routes.delete('/:id', (req, res) => {
    let item_id = {
        _id: req.params.id
    };

    Item.findById(req.params.id, (err, item) => {
        Item.remove(item_id, (err) => {
            if(err) {
                res.json({'error_msg': err});
            } else {
                res.json({'success_msg': 'item have been removed'});
            }
        });
    })
});

module.exports = routes;