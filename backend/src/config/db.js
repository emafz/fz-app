import mongoose from 'mongoose'

import { env } from './env.js'

const connectDB = async () => {
  try {
    console.log('🔄Conectando MongoDB...')
    await mongoose.connect(env.MONGO_URI)
    console.log('MongoDB conectado correctamente')
  } catch (error) {
    console.error('Error conectado MongoDB')
    console.log(error)
  }
}

export default connectDB
