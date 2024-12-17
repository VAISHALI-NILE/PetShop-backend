import express from "express";
import Order from "../models/order.js";
const router = express.Router();

// Create a new order
router.post("/create", async (req, res) => {
  try {
    const { userId, products, totalAmount, address, paymentMethod } = req.body;
    console.log("Request Body:", req.body);
    if (!userId || !products || !totalAmount || !address || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      address,
      paymentMethod,
      status: "Pending", // Default status
      createdAt: new Date(),
    });

    const savedOrder = await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.stack });
  }
});

// Get order by ID
router.get("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId); // Fetch the order by ID
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch all orders that belong to the specific userId
    const orders = await Order.find({ userId: userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Update order status
router.put("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export default router;
