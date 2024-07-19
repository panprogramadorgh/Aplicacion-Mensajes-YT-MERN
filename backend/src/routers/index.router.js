import { Router } from "express";
const indexRouter = Router();
import userModel from "../models/user.model.js";
import messageModel from "../models/message.model.js";
import { hashPassword, compareHash } from "../utils/hash.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;
if (!SECRET) throw new Error("SECRET no existe");

// comentado por motivos de seguridad
// indexRouter.get("/users", async (req, res) => {
//   const documentos = await userModel.find();
//   res.status(200).json({ documentos });
// });

indexRouter.get("/profile", async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "No autorizado" });
  res.json({ success: true, user: req.user });
});

indexRouter.get("/chat", async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "No autorizado" });
  const chat = await messageModel.find();
  return res.json({ success: true, chat });
});

indexRouter.post("/chat", async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "No autorizado" });
  const { body } = req.body;
  try {
    if (!body) throw new Error();
    const data = { owner: req.user.name, body };
    const newDocument = await messageModel.create(data);
    return res.status(200).json({ success: true, document: newDocument });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid data sent to create message" });
  }
});

indexRouter.post("/register-user", async (req, res) => {
  const { name, password } = req.body;
  const userData = {
    name: name ?? "",
    password: password ?? "",
  };
  try {
    if (userData.name.length < 3 || userData.name.length > 20) {
      throw new Error(
        "El nombre debe tener una longitud entre 3 y 20 caracteres"
      );
    } else if (userData.password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }

    const newUser = new userModel({
      ...userData,
      password: await hashPassword(userData.password),
    });
    const document = await newUser.save();
    res.status(200).json({
      success: true,
      message: "Documento insertado con existo",
      document,
    });
  } catch (error) {
    if (error.code ?? error.code === 11000) {
      const [dupKey] = Object.keys(error.keyPattern);
      res.status(422).json({ error: `${dupKey} already exists` });
      return;
    }

    res.status(422).json({ error: error.message });
  }
});

indexRouter.post("/user-login", async (req, res) => {
  const { name, password } = req.body;
  try {
    if (!name || typeof name !== "string" || name.trim() === "") {
      throw new Error("Name is invaid");
    } else if (
      !password ||
      typeof password !== "string" ||
      password.trim() === ""
    ) {
      throw new Error("Password is invaid");
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  try {
    const user = await userModel.findOne({ name });
    if (!user) {
      throw new Error();
    }
    const passwordIsCorrect = await compareHash({
      hash: user.password,
      str: password,
    });
    if (!passwordIsCorrect) {
      throw new Error();
    }
    // la contraseña es correcta
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET);
    return res
      .status(200)
      .json({ success: true, message: "iniciaste sesion", token });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ error: "El nombre o la contraseña con invalidos" });
  }
});

export default indexRouter;
