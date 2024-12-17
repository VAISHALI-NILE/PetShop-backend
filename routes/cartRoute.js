import express from "express";
import Cart from "../models/cart.js"; // Import the Cart schema
import Product from "../models/products.js"; // Assuming you have a Product model to calculate prices
import mongoose from "mongoose";

const router = express.Router();

// Get user's cart
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format." });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found for the user." });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Add product to cart
router.post("/add", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { userId, productId, quantity, size } = req.body;

    // Validate request
    if (!userId || !productId || !quantity || !size) {
      return res.status(400).json({
        message: "User ID, Product ID, Quantity, and Size are required.",
      });
    }

    // Parse quantity to an integer
    const parsedQuantity = parseInt(quantity, 10);

    // Fetch product details for price calculation
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        userId,
        products: [{ productId, quantity: parsedQuantity, size }],
        total_amount: product.price * parsedQuantity,
      });
    } else {
      // Check if product with the same size exists in the cart
      const existingProductIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId && item.size === size
      );

      if (existingProductIndex !== -1) {
        // Update quantity if the product with the same size is already in the cart
        cart.products[existingProductIndex].quantity += parsedQuantity;
      } else {
        // Add new product to the cart
        cart.products.push({ productId, quantity: parsedQuantity, size });
      }

      // Recalculate total amount
      cart.total_amount += product.price * parsedQuantity;
    }

    // Save the updated cart
    const updatedCart = await cart.save();

    res.status(201).json({
      message: "Product added to cart successfully.",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Error in /add route:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Update product quantity in cart
router.put("/update/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1." });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart." });
    }

    // Fetch product price for recalculation
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Update quantity and recalculate total amount
    const oldQuantity = cart.products[productIndex].quantity;
    cart.products[productIndex].quantity = quantity;
    cart.total_amount += product.price * (quantity - oldQuantity);

    const updatedCart = await cart.save();
    res
      .status(200)
      .json({ message: "Cart updated successfully.", cart: updatedCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Remove product from cart
router.delete("/remove/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart." });
    }

    // Fetch product price for recalculation
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Update total amount and remove product
    const removedProduct = cart.products.splice(productIndex, 1);
    cart.total_amount -= product.price * removedProduct[0].quantity;

    const updatedCart = await cart.save();
    res
      .status(200)
      .json({ message: "Product removed from cart.", cart: updatedCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export default router;
