const OrderModel = require("../models/Order");
const ReviewModel = require("../models/Review");
const { validationResult } = require("express-validator");
const ProductModel = require("../models/Product");

class Orders {
  async getOrders(req, res) {
    const query = req.query;
    const perPage = 5;
    const skip = (query.page - 1) * perPage;
    const option = query.userId ? { userId: query.userId } : {};
    console.log(option);
    try {
      const count = await OrderModel.find(option).countDocuments();
      const response = await OrderModel.find(option)
        .populate(
          "productId",
          "-colors -sizes, -createdAt -updatedAt -stock -image2 -image3"
        )
        .populate("userId", "-password -createdAt -updatedAt -admin")
        .skip(skip)
        .limit(perPage)
        .sort({ createdAt: -1 });
      return res.status(200).json({ orders: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }
  async orderDetails(req, res) {
    const { id } = req.params;
    try {
      const details = await OrderModel.findOne({ _id: id })
        .populate(
          "productId",
          "-colors -sizes -createdAt -updatedAt -stock -image2 -image3"
        )
        .populate("userId", "-password -updatedAt -createdAt -admin");
      return res.status(200).json({ details });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ errors: error });
    }
  }
  async updateOrder(req, res) {
    const { id, status } = req.query;
    let option = "";
    if (status === "delivered") {
      option = { status: true };
    } else if (status === "received") {
      option = { received: true };
    }
    try {
      const updatedProduct = await OrderModel.findByIdAndUpdate(id, option, {
        new: true,
      });
      return res.status(200).json({
        msg:
          status === "delivered"
            ? "Order has delivered"
            : status === "received" && "Order received",
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ errors: error });
    }
  }
  async createRating(req, res) {
    const errors = validationResult(req);
    const { rating, message, user, product, id } = req.body;
    console.log(req.body);
    if (errors.isEmpty()) {
      try {
        const createdReview = await ReviewModel.create({
          rating: parseInt(rating),
          comment: message,
          product,
          user,
        });
        console.log("review created: ", createdReview);
        await OrderModel.findByIdAndUpdate(id, { review: true });
        await ProductModel.findOneAndUpdate(
          { _id: product },
          { $push: { reviews: createdReview._id } }
        );
        return res.status(201).json({ msg: "review has created successfully" });
      } catch (error) {
        return res.status(500).json({ errors: error.message });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
}
module.exports = new Orders();
