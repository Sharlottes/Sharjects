import mongoose from 'mongoose'

const connectDB = () => {
  if (!mongoose.connections) return;
  if (mongoose.connections[0].readyState) {
    console.log('Already connected.')
    return;
  }
  mongoose.connect(process.env.MONGODB_URI, {}, err => {
    if (err) throw err;
    console.log('Connected to mongodb.')
  })
}
console.log('connecting to mongodb');

export default connectDB;