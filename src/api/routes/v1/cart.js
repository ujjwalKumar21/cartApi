const express = require('express');
const controller = require('../../controllers/cart/cart');


const router = express.Router();

router.get("/userCart/:userId", controller.getCart);
router.get("/userCart/:userId/:prodId", controller.getCart);
router.post("/createCart", controller.createCart);
router.put("/updateCart",controller.updateCartById);
router.delete("/delProdFromCart",controller.deleteProdFromCart);
router.delete("/deleteCart",controller.deleteCart);


module.exports = router;