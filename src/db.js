import dotenv from 'dotenv';
dotenv.config()
import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose.connect(process.env.URI)
    console.log('Conectado a la base de datos')
  } catch (error) {
    console.error(error)
  }
}