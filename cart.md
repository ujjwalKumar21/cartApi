Documentation for wishlist API Git Link: https://github.com/srvpl/api-node-2/tree/cartApi

Install Packages yarn

or

npm i

Launch Server yarn dev

Schema Model

cart Schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userCartSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    prodId: {
      type: String,
      required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date, default: new Date()
    },
    updatedAt: {
        type: Date, default: new Date()
    }
});

const userCart = mongoose.model('userCart', userCartSchema)

module.exports = userCart;

API Reference 

Get all product of user inside cart using only userId (it return all the products present in the user cart)

http://localhost:3000/v1/cart/userCart/:userId

Parameter	Type	Description
  userId	string	 Required

Get specific Product form user's cart (It return only that product If that product is present in the user cart)

GET  http://localhost:3000/v1/wishlist/userWishlist/:userId/:prodId

Parameter	Type	Description
  userId	string	 Required
  prodId    string   Required

Add cart using userId prodId

POST  http://localhost:3000/v1/cart/createCart

Parameter	    Type	   Description
  userId	    string	    Required
  prodId        string      Required
  quantity      number      optional

Request Body for createCart:

{
    "userId": "u125",
    "prodId": "p138",
    "quantity": 1
}

update cart using object id

PUT  http://localhost:3000/v1/cart/updateCart

Parameter	    Type	   Description
  _id	        string	    Required
  quantity      number      optional

Request Body for updateCart:

{
    "_id": "645a1a82e30512ed8c666170",
    "quantity": 1
}

delete cart product using _id means ObjectId (This is to delete only that product)

DELETE http://localhost:3000/v1/cart/delProdFromCart

Parameter	    Type	    Description
_id	            string	    Required

Request Body for delProdFromCart:

{
    "_id": "6459de254f02f711bc8ce295"
}


delete cart using userId (This is to delete all the product of that user)

DELETE http://localhost:3000/v1/cart/deleteCart

Parameter	    Type	    Description
userId	        string	    Required

Request Body for deleteCart:

{
    "userId": "u142"
}