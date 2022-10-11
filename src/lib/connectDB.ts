import mongoose from 'mongoose'

const connectDB = () => {
  console.log('connecting to mongodb');
  if (!mongoose.connections) {
    console.log('no connections.')
    return;
  }
  if (mongoose.connections[0].readyState) {
    console.log('Already connected.')
    return;
  }
  mongoose.connect(process.env.MONGODB_URI).then(
    res => console.log('Successed to connect mongodb'), 
    err => console.log('Failed to connect mongodb.\n', err)
  )
}

export default connectDB;