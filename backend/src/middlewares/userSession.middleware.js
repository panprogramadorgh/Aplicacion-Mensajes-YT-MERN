import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;
if (!SECRET) throw new Error("SECRET no existe");

export default (req, res, next) => {
  const cookie = req.headers.cookie;
  if (!cookie) {
    req.user = null;
    return next();
  }
  const cookies = cookie.split("; ");
  const cookieToken = cookies.find((eachCookie) => {
    const [key, value] = eachCookie.split("=");
    return key === "token";
  });
  if (!cookieToken) {
    req.user = null;
    return next();
  }
  const [_, value] = cookieToken.split("=");
  jwt.verify(value, SECRET, async (error, data) => {
    if (error) {
      console.log(error);
      return res
        .clearCookie("token")
        .status(401)
        .json({ error: "No autorizado" });
    }
    const { id } = data;
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      res.clearCookie("token");
      req.user = null;
      return next();
    }
    req.user = user;
    return next();
  });
};
