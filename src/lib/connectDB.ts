import mongoose from "mongoose";

const connectDB = () => {
  if (!mongoose.connections || mongoose.connections[0].readyState) return;
  mongoose.connect(process.env.MONGODB_URI);
};

export default connectDB;
