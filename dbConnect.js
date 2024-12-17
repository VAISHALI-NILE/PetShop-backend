import mongoose from "mongoose";

const uri =
  "mongodb+srv://vaishalinile896:nQH9tOwi1hxUl9IW@cluster0.vxnhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

try {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB using Mongoose");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}
