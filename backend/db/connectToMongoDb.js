import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error connecting to mongoDB", error.message);
  }
};
export default connectToMongoDb;
