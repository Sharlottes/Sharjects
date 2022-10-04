import mongoose from 'mongoose'

const connectDB = () => {
  console.log('connecting to mongodb');
  if (!mongoose.connections) return;
  if (mongoose.connections[0].readyState) {
    console.log('Already connected.')
    return;
  }
  mongoose.connect(process.env.MONGODB_URI, {}, err => {
    if (err) console.log('Failed to mongodb.', err);
    else console.log('connecting to mongodb');
  })
}

export default connectDB;