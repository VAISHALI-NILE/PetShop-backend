import express from "express";
import Product from "../models/products.js";
const router = express.Router();

// const products = [
//   {
//     id: 1,
//     name: "Dog Collar",
//     price: 1200,
//     description:
//       "Durable and adjustable dog collar with reflective straps for safety.",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQoLYqlxBGkL9FFYynKYWKr0sEVDnnKj3tuQ5GVTpmQQjq8pedDq0ttrdjfSXvkGRu4ZTbLN9x6OJdeWpZo-wH1FeAbeSREEj5B5vqZmfQ5aMptAvi-S7MStA&usqp=CAE",
//     stock: 40,
//     category: "Accessories",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 2,
//     name: "Cat Scratching Post",
//     price: 2500,
//     description:
//       "Sturdy scratching post for cats, made with high-quality sisal rope.",
//     image:
//       "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTv58BdKq7JNxHNnr31zs0e-jjR7zGJauvLV0KYaxGZKJaLlZt6hm79CTc4e9qIgrD9ANuGfQaNtXbFSmHUJXapF9mciKTKxnuJ6rRMALfZzPgCWXqdjBeJ&usqp=CAE",
//     stock: 40,
//     category: "Toys",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 3,
//     name: "Pet Bed",
//     price: 4000,
//     description: "Comfortable and washable pet bed for dogs and cats.",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQUl-DUeg0QwUERsXDvdgosLgh2w-TsUot0BiM2zdujE3R-Qebzl26UorY9UmynvtbUBRNrrnQZT8vyjV9lfH1xMh6nnrd_B-HmzCLdkaXlft9V_0wpDN4hhMM&usqp=CAE",
//     stock: 40,
//     category: "Miscellaneous",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 4,
//     name: "Dog Chew Toys",
//     price: 1000,
//     description:
//       "Durable chew toys for dogs, perfect for dental health and entertainment.",
//     image:
//       "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQiRu8UM9c5LywU4wOUpgYwFGWJIIHGzLSiX5l6DXVKw6G_EyVegGD3Brq0HXwtAR64JsdP7vIxoNhgQBvltYrARTsi94NxYPRwOSo1ZSg6DTQyD3p6CSY9vQ&usqp=CAE",
//     stock: 40,
//     category: "Toys",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 5,
//     name: "Cat Food Bowl",
//     price: 400,
//     description: "Non-slip stainless steel food bowl for cats, easy to clean.",
//     image:
//       "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSB1v4oI_RPQixL9otKZIlSBrKB7XtSkKxvnf5XlZRDPOh_NrPwhzSYhbeyikvtG9EE6oLFsYvoaZreQOhGtRtYtF2-J9nA7Z5vrvDAYV8OT9-m0wltOFyt&usqp=CAE",
//     stock: 40,
//     category: "Accessories",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 6,
//     name: "Dog Leash",
//     price: 800,
//     description:
//       "Durable and comfortable leash for dogs with strong grip handle.",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRw_ETzkY4KteCAA0dyThNUXjuZLwuXBChCXpCtTMbuuPID3Bmfb2ThBDKGLi1QZNGR_NeY1TwnrTwosNV-qvBqC4CJqpDYKQFPocLb2lFsD12BBwtOxG_xXw&usqp=CAE",
//     stock: 40,
//     category: "Accessories",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 7,
//     name: "Cat Litter Box",
//     price: 350,
//     description:
//       "Hygienic and odor-free litter box for cats with a covered design.",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTNetlOvlqw5fkTBHn2dmvDR6HyIcZu81WAOJ2YekLNLZeWfPVT3xypkR7KrtpFRbniVZXu3RCb11HYA28xi1M6_AqL_rwIZ5wzed8NeSTY&usqp=CAE",
//     stock: 40,
//     category: "Accessories",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 8,
//     name: "Pet Grooming Kit",
//     price: 200,
//     description:
//       "All-in-one grooming kit for dogs and cats, including brushes and nail clippers.",
//     image:
//       "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQvpBz_zoatxhUsFZcJHsiMf3IE6KAhxSPUgNLUWZ9XpU5Xr-lMqGTvUFXZTZ8cTdY95deTDXXYpmqK1MUa5ZeVvxav0O4zLd4Zvns9urU5zDfYlTYz7cSQ7g&usqp=CAE",
//     stock: 40,
//     category: "Miscellaneous",
//     sizes: null,
//     discount: 10,
//   },
//   {
//     id: 9,
//     name: "Fish Tank Cleaner",
//     price: 1000,
//     description:
//       "Efficient and easy-to-use cleaner for fish tanks and aquariums.",
//     image:
//       "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSFenxZX_Haw_UngaYZTz6mkwBPFHZIZ9nUS_IF8HIlaWH0uHLAxMPpuyaWQ7-V_unehh6tKGxdXWzjEZAgyIYC0Be2x6atVF-hiZFr9js8ZuNJk4S5GVHESw&usqp=CAE",
//     stock: 40,
//     category: "Accessories",
//     sizes: null,
//     discount: 10,
//   },
//   {
//     id: 10,
//     name: "Rabbit Hutch",
//     price: 1200,
//     description: "Spacious wooden hutch for rabbits, suitable for outdoor use.",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS3ZHvP-ZAxybwHKbsXr9eMLs36Ogdhn9BDe4YAVNiK_9_Bdyck7g8caCl1Wek54zBAPTI5Sv8b4mzutqCRtnTmbT8asm1_cyFP67KtIbc&usqp=CAE",
//     stock: 40,
//     category: "Miscellaneous",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 11,
//     name: "Bird Cage",
//     price: 4500,
//     description:
//       "Portable bird cage with perches and feeding bowls, ideal for small birds.",
//     image:
//       "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSVmzBHvp63cwA2yPg9kTri_3Sn24GEL0Y4uAUlmAzavDfDbHDfO0OgrKoYkS4aWepWhOGo2OTSTxV0BDOXu-Ox3PFrMGuSLv_RmmGLUYXTfNwUoFc9JbpSgkmU&usqp=CAE",
//     stock: 40,
//     category: "Miscellaneous",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 12,
//     name: "Hamster Wheel",
//     price: 120,
//     description: "Silent and durable exercise wheel for hamsters.",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTzFQwQeyilqQuTBLOrIriIDkMFbinIzZDmJs762Km5UeLLxzeeWD_UJ2aE4Ax6alKbIZKlnihQRAlGNi1-iljw4D_2fvvh2W2iK-UlwYn9I3nP_IvsshiwBQ&usqp=CAE",
//     stock: 40,
//     category: "Toys",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 13,
//     name: "Dog Sweater",
//     price: 800,
//     description:
//       "Warm and stylish sweater for dogs, available in various sizes.",
//     image:
//       "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTkDs9M7zrrq_NKD_fND2eVLNZjKStnm3X90uPWeWaFl53eB2cdnP0hro56leTO6A7jARlgAP42ResvpxgC1--hjJxGHQLSxliKfYsRkr6iFedkxZZV4a1c&usqp=CAE",
//     stock: 40,
//     category: "Clothing",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 14,
//     name: "Cat Tunnel Toy",
//     price: 1500,
//     description: "Interactive and collapsible tunnel toy for cats to play in.",
//     image:
//       "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQv8Yg-0QecTMEdLLRi5r7VT3-cbJbmA44S1XRLTIUtx0iesnVG81sh1XKdrTg2kE5Ea6we0I-X2VqEJRjssDBM0dRnHUKXFeRZspU1AsDpPXfm-MEdh1l2EA&usqp=CAE",
//     stock: 40,
//     category: "Toys",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 15,
//     name: "Dog Training Pads",
//     price: 300,
//     description: "Leakproof training pads for puppies and senior dogs.",
//     image:
//       "https://qpets.in/cdn/shop/files/71U-DCesUyS_21e14c3d-a841-4d6d-8aef-90806464e8af.jpg?v=1732699999&width=1200",
//     stock: 40,
//     category: "Accessories",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 16,
//     name: "Pet Carrier Backpack",
//     price: 500,
//     description: "Comfortable and ventilated backpack for carrying small pets.",
//     image:
//       "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT4PMWDOD-ekhiobQZEGFIrJ6I_42FVQ4P8U9j2Oo1Q0HQg5Q6gSdtvcQnZN-AjQrzZsAC8ccI80NsGpktk8yDHohu22kUaB3bav7sG4U52&usqp=CAE",
//     stock: 40,
//     category: "Accessories",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 17,
//     name: "Aquarium Decor",
//     price: 200,
//     description:
//       "Realistic decor for aquariums to create a natural habitat for fish.",
//     image:
//       "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQaVZHOiGEy8pZ7xF4A-iFcWJhkeCN9PBi139QTuwYhn7NzyYOgUDYtLz1lSNLhm7rnArf41eZSqRGXrOUBzxRmwARQiN4mNSV89bXnbc3JZyOdIRhuNlFM&usqp=CAE",
//     stock: 40,
//     category: "Accessories",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
//   {
//     id: 18,
//     name: "Dog Treat Dispenser",
//     price: 250,
//     description: "Interactive toy for dogs that dispenses treats during play.",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTdcKFddENcZUsRmcW5K43cGdR8LpBLiiiyYnWdTGwwoJiDeVb9VUdXNYHXhZJNgeQLjm7obzbmk1csFLF3D_6bkSE8vpNr4l3jJRgHszOcyYQxXVHzx8QjDg&usqp=CAE",
//     stock: 40,
//     category: "Accessories",
//     sizes: null,
//     discount: 10,
//   },
//   {
//     id: 19,
//     name: "Catnip Toy",
//     price: 800,
//     description:
//       "Durable stuffed toy for cats infused with high-quality catnip.",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlMygGJdOt1fAbr6kzEXYediMgKIvR5RB19g&s",
//     stock: 40,
//     category: "Toys",
//     sizes: null,
//     discount: 10,
//   },
//   {
//     id: 20,
//     name: "Pet Water Fountain",
//     price: 350,
//     description: "Automatic water fountain for pets with a built-in filter.",
//     image:
//       "https://cdn.thewirecutter.com/wp-content/media/2024/04/pet-water-fountain-2048px-9282.jpg?auto=webp&quality=75&width=1024",
//     stock: 100,
//     category: "Accessories",
//     sizes: ["s", "l", "m"],
//     discount: 10,
//   },
// ];

// Product.insertMany(products);

router.get("/get", (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});
router.get("/:productId", (req, res) => {
  Product.findById(req.params.productId)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

export default router;
