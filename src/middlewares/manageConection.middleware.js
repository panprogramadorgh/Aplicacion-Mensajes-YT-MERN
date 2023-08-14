import mongoose from "mongoose"

export default (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
    return
  }
  res.json({
    error: "Error al conectarse a la base datos"
  })
}