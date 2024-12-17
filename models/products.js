import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: "placeholder.jpg" }, // Default placeholder image
    stock: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ["Clothing", "Electronics", "Toys", "Accessories", "Miscellaneous"],
      default: "Miscellaneous",
    },
    sizes: { type: [String], default: [] }, // Array of available sizes
    discount: { type: Number, default: 0, min: 0, max: 100 }, // % Discount (0-100)
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
