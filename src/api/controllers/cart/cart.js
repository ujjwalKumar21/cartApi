const userCart = require("../../models/cart");
const {createSchema, updateSchema} = require("../../../config/cartJoi");

module.exports = {
  getCart: async (req, res) => {
    let userId = req.params.userId;
    let prodId = req.params.prodId;
    console.log("USer id is ", userId, "Prod id is", prodId);

    if (!userId) return res.send({ msg: "Please enter your user id" });
    try {
      if (userId && prodId) {
        const prod = await userCart.find({ userId: userId, prodId: prodId });
        if (!prod || prod.length == 0)
          return res.send({
            msg: "No product is found in your cart Or your cart is not created",
          });
        console.log(prod);
        res.send(prod);
      } else if (userId) {
        const prod = await userCart.find({ userId: userId });
        if (!prod) return res.send({ msg: "No cart is found" });
        console.log(prod);
        res.send(prod);
      }
    } catch (err) {
      res.send(err);
    }
  },
  createCart: async (req, res) => {
    let isValid = createSchema.validate(req.body);
    if (isValid.error) return res.send(isValid.error);
    console.log("Inside create cart ", isValid);
    let userId = req.body.userId;
    let prodId = req.body.prodId;
    let quantity = req.body.quantity;
    if (!quantity) quantity = 1;
    try {
      const prod = await userCart.findOne({ userId: userId, prodId: prodId });
      if (prod) return res.send({ msg: "This product is already in you cart" });
      const userCartData = new userCart({
        userId: userId,
        prodId: prodId,
        quantity: quantity,
      });
      userCartData
        .save()
        .then((result) => {
          if (result) {
            res.send({ msg: "Your product is add to your cart" });
          }
        })
        .catch((err) => {
          res.send(err);
        });
    } catch (err) {
      res.send(err);
    }
  },
  updateCartById: async (req, res) => {
    let id = req.body._id;
    let quantity = req.body.quantity; //I need quantity value with sign
    let isValid = updateSchema.validate(req.body);
    if (isValid.error) return res.send(isValid.error);
    try {
      const prod = await userCart.findOne({ _id: id });
      if (!prod)
        return res.send({
          msg: "No product is found in your cart Or your cart is not created",
        });
      else {
        console.log("dbqty", prod);
        if (prod.quantity == 1 && quantity < 0)
          return res.send({ msg: "You are not allowed" });
        let prodQty = prod.quantity + quantity;
        let result = await userCart.updateOne(
          { _id: id },
          { quantity: prodQty }
        );
        res.send({ msg: "Your cart is updated" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  deleteProdFromCart: async (req, res) => {
    let id = req.body._id;
    if (!id)
      return res.send({ msg: "Please enter object id " });
    try {
      let result = await userCart.deleteOne({ _id: id });
      if (result.deletedCount == 0)
        return res.send({ msg: "This product is not in your cart" });
      else return res.send({ msg: "Your product is deleted from your cart" });
    } catch (err) {
      res.send(err);
    }
  },
  deleteCart: async (req, res) => {
    let userId = req.body.userId;
    if (!userId) return res.send("Please enter your user Id");
    try {
      let result = await userCart.deleteMany({ userId: userId });
      if (result.deletedCount == 0)
        return res.send({ msg: "You don't have cart" });
      res.send({ msg: "Your cart is deleted successfully" });
    } catch (err) {
      res.send(err);
    }
  },
};
